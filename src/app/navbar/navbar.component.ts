import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  dispname: string = null;
  constructor(private _authservice: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authservice.getIsUserLoggedIn().then(Resp => {
      if (Resp) {
        this.dispname = Resp["displayName"];
      }
      else {
        this._router.navigate(["/login"]);
      }
    })
  }

  logout() {
    this._authservice.signOut();
  }
}
