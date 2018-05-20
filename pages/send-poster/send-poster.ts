import {Component, ElementRef, ViewChild,Renderer2} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the SendPosterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-poster',
  templateUrl: 'send-poster.html',
})
export class SendPosterPage {

  @ViewChild('bgball') bgball:ElementRef;

  bbresult:any;
  editToggle=false;
  expEdit='';



  //

  mytest={create:"201899",content:"9999d"};
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public render:Renderer2,
              public http:Http) {


  }

  ionViewWillEnter(){

    this.updatePoster();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPosterPage');
  }

  editToggleSelect(){


    this.editToggle=!this.editToggle;


  }

  sendMsg(){

    if(this.expEdit==''){

      return;
    }

    if(this.editToggle){

      var msg=this.expEdit;
      this.editToggle=!this.editToggle;
      this.expEdit="";

    }

  }

  doRefresh(e){


    setTimeout(()=>{

      e.complete();
      console.log("刷新完成！");
    },3000)


  }

  doInfinite(e){

    setTimeout(()=>{

      e.complete();
    },3000);

  }

  updatePoster(){

    this.http.get("http://39.108.95.115:8028/expressloveall",{}).subscribe((val)=>{

      if(val) {

        console.log(val.json());
        this.bbresult = val.json();
      }
    });
  }

}
