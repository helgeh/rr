import { Component } from '@angular/core';

import { PodcastsService } from './podcasts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'RR Podcasts';

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() {
    this.podcastsService.getChannel()
      .then(channel => this.title = channel.title);
  }

}
