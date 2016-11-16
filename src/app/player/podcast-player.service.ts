import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Podcast } from '../shared';

@Injectable()
export class PodcastPlayerService {

  onTimeUpdate: Observable<string>;
  onLoaded: Observable<string>;

  private audio;
  private timeUpdateSource:Subject<string>;
  private onLoadedSource:Subject<string>;

  constructor() {
    this.audio = new Audio();
    this.audio.ontimeupdate = this._onTimeUpdate.bind(this);

    this.timeUpdateSource = new Subject<string>();
    this.onTimeUpdate = this.timeUpdateSource.asObservable();

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

  getCurrentTime() {
    return this.audio.currentTime;
  }

  private _onTimeUpdate(event) {
    this.timeUpdateSource.next(this.audio.currentTime);
  }

}
