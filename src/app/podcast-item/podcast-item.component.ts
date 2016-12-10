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
    this.player.onLoaded.subscribe(this.checkCurrentPodcast.bind(this));
  }

  ngOnInit() {
    this.podcastsService.getCurrentPodcast()
      .then(this.checkCurrentPodcast.bind(this));
    this.checkSavedTime();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private checkCurrentPodcast(podcast: Podcast) {
      if (this.podcast.guid == podcast.guid) 
        this.activate();
      else 
        this.deactivate();
  }

  private activate() {
    this.isActive = true;
    this.checkSavedTime();
    this.subscription = this.player.onTimeUpdate.subscribe(time => {
      let dur = this.player.getDuration();
      this.updateTimes(time, dur);
    });
  }

  private deactivate() {
    this.isActive = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private checkSavedTime() {
    let time = this.podcastsService.getTime(this.podcast);
    let duration = this.podcastsService.getDuration(this.podcast);
    this.updateTimes(time, duration);
  }

  private updateTimes(time, duration) {
    if (time > 0) 
      this.currentTime = time;
    if (duration > 0)
      this.duration = duration;
  }

  play() {
    if (this.subscription)
      this.player.toggle();
    else
      this.podcastsService.play(this.podcast, this.currentTime);
  }

  isPlaying() {
    return this.player.isPlaying(this.podcast.guid);
  }

  onSeek(e) {
    this.player.seek(e.position);
  }

}
