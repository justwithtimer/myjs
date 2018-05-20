import { Component,ViewChild,Renderer2,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MoreactiveinfoPage} from "../moreactiveinfo/moreactiveinfo";
import {Http } from "@angular/http";

/**
 * Generated class for the ActiveinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activeinfo',
  templateUrl: 'activeinfo.html',
})
export class ActiveinfoPage {

  flag=false;
  searchtag="";
  activelists:any;
  @ViewChild("myip") myip:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public render:Renderer2,
              public http:Http) {

    var url="http://39.108.95.115:8028/activeofall?page=0";
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.activelists=val.json();
      }

    });

  }

  ngOnInit(){
    this.render.setStyle(this.myip.nativeElement,"webkitTransition","margin-left 500ms,width 500ms,opacity 500ms");
  }

  ionViewDidLoad() {

  }
  toggleSearch() {


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

  moreInfo(_id){
    this.navCtrl.push("MoreactiveinfoPage",{id:_id});
  }

  back(){

    this.navCtrl.pop();
  }


}
