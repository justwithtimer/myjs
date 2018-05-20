import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,ToastController} from 'ionic-angular';
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the JoinactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-joinact',
  templateUrl: 'joinact.html',
})
export class JoinactPage {

  myphone="";
  activelists:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public storage:Storage,
              public alert:AlertController,
              public toast:ToastController) {

    this.storage.get("userphone").then((val)=>{


      this.myphone=val;
      this.getAct();

    });

  }

  ionViewDidLoad() {

  }


  outActive(_id){

    let alert=this.alert.create({

      title:"确定退出这个活动?",
      buttons:[{

        text:"取消",
        role:"cancel"
      },{

        text:"退出",
        handler:()=>{


          var url = "http://39.108.95.115:8028/outactive?id=" + _id + "&phone=" + this.myphone;
          this.http.get(url, {}).subscribe((val) => {

            if (val.json().status == "OK") {

              this.showToast("退出成功！");
              this.getAct();
            }
          });
        }
      }]

    });

    alert.present();
    return false;
  }

  getAct(){

    var url="http://39.108.95.115:8028/myactive?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.activelists=val.json();
        console.log(val.json());

      }
    });
  }

  back(){

    this.navCtrl.pop();
  }


  showToast(msg){


    let toast=this.toast.create({

      message:msg,
      duration:2000
    });

    toast.present();
  }

  goInfo(id){

    this.navCtrl.push("MoreactiveinfoPage",{id:id});

  }

}
