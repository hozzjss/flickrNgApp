import { Component, Input } from '@angular/core';
import { Tag } from "app/models/tags.model";
import { TagService } from "app/services/tag.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

  constructor(
    private tagService: TagService
  ) { }
  @Input() tagItem: Tag
  @Input() photoId: string
  delete() {
    this.tagService.delete(this.tagItem.id, this.photoId)
  }

}
