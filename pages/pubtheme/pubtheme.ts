import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform,ToastController,normalizeURL,LoadingController } from 'ionic-angular';
import { Camera,CameraOptions} from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import {FileTransfer, FileTransferObject,FileUploadOptions} from "@ionic-native/file-transfer";
import {elementStart} from "@angular/core/src/render3/instructions";

/**
 * Generated class for the PubthemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-pubtheme',
  templateUrl: 'pubtheme.html',
})
export class PubthemePage {

  lastImg = "";
  localImgPath = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheet: ActionSheetController,
              public camera: Camera,
              public transfer: FileTransfer,
              public file: File,
              public filePath: FilePath,
              public platform: Platform,
              public toast: ToastController,
              public loading:LoadingController) {
  }

  ionViewDidLoad() {

  }


  showActionSheet() {

    let actionsheet = this.actionSheet.create({

      title: "选择图片",
      buttons: [{

        text: "相册",
        handler: () => {

          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)

        }
      }, {

        text: "相机",
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {

        text: "取消",
        role: 'cancel'

      }]
    });

    actionsheet.present();

  }

  takePicture(sourceType) {

    var option: CameraOptions = {

      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(option).then((imgpath) => {

      if (this.platform.is("android") && sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {

        this.filePath.resolveNativePath(imgpath).then(filepath => {

          let currentPath = filepath.substr(0, filepath.lastIndexOf('/') + 1);
          let currentName = imgpath.substring(imgpath.lastIndexOf('/') + 1, imgpath.lastIndexOf('?'));
          this.copyFiletoLocalDir(currentPath, currentName, this.createFileName());

        });
      } else {
        var currentPath = imgpath.substr(0, imgpath.lastIndexOf('/') + 1);
        var currentName = imgpath.substr(imgpath.lastIndexOf('/') + 1);
        this.copyFiletoLocalDir(currentPath, currentName, this.createFileName());
      }
    }, err => {

      this.showToast("获取图片失败！");
    });
  }

  //复制文件。。。
  copyFiletoLocalDir(namePath, currentName, newFileName) {

    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {

      this.lastImg = newFileName;
      this.localImgPath = this.getCurrentLocalImgPath(this.lastImg);

    }, err => {

      this.showToast("图片获取失败！");

    });

  }

  //创建新的文件名
  createFileName() {

    var d = new Date();
    var n = d.getTime();
    var newfileName = n + ".jpg";
    return newfileName;

  }

  showToast(msg) {

    let toast = this.toast.create({

      message: msg,
      duration: 3000
    });

    toast.present();

  }


  getCurrentLocalImgPath(img) {

    if (img === null) {

      return "";
    } else {

      return normalizeURL(cordova.file.dataDirectory + img);
    }


  }


  upLoadImg() {

    var url = "http://localhost:4008/uploadimg";
    var targetPath = this.localImgPath;
    var b = new Date().getTime();
    var filename = "abcd.jpg";
    //上传参数
    var options={

      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {'fileName': filename, 'userid': "abcd"}
    };
    //开始上传
    const fileTransfer: FileTransferObject = this.transfer.create();

    let loading=this.loading.create({

      content:"正在上传..."

    });

    loading.present();

    fileTransfer.upload(targetPath,url,options).then((data)=>{

      loading.dismiss();
      console.log(data);
      this.showToast("上传成功!");

    },(err)=>{

        loading.dismiss();
        this.showToast("上传失败，请重试");
  });


  }


}
