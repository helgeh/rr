import { Component, OnInit } from '@angular/core';

import { PodcastPlayerService } from './podcast-player.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private player: PodcastPlayerService) {}

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
