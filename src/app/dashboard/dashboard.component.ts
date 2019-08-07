import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  privateview: boolean = true;
  userdets: any = null;
  allideas: any = null;
  errormsg: any = null;

  constructor(private _authservice: AuthService, private _db: AngularFirestore) { }

  ngOnInit() {
    this._authservice.getIsUserLoggedIn().then(Resp => {
      if (Resp) {
        this.userdets = Resp
        this.getViewData();
      }
    });
  }

  changeView() {
    this.privateview = !this.privateview
    this.getViewData();
  }

  getViewData() {
    this.allideas = null;
    if (this.privateview == true) {
      //Get data for Private View
      //let pagecnt = page.pagecontent.replace(/\n/gi, '<br />');
      this._db.collection("private").doc(this.userdets.email).collection("ideas").valueChanges().subscribe(Resp => {
        this.allideas = Resp;
        this.errormsg = null;
        this.allideas = this.allideas.filter(function (val) {
          return val.desc = val.desc.replace(/\n/gi, '<br />');
        })
        console.log(Resp);
      }, error => {
        this.errormsg = "Something went wrong, please try again later."
      });
    }
    else {
      this._db.collection("public").valueChanges().subscribe(Resp => {
        this.allideas = Resp;
        this.errormsg = null;
        this.allideas = this.allideas.filter(function (val) {
          return val.desc = val.desc.replace(/\n/gi, '<br />');
        })
        console.log(Resp);
      }, error => {
        this.errormsg = "Something went wrong, please try again later."
      });
    }
  }
}
