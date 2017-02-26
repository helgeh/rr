import { Component, OnInit, Input } from '@angular/core';

import { PodcastsService } from '../podcasts.service';

@Component({
  selector: 'app-display-time',
  templateUrl: './display-time.component.html',
  styleUrls: ['./display-time.component.css']
})
export class DisplayTimeComponent implements OnInit {

  @Input()
  set elapsed(time:number) {
    this.currentTime = time;
    this.updateTime();
  }

  @Input() total;

  output = '';

  private currentTime = 0;
  private reverse = false;

  constructor(private podcastsService: PodcastsService) { }

  ngOnInit() {
  }

  private format(seconds) {
    if (!seconds || isNaN(seconds))
      return '';

    let hours = Math.floor(seconds / 3600);
    let minutes = (hours*60) + Math.floor((seconds % 3600) / 60);
    seconds = Math.floor(seconds % 60);

    let sminutes = this.leftPad(minutes, 2, '0');
    let sseconds = this.leftPad((seconds % 60), 2, '0');

    return `${sminutes}:${sseconds}`;
  }

  leftPad(val, size, ch = ' ') {
    let result = '' + val;
    while (result.length < size) {
      result = ch + result;
    }
    return result;
  }

  toggleReverse() {
    this.reverse = !this.reverse;
    this.podcastsService.setOption('display_reverse_time', this.reverse);
    this.updateTime();
  }

  private updateTime() {
    this.reverse = this.podcastsService.getOption('display_reverse_time');
    let time = this.currentTime;
    let prefix = '';
    if (this.reverse) {
      time = this.total - this.currentTime;
      prefix = '-';
    }
    this.output = prefix + this.format(time);
  }

}
