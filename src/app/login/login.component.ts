import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this._authService.getIsUserLoggedIn().then(Resp => {
      if (Resp) {
        this._router.navigate(["/dashboard"]);
      }
    })
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle().then(Resp => {
      this._router.navigate(["/dashboard"]);
    })
  }

}
