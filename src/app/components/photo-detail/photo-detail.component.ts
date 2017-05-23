import { Component, OnInit, Input } from '@angular/core';
import { ImgItem } from "app/models/img.model";
import { CommentService } from "app/services/comment.service";
import { TagService } from "app/services/tag.service";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  constructor(
    private commentV: CommentService,
    private tagService: TagService
  ) { }
  @Input() img: ImgItem
  addingTag: boolean = false
  toggleAddTag() {
    this.addingTag = !this.addingTag
  }
  handleKeyup(event: KeyboardEvent) {
    const inp = <HTMLInputElement>event.target;
    if (event.key === "Enter") {
      this.addTag(inp.value);
      this.toggleAddTag();
    } else if (event.key === "Escape") {
      this.toggleAddTag();
    }
  }
  addTag(tags: string) {
    this.tagService.add(this.img.id, tags.split(" "));
  }
  comment(input: HTMLInputElement) {
    if (input.value.trim().length > 0) {
      this.commentV.create(this.img.id, input.value)
      input.value = ""
    }
  }
  ngOnInit() {
  }

}
