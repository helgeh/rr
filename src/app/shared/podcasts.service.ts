import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PodcastPlayerService } from '../player/podcast-player.service';
import { Channel } from './channel';
import { Podcast } from './podcast';

const LAST_PLAYED_STORE_ID: string = 'LAST_PLAYED_PODCAST';

@Injectable()
export class PodcastsService {

  private jsonpURL: string = 'https://rr-backend.now.sh/feed/';
  private feedURL: string = 'http://podkast.nrk.no/program/radioresepsjonen.rss';
  private channel: Promise<Channel>;
  private currentPodcast: Podcast;

  webStorage: Storage;

  constructor(private jsonp: Jsonp, private player:PodcastPlayerService) {
    let params = new URLSearchParams();
    params.set('callback', 'JSONP_CALLBACK');
    let url = (this.jsonpURL + encodeURIComponent(this.feedURL)).toString();
    this.channel = this.jsonp
      .get(url, {search: params})
      .toPromise()
      .then(r => this.parsePodcasts(r))
      .then(c => this.loadLastPlayed(c))
      .catch(err => err);
    this.webStorage = window.localStorage;
  }

  parsePodcasts(r) {
    let c: Channel = r.json().channel;
    for (let i = 0; i < c.item.length; i++) {
      c.item[i].guid = c.item[i].guid._;
    }
    return c;
  }

  loadLastPlayed(c: Channel) {
    let guid = this.getStore(LAST_PLAYED_STORE_ID);
    this.getItems().then(items => {
      items.forEach(item => {
        if (item.guid == guid) {
          this.loadItem(item);
        }
      });
    });
    return c;
  }

  getChannel(): Promise<Channel> {
    return this.channel;
  }

  getItems(): Promise<Podcast[]> {
    return this.channel
      .then(channel => channel.item);
  }

  getCurrentPodcast(): Promise<Podcast> {
    if (!this.currentPodcast)
      return this.getItems().then(items => items[0] as Podcast);
    return new Promise(resolve => resolve(this.currentPodcast));
  }

  play(podcast: Podcast, currentTime: number = NaN) {
    this.setStore(LAST_PLAYED_STORE_ID, podcast.guid);
    this.loadItem(podcast);
    if (!isNaN(currentTime) && currentTime > 0)
      this.player.seek(currentTime);
    this.player.play();
  }

  loadItem(item: Podcast) {
    this.currentPodcast = item;
    this.player.load(item);
    this.player.seek(this.getTime(item));
  }

  getTime(podcast: Podcast): number {
    let item = this.getStore(podcast.guid);
    if (item)
      return item.time || 0;
    return 0;
  }

  setTime(podcast: Podcast, time: number, duration: number) {
    let obj = this.getStore(podcast.guid) || {};
    obj.time = time;
    obj.duration = duration;
    this.setStore(podcast.guid, obj);
  }

  getDuration(podcast: Podcast): number {
    return this.getStore(podcast.guid, 'duration');
  }

  private getStore(id: string, prop: string = null) {
    let str = this.webStorage.getItem(id);
    if (str) {
      let obj = JSON.parse(str);
      return prop === null ? obj : obj[prop];
    }
    return null;
  }

  private setStore(id: string, value) {
    this.webStorage.setItem(id, JSON.stringify(value));
  }

}
