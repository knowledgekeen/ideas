import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { EncdecService } from '../encdec.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isLoggedIn: any = null;

  constructor(private _firebaseAuth: AngularFireAuth, private _encdec: EncdecService, private _router: Router) { }


  setIsUserLoggedIn(value) {
    if (value) {
      if (sessionStorage) {
        sessionStorage.setItem("userkey", this._encdec.encrypt(value));
      }
    }
    else {
      this.isLoggedIn = value;
    }
  }

  getIsUserLoggedIn() {
    return new Promise((resolve, reject) => {
      if (sessionStorage) {
        if (sessionStorage.getItem("userkey")) {
          resolve(this._encdec.decrypt(sessionStorage.getItem("userkey")));
        }
        else {
          this.signOut();
        }
      }
    });
  }

  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res => {
          this.setIsUserLoggedIn(res.user);
          resolve(true);
        }, err => {
          reject("Wrong User");
        });
    });
  }

  signOut() {
    this._firebaseAuth.auth.signOut();
    this.isLoggedIn = null;
    sessionStorage.clear();
    this._router.navigate(["/login"]);
  }
}
