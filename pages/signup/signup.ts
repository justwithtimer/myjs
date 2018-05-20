import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { Http} from "@angular/http";
import {SetsignupinfoPage} from "../setsignupinfo/setsignupinfo";
import {TabsPage} from "../tabs/tabs";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  username="";
  usernickname="";
  prof="";
  sex="";
  surephone="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast:ToastController,
              public http:Http) {
   this.surephone=this.navParams.get("phoneNum");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


   getNext() {



     this.navCtrl.setRoot(TabsPage);
    if(this.username!=""&&this.username.length<10
    &&this.usernickname!=""&&this.usernickname.length<10){
      var url="http://39.108.95.115:8028/signup/steptwo?surephone="+this.surephone+"&username="+this.username+"&usernickname="+this.usernickname+"&prof="+this.prof+"&sex="+this.sex;
      this.http.post(url,{}).subscribe((val)=>{



      });
    }

   }

   showToast(msg){

    let toast=this.toast.create({

      message:msg,
      duration:3000
    });
    toast.present();

   }

}
