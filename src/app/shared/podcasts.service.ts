import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PodcastPlayerService } from '../player/podcast-player.service';
import { Channel } from './channel';
import { Podcast } from './podcast';

@Injectable()
export class PodcastsService {

  private jsonpURL: string = 'http://rr.helye.net/get_feed.php';
  private feedURL: string = 'http://podkast.nrk.no/program/radioresepsjonen.rss';
  private channel: Promise<Channel>;

  currentPodcast: Podcast;

  constructor(private jsonp: Jsonp, private player:PodcastPlayerService) {
    let params = new URLSearchParams();
    params.set('jsonp', 'JSONP_CALLBACK');
    params.set('feed', this.feedURL);
    this.channel = this.jsonp
      .get(this.jsonpURL, {search: params})
      .toPromise()
      .then(r => r.json().channel as Channel)
      .catch(err => err);
  }

  getChannel(): Promise<Channel> {
    return this.channel;
  }

  getItems(): Promise<Podcast[]> {
    return this.channel
      .then(channel => channel.item);
  }

  play(podcast: Podcast, currentTime: number = NaN) {
    this.currentPodcast = podcast;
    this.player.load(this.currentPodcast);
    if (!isNaN(currentTime) && currentTime > 0)
      this.player.seek(currentTime);
    this.player.play();
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
    let str = localStorage.getItem(id);
    if (str) {
      let obj = JSON.parse(str);
      return prop === null ? obj : obj[prop];
    }
    return null;
  }

  private setStore(id: string, value) {
    localStorage.setItem(id, JSON.stringify(value));
  }

}
