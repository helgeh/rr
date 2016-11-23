import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-time',
  templateUrl: './display-time.component.html',
  styleUrls: ['./display-time.component.css']
})
export class DisplayTimeComponent implements OnInit {

  @Input()
  set elapsed(time:number) {
    this.output = this.format(time);
  }

  output = '';

  constructor() { }

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

}
