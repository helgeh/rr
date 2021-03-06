import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastItemComponent } from './podcast-item/podcast-item.component';
import { PodcastsService } from './shared';
import { PodcastPlayerService } from './player/podcast-player.service';
import { PlayerComponent } from './player/player.component';
import { SeekerComponent } from './podcast-item/seeker/seeker.component';
import { DisplayTimeComponent } from './shared/display-time/display-time.component'

@NgModule({
  declarations: [
    AppComponent,
    PodcastListComponent,
    PodcastItemComponent,
    PlayerComponent,
    SeekerComponent,
    DisplayTimeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    PodcastsService,
    PodcastPlayerService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
