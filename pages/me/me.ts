import { Component,ViewChild } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, normalizeURL, Slides,
  LoadingController,AlertController
} from 'ionic-angular';
import {SelectThemePage} from "../select-theme/select-theme";
import {SettingPage} from "../setting/setting";
import { SettingDataProvider } from "../../providers/setting-data/setting-data";
import { File } from "@ionic-native/file";
import { Camera,CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import { SuperTab } from "ionic2-super-tabs";
import { TranPage } from "../tran/tran";
import { HomePage } from "../home/home";
import {ActivetjPage} from "../activetj/activetj";
import {JoinactPage} from "../joinact/joinact";
import {Http} from "@angular/http";
import {Storage} from "@ionic/storage";
import {FileTransferObject,FileTransfer} from "@ionic-native/file-transfer";

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  page1=TranPage;
  page2=TranPage;
  page3=TranPage;
  userLoveList:any;
  userActive:any;
  userLosting:any;
  nickname="";
  headface="";
  imgPath="";
  myphone="";
  defaultimg="http://39.108.95.115/images/people.png";

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  SwipedTabsIndicator :any= null;
  tabs:any=[];

  userFaceImg="assets/userface/user1.jpg";
  theme=false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public setThemeProvider:SettingDataProvider,
              public filePath:FilePath,
              public file:File,
              public camera:Camera,
              public actionSheet:ActionSheetController,
              public toast:ToastController,
              public platform:Platform,
              public http:Http,
              public storage:Storage,
              public loading:LoadingController,
              public fileTran:FileTransfer,
              public alertCtrl:AlertController) {

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;
      this.getUserinfo();
      this.getUserAction();
      this.getUserLosting();

    });
    this.getActiveTheme();

    this.tabs=["ios-apps","ios-albums","md-bookmark"];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

  logout(){

    console.log("logou is ok!")

  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.getUserLosting();
    this.getUserAction();
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // this condition is to avoid passing to incorrect index
    if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
    {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }

  }

  animateIndicator($event) {
    if(this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }


  getActiveTheme(){

    this.setThemeProvider.getActiveTheme().subscribe((val)=>{

      this.theme=val;
    });


  }


  goselectTheme(){


    this.navCtrl.push("SelectThemePage");
  }

  goSetting(){

    this.navCtrl.push("SettingPage");
  }

  changeTheme(){

   if(!this.theme){

   }
   this.setThemeProvider.setActiveTheme(!this.theme);
  }

//更换头像
  changeHeaderFace(){

    this.showActionSheets();
  }

  //弹出选择栏
  showActionSheets(){

    let actionSheet=this.actionSheet.create({

      title:"选择头像",
      buttons:[{

        text:"相册",
        handler:()=>{
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },{

        text:"相机",
        handler:()=>{
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },{
        text:"取消",
        role:'cancel'
      }]
    });

    actionSheet.present();

  }

  takePicture(sourceType){

    var option:CameraOptions={

      quality:100,
      sourceType:sourceType,
      saveToPhotoAlbum:false,
      correctOrientation:true
    };

    this.camera.getPicture(option).then((imgpath)=>{

      if(this.platform.is("android")&&sourceType==this.camera.PictureSourceType.PHOTOLIBRARY){

        let currentPath=this.filePath.resolveNativePath(imgpath).then((filepath)=>{

          let currentPath=filepath.substr(0,filepath.lastIndexOf('/')+1);
          let currentName=imgpath.substring(imgpath.lastIndexOf('/')+1,imgpath.lastIndexOf('?'));
          this.copyFiletoDir(currentPath,currentName,this.createNewFileName());

        });
      }else{

        let currentPath=imgpath.substr(0,imgpath.lastIndexOf('/')+1);
        let currentName=imgpath.substr(imgpath.lastIndexOf('/')+1);
        this.copyFiletoDir(currentPath,currentName,this.createNewFileName());
      }
    },(err)=>{

      this.showToast("获取图片错误!");
    });

  }

  //拷贝文件
  copyFiletoDir(namePath,currentName,newFileName){

    this.file.copyFile(namePath,currentName,cordova.file.dataDirectory,newFileName).then((success)=>{

      this.imgPath=newFileName;
      this.userFaceImg=this.getLocalCurrentPath(this.imgPath);
      this.headface=this.userFaceImg;


      setTimeout(()=>{

        let actr=this.alertCtrl.create({

          title: '确认？',
          message: "确定更换头像吗？",
          // inputs: [
          //   {
          //     name: 'title',
          //     placeholder: 'Title'
          //   },
          // ],
          buttons: [
            {
              text: '取消',
              handler: data => {
                console.log('Cancel clicked');
                this.headface=this.defaultimg;
              }
            },{

              text:"确认",
              handler:data=>{

                this.uploadImgforNet();

              }
            }]
        });

        actr.present();

      },2000);


    },(err)=>{

      this.showToast("获取图片失败！");
    });

  }

  //警告框
  showToast(msg){

    let toast=this.toast.create({

      message:msg,
      duration:3000
    });

    toast.present();
  }

  //获取准确的路径
  getLocalCurrentPath(img){

    if(img===null){
      return "";
    }else {

      return normalizeURL(cordova.file.dataDirectory+img);
    }
  }

  //创建新的文件名
  createNewFileName(){

    var d=new Date();
    var n=d.getTime();
    var filename=n+".jpg";
    return filename;
  }
  //上传图片到服务器
  uploadImgforNet(){

    var url = "http://www.gdcjxy.com/uploads/171205";
    var targetPath = this.userFaceImg;
    var b = new Date().getTime();
    var filename = "abc00000.jpg";
    //上传参数
    var options = {

      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': filename, 'userid': "abcd"}
    };
    //开始上传
    const fileTransfer: FileTransferObject = this.fileTran.create();

    let loading = this.loading.create({

      content: "正在上传..."

    });

    loading.present();

    fileTransfer.upload(targetPath, url, options).then((v) => {

      loading.dismiss();
      var path=v.response;
      var num=path.length;
      var imgurl = path.substr(1,num-2);
      this.updateimg(imgurl);

  });
}

  goActivetj(){

    this.navCtrl.push("ActivetjPage");

  }

  getnotice(){


    // this.navCtrl.push("JoinactPage");
    this.navCtrl.push("NoticePage");

  }

   goMyAction (){


    this.navCtrl.push("JoinactPage");

   }

   getUserinfo(){

    var url="http://39.108.95.115:8028/myuserinfo?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      if(val){

        this.nickname=val.json().nickname;
        this.headface=val.json().userHeadface;

      }

    });

   }

   updateimg(imgurl){

     var weburl="http://39.108.95.115:8028/updateheadface?phone="+this.myphone+"&imgurl="+imgurl;
     this.http.get(weburl,{}).subscribe((val)=>{

       this.showToast("完成");
       this.getUserinfo();
     });
   }

  toset(){

    this.navCtrl.push(SettingPage);

  }

  getUserLove(){



  }

  getUserLosting(){

    var url="http://39.108.95.115:8028/lostofuser?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      this.userLosting=val.json();
    });

  }


  deleteLosting(id){

    var url="http://39.108.95.115:8028/removelosting?id="+id;
    this.http.get(url,{}).subscribe((val)=>{

      if(val.json().status=="OK"){

        this.showToast("删除成功...");
        this.getUserLosting();
      }

    });
  }


  deleteAction(id){

    var url="http://39.108.95.115:8028/removeactive?id="+id;
    this.http.get(url,{}).subscribe((val)=>{

      if(val.json().status=="OK"){

        this.showToast("删除成功...");
        this.getUserAction();
      }

    });
  }

  getUserAction(){

    var url="http://39.108.95.115:8028/activeofuser?phone="+this.myphone;
    this.http.get(url,{}).subscribe((val)=>{

      this.userActive=val.json();

    });

  }

  cofigDeleteAction(id){


    let alert=this.alertCtrl.create({

      title:"确定删除这个活动?",
      buttons:[

        {
          text:"取消",
          role:"cancel"

        },{

        text:"确定",
          handler:()=>{

          this.deleteAction(id)

          }

        }

      ]


    });

    alert.present();


  }


  cofigDeleteLosting(id){

    let alert=this.alertCtrl.create({

      title:"确定删除这个失物信息?",
      buttons:[
        {

          text:"取消",
          role:"cancel"

        },
        {

          text:"确定",
          handler:()=>{


            this.deleteLosting(id);
          }

        }

      ]


    });

    alert.present();
  }

}
