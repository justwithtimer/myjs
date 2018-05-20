import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AddfriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfriend',
  templateUrl: 'addfriend.html',
})
export class AddfriendPage {

  items=[];
  myinput="";
  myphone=""
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public toast:ToastController,
              public storage:Storage) {

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddfriendPage');
  }

  addFriend(){

    this.showToast(this.myphone);
    if(this.myinput!="") {

      // this.items=[];
      var url = "http://39.108.95.115:8028/findfriends?phone=" + this.myinput;
      this.http.get(url, {}).subscribe((val) => {

        if (val) {
          this.myinput = "";
          this.items.push(val.json());

        }
      });
    }else{


    }


  }

  sureAddFriend(v){


    var url="http://39.108.95.115:8028/addfriend?phone="+this.myphone+"&tophone="+v;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        if(val.json().status=="OK"){

          this.showToast("信息已发送,等待对方确认");
        }else if(val.json().status=="NO"){
          this.showToast("信息已经多次提交");
        }
      }

    });

  }

  showToast(msg){


    let toast=this.toast.create({

      message:msg,
      duration:3000

    });
    toast.present();
  }

}
