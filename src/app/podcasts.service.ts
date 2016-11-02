import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Podcast } from './podcast';

@Injectable()
export class PodcastsService {

  jsonpURL: string = 'http://rr.helye.net/get_feed.php';

  feedURL: string = 'http://podkast.nrk.no/program/radioresepsjonen.rss';

  promise: Promise<Podcast>;

  constructor(private jsonp: Jsonp) {
    this.load();
  }

  load(): void {
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

}
