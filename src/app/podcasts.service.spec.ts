/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PodcastServiceService } from './podcast-service.service';

describe('Service: PodcastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PodcastServiceService]
    });
  });

  it('should ...', inject([PodcastServiceService], (service: PodcastServiceService) => {
    expect(service).toBeTruthy();
  }));
});
