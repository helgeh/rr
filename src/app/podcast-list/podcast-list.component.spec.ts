/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { PodcastListComponent } from './podcast-list.component';
import { PodcastsService } from '../podcasts.service';

describe('Component: PodcastList', () => {
  it('should create an instance', () => {
    let component = new PodcastListComponent(new PodcastsService());
    expect(component).toBeTruthy();
  });
});
