import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

  @Input() position;

  private _total;
  @Input()
  set total(t) {
    this._total = t;
    this.calculateStops();
  }
  get total() {
    return this._total;
  }

  private _enabled;
  @Input() 
  set enabled(state) {
    this._enabled = state;
    this.total = this._total;
  }
  get enabled() {
    return this._enabled;
  }

  @Output() onSeek = new EventEmitter();

  stops = [];

  private mouseIsDown = false;
  private slider;
  private thumbWidth;
  private sliderOffsetLeft = 0;

  constructor(private el:ElementRef) { }

  ngOnInit() { 
    // TODO: fortsatt ikke optimalt å drive og fikle med DOM...
    this.slider = this.el.nativeElement.firstChild;
    this.thumbWidth = 2;
  }

  onMove(e) {
    if (!this.mouseIsDown || !this.enabled)
      return;
    let left = this.sliderOffsetLeft;
    let newX = Math.max(0, Math.min(e.clientX - left - this.thumbWidth/2, this.getWidth()));
    this.setX(newX);
    e.preventDefault();
    e.stopPropagation();
  }

  onDown(e) {
    if (e.button !== 0 || !this.enabled)
      return;
    this.mouseIsDown = true;
    this.sliderOffsetLeft = this.getOffsetLeft(this.slider);
    this.onMove(e);
  }

  onUp(e) {
    this.mouseIsDown = false;
  }

  private setX(newX) {
    if (isNaN(this.total))
      return;
    this.onSeek.emit({
      offset: newX, 
      percent: newX * 100 / this.getWidth(), 
      position: this.total * newX / this.getWidth()
    });
  }

  private getOffsetLeft(elem) {
    let offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft))
        offsetLeft += elem.offsetLeft;
    } while(elem = elem.offsetParent);
    return offsetLeft;
  }

  private getWidth() {
    return this.slider.clientWidth - this.thumbWidth;
  }

  private calculateStops() {
    let stops = [];
    for (let i = 60; i < this.total-1; i += 60) {
      stops.push({index: i, pos: i / this.total * 100});
    }
    this.stops = stops;
  }
  
}
