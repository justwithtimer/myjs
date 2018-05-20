import { Component,ViewChild,Input,OnInit,Renderer2 } from '@angular/core';
import { Http } from "@angular/http";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ExpressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'express',
  templateUrl: 'express.html'
})
export class ExpressComponent {


  titlebb="";
  userphone="";
  flag=true;
  comment="";

  @Input("title") mytitle:any;

  @ViewChild("box") mybox:any;
  @ViewChild("content") mycontent:any;
  constructor(public render:Renderer2,
              public http:Http,
              public storage:Storage) {
    this.storage.get("userphone").then((val)=>{

      this.userphone=val;
      this.titlebb=this.mytitle.content.substr(0,7);

    });

    console.log(this.mytitle);
  }

  ngOnInit(){

    console.log(this.mybox.nativeElement);
    this.render.setStyle(this.mybox.nativeElement,"webkitTransition","max-height 500ms");
    this.render.setStyle(this.mycontent.nativeElement,"webkitTransition","opacity 500ms");
  }

  toggleAction(){

    if(this.flag){

      this.render.setStyle(this.mybox.nativeElement,"max-height","400px");
      this.render.setStyle(this.mycontent.nativeElement,"opacity","1");

    }else{

      this.render.setStyle(this.mybox.nativeElement,"max-height","0px");
      this.render.setStyle(this.mycontent.nativeElement,"opacity","0");

    }

    this.flag=!this.flag;

  }

  goComment() {

    var url="http://39.108.95.115:8028/expresslovecomment?"+"phone="+this.userphone+"&to="+this.mytitle.phone+"&content="+this.comment;

      if (this.comment != "") {
        this.http.get(url, {}).subscribe((val) => {

          if (val) {

            this.toggleAction();
            this.comment="";
          }
        });
      } else {

      }

    }


}
