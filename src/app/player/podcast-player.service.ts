import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Podcast } from '../shared';

@Injectable()
export class PodcastPlayerService {

  onTimeUpdate: Observable<number>;
  onLoaded: Observable<string>;

  private audio;
  private currentTime;
  private timeoutId;
  private timeUpdateSource:Subject<number>;
  private onLoadedSource:Subject<string>;

  constructor() {
    this.audio = new Audio();

    this.timeUpdateSource = new Subject<number>();
    this.onTimeUpdate = this.timeUpdateSource.asObservable();
    this.currentTime = 0;
    this.updateCurrentTime();

    this.onLoadedSource = new Subject<string>();
    this.onLoaded = this.onLoadedSource.asObservable();
  }

  load(url: string) {
    this.audio.src = url;
    this.audio.load();
    this.onLoadedSource.next(url);
  }

  hasSong() {
    return this.audio.src;
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  isPlaying() {
    return !this.audio.paused;
  }

  private updateCurrentTime() {
    if (this.hasSong()) {
      let time = Math.floor(this.audio.currentTime) * 1000;
      if (time > this.currentTime) {
        this.currentTime = time;
        this.timeUpdateSource.next(time);
      }
    }
    if (this.timeoutId)
      clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 100);
  }

}
