import { Component } from '@angular/core';

import { PodcastsService, Podcast } from '../shared';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent {

  private allPodcastItems: Podcast[];
  
  podcastItems :Podcast[];
  cap: number = 1;

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() {
    this.podcastsService.getItems()
      .then((items: Podcast[]) => this.setItems(items));
  }

  private setItems(items: Podcast[]) {
    this.allPodcastItems = items;
    this.podcastItems = this.getClampedItems();
  }

  private getClampedItems(): Podcast[] {
    return this.allPodcastItems.slice(0, this.cap * 10);
  }

  isActive(item :Podcast) {
    return this.podcastsService.currentPodcast == item;
  }

  haveAdjacentDates(cur, prev) {
    if (prev >= this.podcastItems.length)
      return false;
    let a = new Date( this.podcastItems[cur].pubDate );
    let b = new Date( this.podcastItems[prev].pubDate );
    let day = 1000*60*60*24;
    b.setTime(b.getTime() + day);
    return b.getDate() !== a.getDate();
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
