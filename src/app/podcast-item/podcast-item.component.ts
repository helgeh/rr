import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { PodcastsService, Podcast } from '../shared';
import { PodcastPlayerService } from '../player/podcast-player.service';

@Component({
  selector: 'app-podcast-item',
  templateUrl: './podcast-item.component.html',
  styleUrls: ['./podcast-item.component.css']
})
export class PodcastItemComponent implements OnInit {

  @Input() podcast:Podcast;

  currentTime = 0;
  duration = NaN;
  isActive = false;

  private subscription: Subscription;

  constructor(private podcastsService: PodcastsService, private player:PodcastPlayerService) {
    this.player.onLoaded.subscribe(podcast => {
      this.isActive = this.podcast.guid === podcast.guid;
      if (!this.isActive) {
        if (this.subscription) {
          this.subscription.unsubscribe();
          this.subscription = null;
        }
      }
    });
  }

  ngOnInit() {
    let time = this.podcastsService.getTime(this.podcast);
    if (time > 0) {
      this.duration = this.podcastsService.getDuration(this.podcast);
      this.currentTime = time;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  play() {
    if (this.subscription) {
      this.player.toggle();
    }
    else {
      this.podcastsService.play(this.podcast, this.currentTime);
      this.subscription = this.player.onTimeUpdate.subscribe(time => {
        this.duration = this.player.getDuration();
        this.currentTime = time
        this.podcastsService.setTime(this.podcast, time, this.duration);
      });
    }
  }

  onSeek(e) {
    this.player.seek(e.position);
  }

}
