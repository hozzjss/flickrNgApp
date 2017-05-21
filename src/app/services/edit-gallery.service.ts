import { Injectable } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Http } from "@angular/http";
import { ParsedGallery } from "app/models/galleries.model";
import { Params } from "@angular/router/src";
import { generateParams, parseParams } from "app/util/util";
import { Subject } from "rxjs/Subject";
import { REST_API } from "app/API_ENDPOINTS";

@Injectable()
export class EditGalleryService {

  constructor(
    private data: DataService,
    private http: Http
  ) { }

  submitChanges(gallery: ParsedGallery): Subject<boolean> {
    const state = new Subject<boolean>()
    const params: Params = generateParams(this.data.token,
      'flickr.galleries.editMeta',
      [
        `description${gallery.description}`,
        `title${gallery.title}`, `gallery_id${gallery.id}`
      ])

    this.http.get(REST_API + parseParams(params) +
      `description=${gallery.description}&title=${gallery.title}&gallery_id=${gallery.id}`)
      .subscribe((results) => {
        this.data.galleries = this.data.galleries.map(item => {
          if (item.id === gallery.id) {
            return gallery;
          }
        })
        if (results.json().stat === "ok") {
          state.next(true);
        } else {
          state.next(false);
        }
      })
    return state;
  }

}
