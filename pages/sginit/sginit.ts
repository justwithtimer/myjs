import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { SignupPage } from "../signup/signup";
import { Http } from "@angular/http";
import {Storage } from "@ionic/storage";

/**
 * Generated class for the SginitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sginit',
  templateUrl: 'sginit.html',
})
export class SginitPage {

  phonenum="";
  surecode="";
  password="";
  regpassword="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast:ToastController,
              public http:Http,
              public storage:Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SginitPage');
  }

  getNext(){

    if(this.phonenum!=""&&this.phonenum.length==11
    &&this.password!=""&&this.password.length>=6){

      var aimUrl="http://39.108.95.115:8028/signup/stepone?phone="+this.phonenum+"&password="+this.password;
      this.http.post(aimUrl,{}).subscribe((val)=>{

        console.log(val.json());
        if(val.json().status=="OK"){

          this.navCtrl.push(SignupPage,{phoneNum:this.phonenum});
          this.storage.set("userphone",this.phonenum);

        }else{

          this.showToast("未知错误！")
        }

      });

    }else {

      this.showToast("输入有误，请重试！");
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
