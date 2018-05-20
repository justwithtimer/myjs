import {Component} from '@angular/core';
import { MePage} from "../me/me";
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { SendPosterPage } from '../send-poster/send-poster';
import {ExpPage} from "../exp/exp";
import {Platform, NavController, ToastController} from "ionic-angular";
import {App} from "ionic-angular";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;//推荐
  tab2Root = SendPosterPage;//分类
  tab3Root =ExpPage;//表白
  tab4Root = HomePage;//联系人
  tab5Root = MePage;//
  exitflag=false;
  constructor(public platform:Platform,
              public appCtrl:App,
              public toast:ToastController) {


    this.platform.ready().then(()=>{


      this.platform.registerBackButtonAction(() => {

        let activeNav: NavController = this.appCtrl.getActiveNavs()[0];
        if (activeNav.canGoBack()) {

          activeNav.pop();

        } else {

          this.showExit();
          return false;

        }

      });

    });

  }

  showExit(){

    let toast=this.toast.create({

      message:"再按一次退出",
      duration:2000,
      position:'bottom'
    });

    if(!this.exitflag){

      toast.present();

    }else{

      this.platform.exitApp();

    }

    this.exitflag=true;
    setTimeout(()=>{

      this.exitflag=false;
    },2000);


  }




}
