import { Component,ViewChild ,Renderer2,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WhoactivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-whoactive',
  templateUrl: 'whoactive.html',
})
export class WhoactivePage {


  flag=true
  ccinput="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public render2:Renderer2) {
  }

  @ViewChild("boxs") mybox;


  ngOnInit(){

    this.render2.setStyle(this.mybox.nativeElement,"webkitTransition","width 500ms,height 500ms");

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WhoactivePage');
  }


  changeit(){

    if(this.flag) {
      this.render2.setStyle(this.mybox.nativeElement, "width", "100px");
      this.render2.setStyle(this.mybox.nativeElement, "height", "100px");
    }else{

      this.render2.setStyle(this.mybox.nativeElement, "width", "300px");
      this.render2.setStyle(this.mybox.nativeElement, "height", "300px");

    }
    this.flag=!this.flag;

  }


}
