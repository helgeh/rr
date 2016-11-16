import { Component, OnInit } from '@angular/core';

import { PodcastPlayerService } from './podcast-player.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  currentTime = 0;

  private timeoutId;

  constructor(private player: PodcastPlayerService) {
    this.player.onLoaded.subscribe(url => this.currentTime = 0);
    this.updateCurrentTime();
  }

  ngOnInit() {
  }

  updateCurrentTime() {
    if (this.isLoaded()) {
      let time = Math.floor(this.player.getCurrentTime()) * 1000;
      if (time > this.currentTime) {
        this.currentTime = time;
      }
    }
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 100);
  }

  isLoaded() {
    return this.player.hasSong();
  }

  isPlaying() {
    return this.player.isPlaying();
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

}
