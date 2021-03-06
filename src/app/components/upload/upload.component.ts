import { Component, OnInit } from '@angular/core';
import { FlickrService } from "app/services/flickr.service";
import { UploadSettings } from "app/models/upload-settings.model";
import { DataService } from "app/services/data.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadSettings
  constructor(
    private flickr: FlickrService,
    private data: DataService
  ) { }

  update(title: HTMLInputElement, desc: HTMLInputElement) {
    this.uploadSettings = this.flickr.uploadData(title.value, desc.value, this.data.token)
  }
  submit(form: HTMLFormElement) {
    this.flickr.uploadPhoto(this.uploadSettings ,form)
        .subscribe(results => {
          this.data.reload()
          form.reset()
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
