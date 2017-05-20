import { Component, OnInit, Input } from '@angular/core';
import { ImgItem } from "app/models/img.model";
import { CommentService } from "app/services/comment/comment.service";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent implements OnInit {
  constructor(
    private commentV: CommentService
  ) { }
  @Input() img:ImgItem
  comment(input: HTMLInputElement) {
    if (input.value.trim().length > 1) {
      this.commentV.create(this.img.id, input.value)
      input.value = ""
    }
  }
  ngOnInit() {
  }

}
