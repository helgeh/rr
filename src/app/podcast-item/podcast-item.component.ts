import { Component, OnInit, Input } from '@angular/core';

import { PodcastPlayerService } from '../player/podcast-player.service';
import { Podcast } from '../podcast';

@Component({
  selector: 'app-podcast-item',
  templateUrl: './podcast-item.component.html',
  styleUrls: ['./podcast-item.component.css']
})
export class PodcastItemComponent implements OnInit {

  @Input() podcast:Podcast;

  constructor(private player:PodcastPlayerService) { }

  ngOnInit() {
    // TODO: for some reason this only works one time. When one podcast
    // has been loaded and marked active, no other gets highlighted from 
    // following clicks.
    // Maybe try the new subscribe pattern shipped with angular2 in stead
    // of the promise in player.service
    this.player.onLoaded
      .then(url => this.podcast.isActive = this.getUrl() == url);
  }

  play() {
    let url = this.getUrl();
    this.player.load(url);
    this.player.play();
  }

  private getUrl(): string {
    return this.podcast.enclosure['@attributes'].url;
  }

}
