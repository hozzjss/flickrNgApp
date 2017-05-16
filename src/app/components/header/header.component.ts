import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links: {name: string, href: string}[] = [
    {name: 'Home', href: 'dashboard'},
    {name: 'Galleries', href: 'galleries'},
    {name: 'Search', href: 'search'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
