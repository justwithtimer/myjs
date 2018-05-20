import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ChatwithPage } from "../chatwith/chatwith";
import { MoreinfoPage } from "../moreinfo/moreinfo";
import { Socket } from 'ng-socket-io';
import {Http } from "@angular/http";
import {AddfriendPage} from "../addfriend/addfriend";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  iam:string;
  friendsList:any;
  myphone="";
  constructor(public navCtrl: NavController,
              public socket:Socket,
              public params:NavParams,
              public http:Http,
              public storage:Storage) {

    this.iam=this.params.get("user");

    this.storage.get("userphone").then((val)=>{


      this.myphone=val;

    });

  }


  gotoChat(to){

    this.socket.connect();
    this.socket.emit('set-nickname',this.myphone);
    this.navCtrl.push(ChatwithPage,{from:this.myphone,to:to});
  }


  goMoreinfo(){

  this.navCtrl.push(MoreinfoPage);

  }

  addfriends(){

    this.navCtrl.push("AddfriendPage");


  }

  getFriend(){


    var url="http://39.108.95.115:8028/personalfriends?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.friendsList=val.json().friends;

      }
    });

  }

  ionViewWillEnter(){

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;
      this.getFriend();

    });

  }

}

