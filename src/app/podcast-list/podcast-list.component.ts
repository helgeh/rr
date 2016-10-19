import { Component, OnInit } from '@angular/core';
import { PodcastsService } from '../podcasts.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent implements OnInit {

  podcastItems = [];

  constructor(private podcastsService:PodcastsService) { }

  ngOnInit() {
    this.podcastsService.getItems().then(items => this.podcastItems = items);
  }

}
