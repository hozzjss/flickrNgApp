import { Injectable } from '@angular/core';
import { Params } from "@angular/router";
import { generateParams, parseParams } from "app/util/util";
import { DataService } from "app/services/data.service";
import { ImgItem } from "app/models/img.model";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { editDirectory } from "app/directory";

@Injectable()
export class EditPhotoService {
  private REST_API: string = 'https://api.flickr.com/services/rest/?';

  constructor(
    private data: DataService,
    private http: Http
  ) { }

  submitChanges(img: ImgItem): Subject<boolean> {
    const state = new Subject<boolean>()
    const params: Params = generateParams(
      this.data.token,
      editDirectory.ChangeDescription,
      [
        `description${img.description}`,
        `title${img.title}`, `photo_id${img.id}`
      ])
      
    this.http.get(this.REST_API + parseParams(params) +
      `description=${img.description}&title=${img.title}&photo_id=${img.id}`)
      .subscribe((results) => {
        const response = results.json().photo;
        img.description = response.description._content;
        img.title = response.title._content;
        if (results.json().stat === "ok") {
          state.next(true);
        } else {
          state.next(false);
        }
      })
    return state;
  }

}
