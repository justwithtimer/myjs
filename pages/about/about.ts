import {Component, ViewChild} from '@angular/core';
import { NavController,Platform,ToastController} from 'ionic-angular';
import { Http } from "@angular/http";
import {LosethingPage} from "../losething/losething";
import {ActiveinfoPage} from "../activeinfo/activeinfo";
import {MoreinfolostPage} from "../moreinfolost/moreinfolost";
import {MoreactiveinfoPage} from "../moreactiveinfo/moreactiveinfo";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  items=["abc","bcd","cde"];
  myInput="";

  exitflag=false;
  @ViewChild("myip") myip:any;
  searchtag="";
  flag=false;
  lostone=[];
  losttwo=[];
  actone=[];
  acttwo=[];



  constructor(public navCtrl: NavController,
              public http:Http,
              public platform:Platform,
              public toast:ToastController) {

    // this.getLost();
    // this.getAct();




  }





  hold(){


  }

  ionViewDidLoad(){

    this.getAct();
    this.getLost();

  }

  ionViewWillEnter(){

    this.doRefr();
  }
  onInput(e){


  }

  goMoreInfo(){

    this.navCtrl.push(LosethingPage);
  }

  goMoreInfoAct(){

    this.navCtrl.push(ActiveinfoPage);
  }

  getLost(){

    var url="http://39.108.95.115:8028/subscription_lost";
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

       var b=val.json();

       for(var i=0;i<b.length;i++){

         if(i%2==0){
           this.lostone.push(b[i]);
         }else{

           this.losttwo.push(b[i]);
         }

       }

      }
    });


  }


  goComment(id){


    this.navCtrl.push("MoreinfolostPage",{id:id});

  }

  goMoreFoLost(){

    this.navCtrl.push(LosethingPage);
  }


  getAct(){

    var url="http://39.108.95.115:8028/subscription_active";
    this.http.get(url,{}).subscribe((val)=>{
      if(val){

        this.actone=[];
        this.acttwo=[];
        var b=val.json();

        for(var i=0;i<b.length;i++){

          if(i%2==0){
            this.actone.push(b[i]);
          }else{

            this.acttwo.push(b[i]);
          }

        }

      }

    });



  }

  goActInfo(id){


    this.navCtrl.push("MoreactiveinfoPage",{id:id});
  }

  goMoreAct(){

    this.navCtrl.push(ActiveinfoPage);
  }


  doRefresh(e){

    var url="http://39.108.95.115:8028/subscription_lost";
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.lostone=[];
        this.losttwo=[];
        var b=val.json();

        for(var i=0;i<b.length;i++){

          if(i%2==0){
            this.lostone.push(b[i]);
          }else{

            this.losttwo.push(b[i]);
          }


          this.getAct();
          e.complete();

        }


      }
    });

  }

  doRefr(){

    var url="http://39.108.95.115:8028/subscription_lost";
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.lostone=[];
        this.losttwo=[];
        var b=val.json();

        for(var i=0;i<b.length;i++){

          if(i%2==0){
            this.lostone.push(b[i]);
          }else{

            this.losttwo.push(b[i]);
          }


          this.getAct();

        }


      }
    });


  }
}
