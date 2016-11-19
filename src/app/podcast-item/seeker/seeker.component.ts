import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

  @Input() 
  set position(position) {
    if (!this.slider || isNaN(this.total))
      return;
    let sliderWidth = this.slider.clientWidth - this.thumbWidth;
    let left = sliderWidth * position / this.total;
    this.thumbPos = left + 'px';
  }

  @Input() total;

  @Input() enabled;

  @Output() onSeek = new EventEmitter();

  thumbPos;

  private mouseIsDown = false;
  private slider;
  private thumb;
  private thumbWidth;

  constructor(private el:ElementRef) { }

  ngOnInit() {
    this.slider = this.el.nativeElement.firstChild;
    this.thumb = this.el.nativeElement.querySelector('.thumb');
    let position = window.getComputedStyle(this.thumb, ':after').getPropertyValue('width');
    this.thumbWidth = parseInt(position.replace('px', ''), 10);
  }

  onMove(e) {
    if (!this.mouseIsDown || !this.enabled)
      return;
    let w = this.slider.clientWidth;
    let left = this.getOffsetLeft(this.slider);
    let newX = Math.min(e.clientX - left - this.thumbWidth/2, w - this.thumbWidth);
    this.setX(newX);
  }

  onDown(e) {
    if (e.button !== 0 || !this.enabled)
      return;
    this.mouseIsDown = true;
    this.onMove(e);
  }

  onUp(e) {
    this.mouseIsDown = false;
  }

  private setX(newX) {
    if (isNaN(this.total))
      return;
    this.thumbPos = newX + 'px';
    let pc = (newX * 100) / (this.slider.clientWidth - this.thumbWidth);
    this.onSeek.emit({offset: newX, percent: pc, position: (this.total * pc) / 100});
  }

  private getOffsetLeft(elem) {
    let offsetLeft = 0;
    do {
      if (!isNaN(elem.offsetLeft))
        offsetLeft += elem.offsetLeft;
    } while(elem = elem.offsetParent);
    return offsetLeft;
  }
  
}
