import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.css']
})
export class PodcastListComponent implements OnInit {

  podcastItems = [
    {title: 'Some title'},
    {title: 'Another title'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
