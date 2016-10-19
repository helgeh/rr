import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-podcast-item',
  templateUrl: './podcast-item.component.html',
  styleUrls: ['./podcast-item.component.css']
})
export class PodcastItemComponent implements OnInit {

  @Input() podcast;

  constructor() { }

  ngOnInit() {
  }

}
