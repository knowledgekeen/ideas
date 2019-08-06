import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private isLoggedIn = false;

  constructor(private _firebaseAuth: AngularFireAuth) { }


  setIsUserLoggedIn(value){
    this.isLoggedIn = value;
  }
 
  getIsUserLoggedIn(){
    return this.isLoggedIn;
  }
 

  signInWithGoogle() {
     this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(res =>{
      console.log(res);
      this.setIsUserLoggedIn(true);
    }, err => {
      alert("Wrong User");
    });
  }

}
