import { Component, OnInit } from '@angular/core';
import { DataService } from "app/services/data/data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
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
    this.data.runApp(remember.checked)
  }
}
