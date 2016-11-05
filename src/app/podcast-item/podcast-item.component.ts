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
  }

  play() {
    let url = this.podcast.enclosure['@attributes'].url;
    this.player.load(url);
    this.player.play();
  }

}
