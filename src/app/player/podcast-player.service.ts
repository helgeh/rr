import { Injectable } from '@angular/core';

@Injectable()
export class PodcastPlayerService {

  onLoaded: Promise<string>;

  private audio;

  constructor() {
    this.onLoaded = new Promise(resolve => this.podcastLoaded = resolve);
    this.audio = new Audio();
  }

  load(podcast: string) {
    this.audio.src = podcast;
    this.audio.load();
    this.podcastLoaded(podcast);
  }

  play() {
    this.audio.play();
  }

  private podcastLoaded(podcast: string) {};

}
