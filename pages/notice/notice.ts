import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {NoticeinfoPage} from "../noticeinfo/noticeinfo";
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})

export class NoticePage {

  comments:any =[];
  pubcontent:any=[]
  notictype="commentnotice";
  friends:any;
  myphone=""

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public storage:Storage,
              public toast:ToastController) {

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;
      this.getFriend();
      this.getComment();


    });

  }

  ionViewDidLoad() {

  }

  goNoticeInfo(type,id){

    this.navCtrl.push("")

  }


  getFriend(){


    var url="http://39.108.95.115:8028/friendsinvate?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=> {

      if (val) {

       this.friends=val.json();


      }
    });
  }

  Acceptit(id,p){

    var url="http://39.108.95.115:8028/madefriend?tophone="+this.myphone+"&phone="+p;

    this.http.get(url,{}).subscribe((val)=>{

      if(val.json().status=="OK"){
        this.showToast("成功！");
        this.getFriend();
      }

    });
  }

  getComment(){

    var url="http://39.108.95.115:8028/forlovecommentforme?"+"phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{


      if(val) {

        if (val.json().status != "NULL") {

          this.comments.push(val.json().comment);
          if (this.comments.length > 0) {
            this.comments = this.comments[0];
            this.pubcontent.push(val.json().content);
            console.log(this.comments);
          }
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

  back(){

    this.navCtrl.pop();
  }

}
