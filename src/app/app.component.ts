import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { Auth } from "app/models/auth.model";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    public data: DataService
  ) {
  }
  onScroll() {
    console.log("Scrolling...")
    if (location.href.indexOf("dashboard") !== -1) {
      this.data.morePhotos()
    }
    if (location.href.indexOf("galleries") !== -1) {
      this.data.moreGalleries()
    }
  }
  ngOnInit(): void {
    // wait till the page loads and the search params are available
    Observable.of(location.search)
      .subscribe((res) => {
        // if you find flickr's access token then the user must have chosen to log in
        // authenticate with it and run the app
        // runApp() stores the token in localstorage 
        // until either the user logs out if they chose to stay logged in
        // or until they close their browser if they didn't
        if (res.length > 0) {
          const frob = res.substr(6);
          this.auth.authenticate(frob)
            .subscribe((results) => {
              const authData: Auth = results.json()
              this.data.runApp(localStorage.getItem('stayLoggedIn'), authData.auth.token._content, authData.auth.user.nsid)
            })
        }
        // if you don't have a user token stored redirect to login page
        // which would log the user in with their flickr account
        else if (localStorage.getItem('token') === null) {
          this.router.navigate(['login'])
        }
        // if everything seems fine and the token is stored run the app
        else {
          this.data.runApp()
        }
      })
  }

}
