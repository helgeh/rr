/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PodcastPlayerService } from './podcast-player.service';

describe('Service: PodcastPlayer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PodcastPlayerService]
    });
  });

  it('should ...', inject([PodcastPlayerService], (service: PodcastPlayerService) => {
    expect(service).toBeTruthy();
  }));
});
