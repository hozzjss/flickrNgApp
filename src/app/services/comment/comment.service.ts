import { Injectable } from '@angular/core';
import { directory } from "app/services/comment/directory";
import { Params } from "@angular/router";
import { generateParams, parseParams, extractIconData } from "app/util/util";
import { DataService } from "app/services/data/data.service";
import { Http } from "@angular/http";
import { fNewCommentResponse, fComment } from "app/models/comments.model";


@Injectable()
export class CommentService {
  private REST_API: string = 'https://api.flickr.com/services/rest/?';
  constructor(
    private data: DataService,
    private http: Http
  ) { }
  public create(photoId: string, comment: string) {
    const params: Params = generateParams(this.data.token,
      directory.addComment, [`comment_text${comment}`, `photo_id${photoId}`])
    this.http.get(this.REST_API + parseParams(params) + `comment_text=${comment}&photo_id=${photoId}`)
      .subscribe(results => {
        const response: fNewCommentResponse = results.json();
        // it's either has something or it's undefined
        const commentRef = this.data.imgItems.filter(photo => photo.id === photoId)
        [0].comments || []
        commentRef.push({
          _content: response.comment._content,
          author: response.comment.author,
          authorname: response.comment.authorname,
          datecreate: response.comment.datecreate,
          iconfarm: extractIconData(response.comment.iconurls.default).farm,
          iconserver: extractIconData(response.comment.iconurls.default).server,
          id: response.comment.id,
          path_alias: response.comment.path_alias,
          permalink: response.comment.permalink,
          realname: response.comment.realname
        })
        this.data.imgItems.filter(photo => photo.id === photoId)[0].comments = commentRef
      })
  }
  edit(commentId: string, editedText: string) {
    const params: Params = generateParams(this.data.token, directory.editComment,
      [`comment_id${commentId}`, `comment_text${editedText}`]);
    return this.http.get(this.REST_API + parseParams(params) +
      `comment_id=${commentId}&comment_text=${editedText}`);
  }
  delete(commentId: string, photoId: string) {
    const params: Params = generateParams(this.data.token, directory.deleteComment, [`comment_id${commentId}`]);
    this.http.get(this.REST_API + parseParams(params) + `comment_id=${commentId}`)
      .subscribe(results => {
        this.data.imgItems.forEach(img => {
          if (img.id === photoId) {
            img.comments = img.comments.filter(comment => comment.id !== commentId)
          }
        })
      })
  }
}
