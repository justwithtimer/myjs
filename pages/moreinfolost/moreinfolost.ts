import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {Http } from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the MoreinfolostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moreinfolost',
  templateUrl: 'moreinfolost.html',
})
export class MoreinfolostPage {

  flag=false;
  lostid="";
  comment="";
  comments:any;
  contentlost:any;
  username="";
  createtime="";
  userface="";
  imgurl="";
  mycontent="";
  userheadface="";
  userphone="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl:LoadingController,
              public toastCtrl:ToastController,
              public http:Http,
              public storage:Storage) {

    this.storage.get("userphone").then((val)=>{

      this.userphone=val;

    });
    this.lostid=this.navParams.get("id");
    console.log(this.lostid);

      var url="http://39.108.95.115:8028/losthingof?"+"lostid="+this.lostid;

      this.http.get(url,{}).subscribe((val) => {

        if(val){

          this.createtime=val.json().createdtime;
          this.userface=val.json().userHeadface;
          this.username=val.json().nickname;
          this.imgurl=val.json().imgurl;
          this.mycontent=val.json().content;
          this.userheadface=val.json().userHeadface;
          this.comments=val.json().comment;
        }
      });
    console.log(this.lostid);

  }

  ionViewDidLoad() {


  }

  toggleComment(){

    this.flag=!this.flag;
  }

  toggleSend(){

    let loading=this.loadingCtrl.create({

      content:"正在发送..."

    });
    loading.present();

    var url="http://39.108.95.115:8028/forlostcomment?id="+this.lostid+"&phone="+this.userphone+"&content="+this.comment;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        loading.dismissAll();
        this.showToast("发送成功！");
        this.comment="";
        this.updatecomment();
        this.flag=!this.flag;
      }else{

        loading.dismissAll();
        this.showToast("发送失败");
      }

    });




  }

  showToast(msg){

    let toast=this.toastCtrl.create({

      message:msg,
      duration:3000
    });
    toast.present();
  }

  updatecomment(){

    var url="http://39.108.95.115:8028/losthingof?lostid="+this.lostid;

    this.http.get(url,{}).subscribe((val)=>{
      if(val){

        this.comments=val.json().comment;
      }

    });



  }


  back(){
    this.navCtrl.pop();
  }
}
