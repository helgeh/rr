import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

  private _position;
  @Input() 
  set position(position) {
    this._position = position;
    this.updatePosition();
  }
  get position() {
    return this._position;
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
    // TODO: å manipulere DOM direkte er egentlig fy-fy. Finn en annen 
    // måte å hente bredden til .thumb:after og .slider på. 
    this.slider = this.el.nativeElement.firstChild;
    this.thumb = this.el.nativeElement.querySelector('.thumb');
    let thumbW = window.getComputedStyle(this.thumb, ':after').getPropertyValue('width');
    this.thumbWidth = parseInt(thumbW.replace('px', ''), 10);
    this.updatePosition();
  }

  onMove(e) {
    if (!this.mouseIsDown || !this.enabled)
      return;
    let left = this.getOffsetLeft(this.slider);
    let newX = Math.min(e.clientX - left - this.thumbWidth/2, this.getWidth());
    this.setX(newX);
    e.preventDefault();
    e.stopPropagation();
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

  private updatePosition() {
    if (!this.slider || isNaN(this.total))
      return;
    let left = this.getWidth() * this.position / this.total;
    this.thumbPos = left + 'px';
  }
  
}
