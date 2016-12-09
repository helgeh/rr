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
  private isLoaded = false;
  private timeoutId;
  private timeUpdateSource:Subject<number>;
  private onLoadedSource:Subject<Podcast>;

  constructor() {
    this.audio = new Audio();
    this.audio.oncanplay = () => {
      this.timeUpdateSource.next(this.currentTime);
    }
    this.audio.oncanplaythrough = () => {
      this.isLoaded = true;
      this.timeUpdateSource.next(this.currentTime);
    }

    this.timeUpdateSource = new Subject<number>();
    this.onTimeUpdate = this.timeUpdateSource.asObservable();
    this.currentTime = 0;
    this.updateCurrentTime();

    this.onLoadedSource = new Subject<Podcast>();
    this.onLoaded = this.onLoadedSource.asObservable();

    // TODO: Vis en statuslinje for nedlasting av lydfilen.
    /* 
      if ((audio.buffered != undefined) && (audio.buffered.length != 0)) {
        $(audio).bind('progress', function() {
          var loaded = parseInt(((audio.buffered.end(0) / audio.duration) * 100), 10);
          loadingIndicator.css({width: loaded + '%'});
        });
      }
      else {
        loadingIndicator.remove();
      }
    */
  }

  load(podcast: Podcast) {
    this.podcast = podcast;
    this.currentTime = 0;
    this.isLoaded = false;
    this.audio.src = podcast.enclosure.url;
    this.audio.load();
    this.onLoadedSource.next(podcast);
  }

  hasSong() {
    return this.audio.src;
  }

  play() {
    if (this.hasSong()) {
      if (this.audio.currentTime >= Math.floor(this.audio.duration)-1)
        this.audio.currentTime = 0;
      this.audio.play();
      this.timeUpdateSource.next(this.audio.currentTime);
    }
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
    if (this.isLoaded)
      return this.audio.duration;
    return 0;
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
