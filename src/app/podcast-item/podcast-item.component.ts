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
  isPlaying = false;

  private subscription: Subscription;

  constructor(private podcastsService: PodcastsService, private player:PodcastPlayerService) {
    this.player.onLoaded.subscribe(podcast => {
      this.isActive = this.podcast.guid === podcast.guid;
      if (!this.isActive) {
        this.isPlaying = false;
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
      this.isPlaying = !this.isPlaying;
    }
    else {
      this.podcastsService.play(this.podcast, this.currentTime);
      this.subscription = this.player.onTimeUpdate.subscribe(time => {
        // TODO: sjekk om vi er currentPodcast eller noe
        this.duration = this.player.getDuration();
        this.currentTime = time
        this.podcastsService.setTime(this.podcast, time, this.duration);
      });
      this.isPlaying = true;
    }
  }

  onSeek(e) {
    this.player.seek(e.position);
  }

}
