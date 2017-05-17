import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from 'app/app.component';
import { FlickrService } from 'app/services/flickr/flickr.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AppRoute } from 'app/route/app-routing';
import { AuthService } from 'app/services/auth/auth.service';
import { DashboardComponent } from 'app/components/dashboard/dashboard.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { SearchService } from "app/services/search/search.service";
import { SearchComponent } from "app/components/search/search.component";
import { GalleriesComponent } from "app/components/galleries/galleries.component";
import { PhotoComponent } from "app/components/photo/photo.component";
import { EditPhotoComponent } from "app/components/edit-photo/edit-photo.component";
import { DataService } from "app/services/data/data.service";
import { EditPhotoService } from "app/services/edit-photo/edit-photo.service";
import { UploadComponent } from "app/components/upload/upload.component";
import { GalleriesService } from "app/services/galleries/galleries.service";
import { GalleryItemComponent } from "app/components/gallery-item/gallery-item.component";
import { EditGalleryComponent } from "app/components/edit-gallery/edit-gallery.component";
import { NewGalleryComponent } from "app/components/new-gallery/new-gallery.component";
import { EditGalleryService } from "app/services/edit-gallery/edit-gallery.service";
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SearchComponent,
    GalleriesComponent,
    PhotoComponent,
    EditPhotoComponent,
    UploadComponent,
    GalleryItemComponent,
    EditGalleryComponent,
    NewGalleryComponent,
    WelcomeComponent
  ],
  imports: [
    AppRoute,
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule
  ],
  providers: [
    FlickrService,
    AuthService,
    SearchService,
    DataService,
    EditPhotoService,
    GalleriesService,
    EditGalleryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
