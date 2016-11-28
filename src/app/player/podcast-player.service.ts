import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Podcast } from '../shared';

@Injectable()
export class PodcastPlayerService {

  onTimeUpdate: Observable<number>;
  onLoaded: Observable<Podcast>;

  private podcast: Podcast;
  private audio;
  private currentTime;
  private timeoutId;
  private timeUpdateSource:Subject<number>;
  private onLoadedSource:Subject<Podcast>;

  constructor() {
    this.audio = new Audio();

    this.timeUpdateSource = new Subject<number>();
    this.onTimeUpdate = this.timeUpdateSource.asObservable();
    this.currentTime = 0;
    this.updateCurrentTime();

    this.onLoadedSource = new Subject<Podcast>();
    this.onLoaded = this.onLoadedSource.asObservable();
  }

  load(podcast: Podcast) {
    this.podcast = podcast;
    this.currentTime = 0;
    this.audio.src = podcast.enclosure.url;
    this.audio.load();
    this.onLoadedSource.next(podcast);
  }

  hasSong() {
    return this.audio.src;
  }

  play() {
    if (this.hasSong())
      this.audio.play();
  }

  pause() {
    if (this.hasSong())
      this.audio.pause();
  }

  isPlaying(guid: string = null) {
    return this.hasSong() && 
      !this.audio.paused && 
      (guid == null || guid === this.podcast.guid);
  }

  toggle() {
    if (this.isPlaying())
      this.pause();
    else
      this.play();
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  jump(delta: number) {
    this.audio.currentTime += delta;
  }

  getDuration() {
    return this.audio.duration;
  }

  private updateCurrentTime() {
    if (this.hasSong()) {
      let time = Math.floor(this.audio.currentTime);
      if (time !== this.currentTime) {
        this.currentTime = time;
        this.timeUpdateSource.next(time);
      }
    }
    if (this.timeoutId)
      clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 100);
  }

}
