import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/services/search/search.service";
import { Subject } from "rxjs/Subject";
import { FlickrResult } from "app/models/result.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  emailSearch: Subscription
  userSearch: Subscription
  terms$: Subject<string> = new Subject()
  searchResult: FlickrResult
  constructor(
    private search: SearchService
  ) { }
  method: string
  searchBy(value: string): void {
    if (value === "email") {
      this.userSearch.unsubscribe()
      this.emailSearch = this.search.byEmail(this.terms$)
        .subscribe(results => this.searchResult = results.json())
    }
    else {
      this.emailSearch.unsubscribe()
      this.ngOnInit()
    }
  }
  ngOnInit() {
    this.userSearch = this.search.byUsername(this.terms$)
      .subscribe(results => this.searchResult = results.json())
  }

}
