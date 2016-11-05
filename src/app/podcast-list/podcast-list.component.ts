import { Component } from '@angular/core';

import { PodcastsService } from '../podcasts.service';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent {

  private allPodcastItems: Object[];
  
  podcastItems :Object[];
  cap: number = 1;

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() {
    this.podcastsService.getItems()
      .then(items => this.setItems(items));
  }

  private setItems(items: Object[]) {
    this.allPodcastItems = items;
    this.podcastItems = this.getClampedItems();
  }

  private getClampedItems(): Object[] {
    return this.allPodcastItems.slice(0, this.cap * 10);
  }

  // TODO: This should be throttled somehow. Maybe by adding a "load more"" button?
  onScroll(event) {
    let reveal = (window.scrollY > window.document.body.clientHeight - window.innerHeight);
    if (reveal) {
      this.cap++;
      this.podcastItems = this.getClampedItems();
    }
  }

}
