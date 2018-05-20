import { Component,ViewChild,Renderer2 } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,TextInput,ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";
import {Http} from "@angular/http";

/**
 * Generated class for the ChatwithPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatwith',
  templateUrl: 'chatwith.html',
})
export class ChatwithPage {

  @ViewChild(Content) content: Content; //全局的 content
  @ViewChild('chatInput') messageInput: TextInput; //获取前台的输入框


  friendface=""
  mynickname="";
  myheaderface="";
  userphone="";
  userfrom='';
  userto='';
  message="";
  messages=[];
  nickname='';
  Messages:any=[{data:"hello"},{data:"hi"}];
  isOpenEmojiPicker=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public socket:Socket,
              public toastCtrl:ToastController,
              public render2:Renderer2,
              public storage:Storage,
              public http:Http
              ) {

    this.storage.get("userphone").then((val)=>{

      this.userphone=val;
      this.getMyinfo();
      this.getFriendinfo();

    });


    // this.nickname = this.navParams.get('nickname');
    this.userfrom=this.navParams.get('from');
    this.userto=this.navParams.get('to');
    this.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
      this.scrollToBottom();

    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatwithPage');
  }

  switchEmojiPicker(){

    this.isOpenEmojiPicker=!this.isOpenEmojiPicker;
    if(this.isOpenEmojiPicker) {

     //this.render2.setStyle(this.content,"top","-255px");
    }
  }

  sendMessage() {

    if (this.message != "") {
      this.scrollToBottom();
      var data = {text: this.message, from: this.userfrom, to: this.userto};
      this.messages.push(data);
      this.socket.emit('add-message', data);
      this.message = '';
    }
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  focus(){

    this.isOpenEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();

  }

  scrollToBottom(): any {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400);
  }

  private getMessage() {

  }

  getMyinfo(){

    var url="http://39.108.95.115:8028/myuserinfo?phone="+this.userphone;
    this.http.get(url,{}).subscribe((val)=>{

      var str=val.json().userHeadface;
      this.myheaderface=str;
    });

  }

  getFriendinfo(){

    var url="http://39.108.95.115:8028/myuserinfo?phone="+this.userphone;
    this.http.get(url,{}).subscribe((val)=>{

      var str=val.json().userHeadface;
      this.friendface=str;
    });


  }

  back(){

    this.navCtrl.pop();
  }
}
