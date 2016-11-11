import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { PodcastPlayerService } from './player/podcast-player.service';
import { Podcast } from './podcast';

@Injectable()
export class PodcastsService {

  jsonpURL: string = 'http://rr.helye.net/get_feed.php';

  feedURL: string = 'http://podkast.nrk.no/program/radioresepsjonen.rss';

  promise: Promise<Podcast>;
  currentPodcast: Podcast;

  constructor(private jsonp: Jsonp, private player:PodcastPlayerService) {
    let params = new URLSearchParams();
    params.set('jsonp', 'JSONP_CALLBACK');
    params.set('feed', this.feedURL);
    this.promise = this.jsonp
      .get(this.jsonpURL, {search: params})
      .toPromise()
      .then(r => r.json().channel)
      .catch(err => err);
  }

  getChannel(): Promise<Podcast> {
    return this.promise;
  }

  getItems(): Promise<Object[]> {
    return this.promise
      .then(podcast => podcast.item);
  }

  play(podcast: Podcast) {
    this.currentPodcast = podcast;
    this.player.load(this.currentPodcast.enclosure['@attributes'].url);
    this.player.play();
  }

}
