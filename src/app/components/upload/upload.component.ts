import { Component, OnInit } from '@angular/core';
import { FlickrService } from "app/services/flickr/flickr.service";
import { UploadSettings } from "app/models/upload-settings.model";
import { DataService } from "app/services/data/data.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadSettings
  constructor(
    private flickr: FlickrService,
    private data: DataService
  ) { }

  update(title: HTMLInputElement, desc: HTMLInputElement) {
    this.uploadSettings = this.flickr.uploadData(title.value, desc.value)
  }
  submit(form: HTMLFormElement) {
    this.flickr.uploadPhoto(this.uploadSettings ,form)
        .subscribe(results => {
          this.data.reload()
          document.querySelector("form").reset()
          this.data.uploadSuccess = true;
          setTimeout(()=>this.data.uploadSuccess = false, 2000)
        })
  }
  ngOnInit() {
    this.uploadSettings = {
      api_key: "",
      auth_token: "",
      sig: ""
    }
  }

}
