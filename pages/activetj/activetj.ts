import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ActivetjinfpPage} from "../activetjinfp/activetjinfp";
import {Http } from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ActivetjPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activetj',
  templateUrl: 'activetj.html',
})
export class ActivetjPage {

  activeLists:any;
  myphone="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public storage:Storage) {

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;
      this.getMytg();

    });

  }

  ionViewDidLoad() {

  }

  moreInfo(id){

    this.navCtrl.push("ActivetjinfpPage",{id:id});
  }

  getMytg(){

    var url="http://39.108.95.115:8028/activetj?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.activeLists=val.json();
      }

    });
  }

  back(){

    this.navCtrl.pop();
  }

}
