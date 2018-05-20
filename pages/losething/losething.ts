import {Component, ViewChild,Renderer2,OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {LostPage} from "../lost/lost";
import {FindtPage} from "../findt/findt";
import {SuperTabs} from "ionic2-super-tabs";
// import {MoreinfolostPage} from "../moreinfolost/moreinfolost";
import {Http} from "@angular/http";

/**
 * Generated class for the LosethingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-losething',
  templateUrl: 'losething.html',
})
export class LosethingPage {

  page1=LostPage;
  page2=FindtPage;


  @ViewChild("myip") myip:any;
  searchtag="";
  flag=false;
  lostlist=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public render:Renderer2,
              public http:Http) {

    var url="http://39.108.95.115:8028/losthingofall";
    this.http.get(url,{}).subscribe((val)=>{


      for(var i of val.json()){

        // console.log(i);
        this.lostlist.push(i);


      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LosethingPage');
  }

  ngOnInit(){
    this.render.setStyle(this.myip.nativeElement,"webkitTransition","margin-left 500ms,width 500ms,opacity 500ms");
  }


  toggleSearch(){


    if (this.searchtag=="") {
      if (this.flag) {

        this.render.setStyle(this.myip.nativeElement, "margin-left", "98%");
        this.render.setStyle(this.myip.nativeElement, "width", "0px");
        this.render.setStyle(this.myip.nativeElement, "opacity", "0");
      } else {

        this.render.setStyle(this.myip.nativeElement, "margin-left", "0px");
        this.render.setStyle(this.myip.nativeElement, "width", "98%");
        this.render.setStyle(this.myip.nativeElement, "opacity", "1");
      }
      this.flag = !this.flag;
    }
  }

  goMoreInfo(_id){

    this.navCtrl.push("MoreinfolostPage",{id:_id});

  }


  back(){


    this.navCtrl.pop();
  }




}
