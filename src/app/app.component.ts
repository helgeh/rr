import { Component } from '@angular/core';

import { PodcastsService } from './shared';
import { PodcastPlayerService } from './player/podcast-player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:keydown)': 'keyDown($event)',
  }
})

export class AppComponent {

  title = 'RR Podcasts';

  constructor(
    private podcastsService: PodcastsService,
    private player: PodcastPlayerService
  ) { }

  ngOnInit() {
    this.podcastsService.getChannel()
      .then(channel => this.title = channel.title);
  }

  private keyDown(event) {
    switch (event.code) {

      case 'Space':
        this.player.isPlaying() ? this.player.pause() : this.player.play();
        event.preventDefault();
        event.stopPropagation();
        break;
    
      default:
        break;
    }
  }

}
