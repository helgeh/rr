import { Injectable } from '@angular/core';

import { Podcast } from '../podcast';

@Injectable()
export class PodcastPlayerService {

  audio;
  url: string;

  constructor() { }

  load(podcast: string) {
    this.url = podcast;
    this.audio = new Audio(this.url);
    console.log('loaded',  podcast);
  }

  play() {
    this.audio.play();
    console.log('started playing', this.url);
  }

}
