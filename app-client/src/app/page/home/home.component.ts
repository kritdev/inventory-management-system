import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = null;

  constructor(private homeService:HomeService) { }

  ngOnInit(): void {
    this.homeService
      .retrieveData()
      .subscribe(
        result => { this.data = result as any[]; },
        err => { alert(err); }
      );
  }

}
