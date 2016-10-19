import { Injectable } from '@angular/core';

@Injectable()
export class PodcastsService {

  podcasts = [
    {title: 'Some title'},
    {title: 'Another title'}
  ];

  constructor() { }

  getItems() {
    return this.podcasts;
  }

}
