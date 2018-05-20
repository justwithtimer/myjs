import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController, Content,AlertController} from 'ionic-angular';
import { Http } from "@angular/http";
import {Storage} from "@ionic/storage";
import {sanitizeUrl} from "@angular/platform-browser/src/security/url_sanitizer";

/**
 * Generated class for the MoreactiveinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({

  selector: 'page-moreactiveinfo',
  templateUrl: 'moreactiveinfo.html',
})
export class MoreactiveinfoPage {


  @ViewChild(Content) content: Content; //全局的 content
  flag = false;
  myphone="";
  posterid = "";
  edithcomment = "";
  activeContent = [];
  imgurl = "";
  comments: any;
  num=0;
  isjoin=false;
  show="参加";
  silderImg:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public http: Http,
              public alertCtrl:AlertController,
              public storage:Storage) {


    this.storage.get("userphone").then((val)=>{

      this.myphone=val;

    });
    this.posterid = this.navParams.get("id");
    var url = "http://39.108.95.115:8028/activeof?id=" + this.posterid;
    this.http.get(url, {}).subscribe((val) => {

      if (val) {

        this.activeContent.push(val.json());
        console.log(this.activeContent);
        this.imgurl = val.json().imgurl;
        this.comments = this.activeContent[0].comment;
        this.silderImg=this.activeContent[0].imgurl;
        this.InintJoin();
      }

    });

  }

  ionViewDidLoad() {

  }

  toggleComment() {

    this.flag = !this.flag;
  }

  toggleSend() {


    if(this.edithcomment!="") {
      let loading = this.loadingCtrl.create({

        content: "正在发送",
      });

      loading.present();
      var url = "http://39.108.95.115:8028/tocommentactive?phone=" + this.myphone + "&content=" + this.edithcomment;
      this.http.get(url, {}).subscribe((val) => {

        if (val) {

          this.showToast("发送成功！");
          loading.dismissAll();
          this.edithcomment = "";
          this.updatecomment();
        }
      });
    }else {
      this.flag=!this.flag;
    }
  }

  showToast(msg) {

    let toast = this.toastCtrl.create({

      message: msg,
      duration: 3000
    });
    toast.present();
  }

  updatecomment() {

    var url = "http://39.108.95.115:8028/activeofcomment?id=" + this.posterid
    this.http.get(url, {}).subscribe((val) => {


      if (val) {
        this.comments=val.json().comment;
        this.scrollToBottom();
      }
    });
  }


  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }


  join() {


    if (!this.isjoin) {

      let prompt = this.alertCtrl.create({
        title: '确认？',
        message: "确定参加这个活动吗？",
        // inputs: [
        //   {
        //     name: 'title',
        //     placeholder: 'Title'
        //   },
        // ],
        buttons: [
          {
            text: '取消',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '参加',
            handler: data => {


              var url = "http://39.108.95.115:8028/joinactive?id=" + this.posterid + "&phone=" + this.myphone;
              this.http.get(url, {}).subscribe((val) => {

                if (val.json().status == "OK") {

                  this.showToast("参加成功！");
                  this.num++;
                  this.isjoin = !this.isjoin;
                  if (this.isjoin) {

                    this.show = "退出";

                  }
                  else {

                    this.show = "参加";
                  }
                } else if (val.json().status == "NOLL") {

                    this.showToast("你已参加，不需重复~");

                  }
                });
            }
          }]
      });

      prompt.present();
    }else{

      let prompt = this.alertCtrl.create({
        title: '确认？',
        message: "确定退出这个活动吗？",
        // inputs: [
        //   {
        //     name: 'title',
        //     placeholder: 'Title'
        //   },
        // ],
        buttons: [
          {
            text: '取消',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '退出',
            handler: data => {

              var url = "http://39.108.95.115:8028/outactive?id=" + this.posterid + "&phone=" + this.myphone;
              this.http.get(url, {}).subscribe((val) => {

                if (val.json().status == "OK") {

                  this.showToast("退出成功！");
                  this.num--;

                  this.isjoin = !this.isjoin;
                  if (this.isjoin) {

                    this.show = "退出";

                  } else {

                    this.show = "参加";
                  }
                }
              });
            }
          }]
      });

      prompt.present();

    }
  }

  InintJoin(){

    var url = "http://39.108.95.115:8028/checkjoin?id=" + this.posterid + "&phone=" + this.myphone;
    this.http.get(url,{}).subscribe((val)=>{


      if(val.json().status=="NOLL"){

       this.show="退出";
       this.isjoin=true;

      }
    });
  }
}


