import { Component ,ViewChild,Renderer2} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {MoreinfoPage} from "../moreinfo/moreinfo";

/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  page1=HomePage;
  page2=MoreinfoPage;
  ionViewDidLoad() {

    console.log('ionViewDidLoad BookPage');
  }


}
