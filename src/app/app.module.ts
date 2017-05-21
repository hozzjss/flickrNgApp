import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from 'app/app.component';
import { FlickrService } from 'app/services/flickr.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AppRoute } from 'app/route/app-routing';
import { AuthService } from 'app/services/auth.service';
import { DashboardComponent } from 'app/components/dashboard/dashboard.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { SearchService } from "app/services/search.service";
import { SearchComponent } from "app/components/search/search.component";
import { GalleriesComponent } from "app/components/galleries/galleries.component";
import { PhotoComponent } from "app/components/photo/photo.component";
import { EditPhotoComponent } from "app/components/edit-photo/edit-photo.component";
import { DataService } from "app/services/data.service";
import { EditPhotoService } from "app/services/edit-photo.service";
import { UploadComponent } from "app/components/upload/upload.component";
import { GalleriesService } from "app/services/galleries.service";
import { GalleryItemComponent } from "app/components/gallery-item/gallery-item.component";
import { EditGalleryComponent } from "app/components/edit-gallery/edit-gallery.component";
import { NewGalleryComponent } from "app/components/new-gallery/new-gallery.component";
import { EditGalleryService } from "app/services/edit-gallery.service";
import { WelcomeComponent } from "app/components/welcome/welcome.component";
import { PhotoDetailComponent } from "app/components/photo-detail/photo-detail.component";
import { CommentComponent } from "app/components/comment/comment.component";
import { CommentService } from "app/services/comment.service";
import { TagComponent } from 'app/components/tag/tag.component';

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
    WelcomeComponent,
    PhotoDetailComponent,
    CommentComponent,
    TagComponent
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
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
