import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data/data.service";
import { AuthService } from "app/services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links: {name: string, href: string}[] = [
    {name: 'Home', href: 'dashboard'},
    {name: 'Galleries', href: 'galleries'},
    {name: 'Search', href: 'search'},
  ]

  constructor(
    private auth: AuthService
  ) { }
  logout() {
    this.auth.logout()
  }
  ngOnInit() {
  }

}
