import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-newidea',
  templateUrl: './newidea.component.html',
  styleUrls: ['./newidea.component.css']
})
export class NewideaComponent implements OnInit {
  ideaid: any = null;
  userdets: any = null;
  layout: any = "bg-default";
  status: any = "1";
  ideaprivatepublic: any = "2";
  title: string = null;
  description: string = null;
  featuretext: string = null;
  commenttext: string = null;
  allfeatures: any = [];
  allcomments: any = null;
  selectedfeature: any = null;
  alertpop: any = { success: false, msg: null };

  constructor(private _route: ActivatedRoute, private _db: AngularFirestore, private _authService: AuthService) {
    this._route.params.subscribe(Route => {
      this.ideaid = parseInt(Route.ideaid);

      if (this.ideaid != 0) {
        //Get Details of idea in edit mode
      }
    });
  }

  ngOnInit() {
    this._authService.getIsUserLoggedIn().then(Resp => {
      if (Resp)
        this.userdets = Resp
    })
  }

  addFeature() {
    this.allfeatures.push({ feature: this.featuretext });
    this.featuretext = null;
  }

  editFeature(index, feature) {
    this.featuretext = feature.feature;
    this.selectedfeature = index;
    console.log(index, this.selectedfeature)
  }

  saveFeature() {
    this.allfeatures[this.selectedfeature].feature = this.featuretext;
    this.selectedfeature = null;
    this.featuretext = null;
  }

  deleteFeature(index) {
    this.allfeatures.splice(index, 1);
  }

  postIdea() {
    let dt = new Date().getTime();
    let tmpObj: any = {
      id: dt,
      title: this.title,
      desc: this.description,
      features: this.allfeatures,
      status: this.status,
      pvtpub: this.ideaprivatepublic,
      layout: this.layout,
      dated: dt,
      owner: {
        username: this.userdets.displayName,
        email: this.userdets.email
      }
    }
    if (this.ideaprivatepublic == "1") {  //1 is private & 2 is public
      this._db.collection("private").doc(this.userdets.email).collection("ideas").doc("idea_" + dt).set(tmpObj).then(Response => {
        window.scrollTo(0, 0);
        this.resetEverything();
        this.alertpop.success = true;
        this.alertpop.msg = "Idea added successfully";
        let vm = this;
        setTimeout(function () {
          vm.alertpop = { success: false, msg: null };
        }, 2000)
      }, error => {
        window.scrollTo(0, 0);
        this.alertpop.success = false;
        this.alertpop.msg = "Something failed, kindly retry after sometime";
        let vm = this;
        setTimeout(function () {
          vm.alertpop = { success: false, msg: null };
        }, 2000)
      })
    }
    else {
      this._db.collection("public").doc("idea_" + dt).set(tmpObj).then(Response => {
        window.scrollTo(0, 0);
        this.resetEverything();
        this.alertpop.success = true;
        this.alertpop.msg = "Idea posted successfully";
        let vm = this;
        setTimeout(function () {
          vm.alertpop = { success: false, msg: null };
        }, 2000)
      }, error => {
        window.scrollTo(0, 0);
        this.alertpop.success = false;
        this.alertpop.msg = "Something failed, kindly retry after sometime";
        let vm = this;
        setTimeout(function () {
          vm.alertpop = { success: false, msg: null };
        }, 2000)
      })
    }
  }

  resetEverything() {
    this.layout = "bg-default";
    this.status = "1";
    this.ideaprivatepublic = "2";
    this.title = null;
    this.description = null;
    this.featuretext = null;
    this.commenttext = null;
    this.allfeatures = [];
    this.allcomments = null;
    this.selectedfeature = null;
  }

  selectLayout(layoutstyle) {
    this.layout = layoutstyle;
  }
}
