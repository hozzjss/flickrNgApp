import { Component, OnInit, Input } from '@angular/core';
import { fComment } from "app/models/comments.model";
import { CommentService } from "app/services/comment/comment.service";
import { genCommentIcon } from "app/util/util";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(
    private commentService: CommentService
  ) { }
  @Input() photoId: string
  @Input() comment: fComment
  editing: boolean = false
  imgSrc: string
  toggleEdit(editEl?: HTMLInputElement) {
    if (editEl) {
      console.log(editEl)
      editEl.focus()
    }
    this.editing = !this.editing;
  }
  editComment(event: KeyboardEvent, editEl: HTMLInputElement) {
    if (event.key === 'Enter') {
      this.commentService.edit(this.comment.id, editEl.value)
        .subscribe(results => {
          this.comment._content = editEl.value;
          this.toggleEdit();
        })
    } else if (event.key === "Escape") {
      this.toggleEdit();
    }
    return false;
  }

  delete() {
    if (confirm("Are you sure you want to delete this comment?"))
      this.commentService.delete(this.comment.id, this.photoId)
  }
  ngOnInit() {
    this.imgSrc = genCommentIcon(this.comment);
  }

}
