import { Component } from '@angular/core';
import { PodcastsService } from '../podcasts.service';
import { Podcast } from '../podcast';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent {

  podcastItems :Object[];

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() {
    this.podcastsService.getItems().then(items => {
      this.podcastItems = items;
      console.log(items);
    });
  }

}
