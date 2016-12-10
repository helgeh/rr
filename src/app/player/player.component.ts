import { Component, OnInit } from '@angular/core';

import { PodcastPlayerService } from './podcast-player.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  currentTime = 0;
  duration = 0;

  constructor(private player: PodcastPlayerService) {
    this.player.onLoaded.subscribe(podcast => this.currentTime = 0);
    this.player.onTimeUpdate.subscribe(time => {
      this.currentTime = time;
      this.duration = this.player.getDuration();
    });
  }

  ngOnInit() {
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
