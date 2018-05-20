import { Component,ViewChild,OnInit,Renderer2 } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, NavController, NavParams, normalizeURL, Platform,
  ToastController
} from 'ionic-angular';
import { File } from "@ionic-native/file";
import { Camera,CameraOptions } from "@ionic-native/camera";
import { FilePath } from "@ionic-native/file-path";
import {Http} from "@angular/http";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ExpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-exp',
  templateUrl: 'exp.html',
})
export class ExpPage {

  myphone="";
  myDatestartt="";
  myDateend="";
  @ViewChild("box") mybox:any;
  imgPath="";
  userFaceImg="assets/userface/user1.jpg";
  webimgurl="";
  flag=true;
  menu1=false;
  menu2=false;
  menu3=false;
  menu4=false;

  //失物招领
  losttitle=""
  lostcontent=""

  //表白内容
  bbcontent="";

  //分享内容
  sharecontent=""


  //活动标题
  activetitle="";
  linefun="";//联系方式
  address="";//活动地点
  who="";//主办方
  maxpeo="";
  activecontent="";
  readydate=""

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public render:Renderer2,
              public filePath:FilePath,
              public file:File,
              public camera:Camera,
              public actionSheet:ActionSheetController,
              public toast:ToastController,
              public platform:Platform,
              public http:Http,
              public fileTran:FileTransfer,
              public loading:LoadingController,
              public storage:Storage) {

    this.storage.get("userphone").then((val)=>{

      this.myphone=val;
    });

  }

  ngOnInit(){

   this.getElemt();
   this.render.setStyle(this.mybox.nativeElement,"webkitTransition","height 400ms");

  }

  ionViewWillEnter(){

   this.userFaceImg="assets/userface/user1.jpg";
    if(this.menu1||this.menu2||this.menu3||this.menu4){

    }else {
      setTimeout(() => {

        this.toggleAction();

      }, 200)
    }

  }

  ionViewDidLoad() {


    this.getElemt();
  }

  ionViewWillLeave(){



      this.flag = true;
      this.render.setStyle(this.mybox.nativeElement, "height", "0");

}

  getElemt(){


    console.log(this.mybox.nativeElement);

  }


  toggleAction(){

    if(this.flag){

      console.log("okkk");
      this.render.setStyle(this.mybox.nativeElement,"height","200px");


    }else {


      this.render.setStyle(this.mybox.nativeElement,"height","0px");
    }

    this.flag=!this.flag;


  }

  select1(){

    console.log("ok1");
    this.menu1=!this.menu1;
    this.toggleAction();

  }

  select2(){

    console.log("ok2");
    this.menu2=!this.menu2;
    this.toggleAction();


  }

  select3(){

    this.menu3=!this.menu3;
    this.toggleAction();


  }

  select4(){

    this.menu4=!this.menu4;
    this.toggleAction();

  }

  pubMenu1(){

    if(this.activetitle!=""&&this.linefun!=""&&this.address!=""&&this.who!=""&&this.activecontent!=""&&this.readydate!=""){

     this.uploadImg(1);

    }else{


      this.showToast("输入不能为空~");
    }
  }

//失物招领提交
  pubMenu2(){

    if(this.losttitle!=""&&this.lostcontent!=""){

      this.uploadImg(2)
    }else{

     this.showToast("输入不能为空~");

    }
  }

  //表白提交

  pubMenu3(){

    if(this.bbcontent!=""){

     // this.uploadImg();
    this.uploadImg(3);

    }else{

      this.showToast("输入不能为空~");
    }

  }


  pubMenu4(){

    if(this.sharecontent!=""){

      this.uploadImg(4);

    }else{

      this.showToast("输入不能为空~");
    }
  }


  cancelIt(){

    this.menu1=!this.menu1;
    this.toggleAction();

    //活动标题
    this.activetitle="";
    this.linefun="";//联系方式
    this.address="";//活动地点
    this.who="";//主办方
    this.maxpeo="";
    this.activecontent="";
    this.readydate=""

  }

  cancelIt2(){

    this.menu2=!this.menu2;
    this.toggleAction();
    //失物招领
    this.losttitle=""
    this.lostcontent=""

  }

  cancelIt3(){



    //表白内容
    this.bbcontent="";

    //分享内容
    this.sharecontent=""
    this.menu3=!this.menu3;
    this.toggleAction();
  }

  cancelIt4(){

    this.menu4=!this.menu4;
    this.toggleAction();
  }

  changeHeaderFace(){

    this.showActionSheets();
  }

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

  copyFiletoDir(namePath,currentName,newFileName){

    this.file.copyFile(namePath,currentName,cordova.file.dataDirectory,newFileName).then((success)=>{

      this.imgPath=newFileName;
      this.userFaceImg=this.getLocalCurrentPath(this.imgPath);

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

  deleteImg(){

    if(this.userFaceImg!="assets/userface/user1.jpg"){

      this.userFaceImg="assets/userface/user1.jpg";

    }else{

      this.userFaceImg="assets/userface/user1.jpg";
    }

    return false;
  }

  uploadImg(num1){

    if(this.userFaceImg=="assets/userface/user1.jpg") {

      if (num1 == 1) {

        this.testpub1("");

      } else if (num1 == 2) {

         this.testpub2("");

      }else if(num1==3){

        this.testpub3("");
      }else if(num1==4){

        this.testpub4("");
      }

    }
    else {


      var url = "http://39.108.95.115:8028/uploadimg";
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

        if (num1 == 3) {

          this.testpub3(imgurl);

        } else if (num1 == 2) {

          this.testpub2(imgurl);

        } else if (num1 == 1) {

          this.testpub1(imgurl);

        }else if(num1==4){

          this.testpub4(imgurl);
        }

      }, (err) => {

        loading.dismiss();
        this.showToast("上传失败，请重试");
      });
    }
  }


testpub3(imgurl){


  var weburl="http://39.108.95.115:8028/expresslovepost?phone="+this.myphone+"&imgurl="+imgurl+"&content="+this.bbcontent;
  this.http.get(weburl,{}).subscribe((val)=>{

      console.log(val);
      this.showToast("发布成功!");
  });

}

testpub2(imgurl){

  var weburl="http://39.108.95.115:8028/losthingpost?phone="+this.myphone+"&imgurl="+imgurl+"&title="+this.losttitle+"&content="+this.lostcontent;
  this.http.get(weburl,{}).subscribe((val)=>{

    console.log(val);
    this.showToast("发布成功");
  });
}

testpub1(imgurl){

  var url="http://39.108.95.115:8028/activepost?activetitle="+this.activetitle+"&linefun="+this.linefun+"&address="+this.address+"&who="+this.who+
    "&activecontent="+this.activecontent+"&start="+this.myDatestartt+"&end="+this.myDateend+"&readydate="+this.readydate+"&phone="+this.myphone+"&max="+this.maxpeo+"&imgurl="
    +imgurl;
  this.http.get(url,{}).subscribe((val)=>{

    if(val){
      this.showToast("发布成功，等待审核...");
    }
  });




}

testpub4(imgurl){

    var weburl="http://39.108.95.115:8028/sharepost?phone="+this.myphone+"&imgurl="+imgurl+"&content="+this.sharecontent;
    this.http.get(weburl,{}).subscribe((val)=>{

      console.log(val);
      this.showToast("发布成功！");

    });
}

getImgpath(val){

    var path =val.json().uploadpath;
    this.showToast(path);



}

}
