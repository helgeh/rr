import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastItemComponent } from './podcast-item/podcast-item.component';
import { PodcastsService } from './podcasts.service';

@NgModule({
  declarations: [
    AppComponent,
    PodcastListComponent,
    PodcastItemComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot()
  ],
  providers: [PodcastsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
