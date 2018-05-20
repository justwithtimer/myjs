import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ToastController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import {SignupPage} from "../signup/signup";
import { Http} from "@angular/http";
import {SginitPage} from "../sginit/sginit";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  password:string;
  phonenum:string;
  flag=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modal:ModalController,
              public http:Http,
              public toast:ToastController,
              public storage:Storage
              ) {

    this.storage.get("userphone").then((val)=>{

      if(val){

        this.navCtrl.setRoot(TabsPage);

      }else{

        this.flag=true;
      }
    });





  }

  ionViewDidLoad() {

  }

  //login
  doLogin(){


    if(this.phonenum.length==11&&this.password!=""&&this.password.length>=6){

      var url="http://39.108.95.115:8028/login?name="+this.phonenum+"&password="+this.password;

      this.http.get(url,{}).subscribe((val)=>{

        if(val.json().status=="OK"){

          this.storage.set("userphone",this.phonenum);
          this.navCtrl.setRoot(TabsPage);


        }else {

          this.showMsg("登录失败，账号或密码错误！");

        }
      },error2 => {

        this.showMsg("未知错误！请重试");

      });
    }else {

      this.showMsg("账号或密码错误,请重试")

    }
  }

  //reg
  doReg(){



  }

  showMsg(msg){

    let toast=this.toast.create({

      message:msg,
      duration:3000
    });
    toast.present();
  }

  gotoReg(){

    this.navCtrl.push(SginitPage);

  }


}
