import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PodcastPlayerService } from './player/podcast-player.service';
import { Channel } from './channel';
import { Podcast } from './podcast';

@Injectable()
export class PodcastsService {

  jsonpURL: string = 'http://rr.helye.net/get_feed.php';

  feedURL: string = 'http://podkast.nrk.no/program/radioresepsjonen.rss';

  promise: Promise<Channel>;
  currentPodcast: Podcast;

  constructor(private jsonp: Jsonp, private player:PodcastPlayerService) {
    let params = new URLSearchParams();
    params.set('jsonp', 'JSONP_CALLBACK');
    params.set('feed', this.feedURL);
    this.promise = this.jsonp
      .get(this.jsonpURL, {search: params})
      .toPromise()
      .then(r => r.json().channel as Channel)
      .catch(err => err);
  }

  getChannel(): Promise<Channel> {
    return this.promise;
  }

  getItems(): Promise<Podcast[]> {
    return this.promise
      .then(channel => channel.item);
  }

  play(podcast: Podcast) {
    this.currentPodcast = podcast;
    this.player.load(this.currentPodcast.enclosure['@attributes'].url); // getUrl());
    this.player.play();
  }

}
