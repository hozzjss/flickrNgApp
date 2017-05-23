import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  ngOnInit() {
  }
  constructor(
    private data: DataService,
    private router: Router
  ) {
  }

  login(remember: HTMLInputElement): void {
    this.data.runApp(String(remember.checked))
  }
}
