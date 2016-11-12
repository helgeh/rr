import { Component, OnInit, Input } from '@angular/core';

import { PodcastsService, Podcast } from '../shared';

@Component({
  selector: 'app-podcast-item',
  templateUrl: './podcast-item.component.html',
  styleUrls: ['./podcast-item.component.css']
})
export class PodcastItemComponent implements OnInit {

  @Input() podcast:Podcast;

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() { }

  play() {
    this.podcastsService.play(this.podcast);
  }

}
