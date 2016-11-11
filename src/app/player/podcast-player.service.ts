import { Injectable } from '@angular/core';

import { Podcast } from '../podcast';

@Injectable()
export class PodcastPlayerService {

  // onLoaded: Promise<string>;

  private audio;

  constructor() {
    // this.onLoaded = new Promise(resolve => this.podcastLoaded = resolve);
    this.audio = new Audio();
  }

  load(url: string) {
    this.audio.src = url;
    this.audio.load();
    // this.podcastLoaded(podcast);
  }

  play() {
    this.audio.play();
  }

  // private podcastLoaded(podcast: Podcast) {}

}
