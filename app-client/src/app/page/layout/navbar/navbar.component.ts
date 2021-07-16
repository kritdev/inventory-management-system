import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/security/auth/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentLogin = '';
  
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    if (this.accountService.isAuthenticated()) {
      this.getLoginName();
      return true;
    } 

    return false;
  }

  getLoginName() {
    this.accountService.identity()
      .subscribe(
        account => { this.currentLogin = account.login; }
      )
  }
}
