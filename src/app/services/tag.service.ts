import { Injectable } from '@angular/core';
import { tagDirectory } from "app/services/directory";
import { Http } from "@angular/http";
import { generateParams, parseParams } from "app/util/util";
import { Params } from "@angular/router";
import { DataService } from "app/services/data.service";
import { REST_API } from "app/API_ENDPOINTS";
import { newTag } from "app/models/tags.model";

@Injectable()
export class TagService {

  constructor(
    private http: Http,
    private data: DataService
  ) { }
  delete(tagId: string, photoId: string) {
    const params: Params = generateParams(this.data.token, tagDirectory.removeTag, [`tag_id${tagId}`])
    this.http.get(REST_API + parseParams(params) + `tag_id=${encodeURIComponent(tagId)}`)
      .subscribe(results => {
        this.data.imgItems.forEach(img => {
          if (img.id === photoId) {
            img.tags = img.tags.filter(tag => tag.id !== tagId)
          }
        })
      })
  }
  add(photoId:string, tags: string[]) {
    const parsedTags = tags.join("+")
    const params: Params = generateParams(this.data.token, tagDirectory.addTags, [`tags${tags.join(" ")}`, `photo_id${photoId}`])
    this.http.get(REST_API + parseParams(params) + `tags=${parsedTags}&photo_id=${photoId}`)
      .subscribe(results => {
        const newTags: newTag[] = results.json().tags.tag;
        this.data.imgItems.forEach(img => {
          if (img.id == photoId) {
            img.tags.push(...newTags)
          }
        })
      })
  }
}
