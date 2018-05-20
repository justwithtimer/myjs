import { Component,ViewChild,Renderer2,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the ActivetjinfpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activetjinfp',
  templateUrl: 'activetjinfp.html',
})
export class ActivetjinfpPage {



  boynum=0;
  grilnum=0;
 @ViewChild("boy") myboy:any;
 @ViewChild("gril") mygril:any;
  actcontent="";
  activetitle="";
  posterid="";
  activeTj:any;
  max=18;
  joinnum;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:Http,
              public render:Renderer2) {

    this.posterid=this.navParams.get("id");
    var url="http://39.108.95.115:8028/myactivetjinfo?id="+this.posterid;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        console.log(val.json());
        this.actcontent=val.json().content;
        this.activetitle=val.json().title;
        this.activeTj=val.json().join;
        this.joinnum=this.activeTj.length;
      }
      for(var i=0;i<this.activeTj.length;i++){

        // console.log(this.activeTj[i].sex);
        if(this.activeTj[i]["sex"]=="男"){
          this.boynum++;
        }else{
          this.grilnum++;
        }
      }
      this.runStatus();
    });

  }
  ngOnInit(){

    this.render.setStyle(this.myboy.nativeElement,"webkitTransition","width 300ms");
    this.render.setStyle(this.mygril.nativeElement,"webkitTransition","width 300ms");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivetjinfpPage');
  }

  runStatus(){


    var widthpx=280/this.max;
    var boywidth=(widthpx*this.boynum)+"px";
    var grilwidth=(widthpx*this.grilnum)+"px";
   this.render.setStyle(this.mygril.nativeElement,"width",grilwidth);
   this.render.setStyle(this.myboy.nativeElement,"width",boywidth);


  }


}
