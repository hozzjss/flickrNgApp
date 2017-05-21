import { Component, OnInit, Input } from '@angular/core';
import { Tag } from "app/models/tags.model";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor() { }
  @Input() tagItem: Tag
  ngOnInit() {
  }

}
