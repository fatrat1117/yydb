import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {Product} from '../../models/product';
import { ProductsService } from '../../providers/products/products';
import { ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
 tabBarElement: any;

 product={images: []};
   constructor(public navCtrl: NavController, private camera : Camera, af: AngularFireDatabase,  public productService: ProductsService,  public viewCtrl: ViewController, public translateService: TranslateService) {
 this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

 ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
   ionViewDidLoad() {
        this.viewCtrl.setBackButtonText('');
    }
addItem() {
    this.productService.add(this.product);
    this.navCtrl.pop();
  }

 b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 256;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  selectImgUploadGetUrl(imgId, width, height, success, error) {
    
    let getImgSuccess = data => {
       let success = data => {
        this.product.images.push(data);
    console.log(this.product);
      }
      this.updateImgGetUrl(data, imgId, width, height, success, error);
     
    }

    let getImgFail = err => { };

    this.selectImgGetData(width, height, getImgSuccess, getImgFail);
  }

  selectImgGetData(width, height, success, error) {
    let self = this;
    const options: CameraOptions = {
      allowEdit: true,
      quality: 75,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: width,
      targetHeight: height
    };

    this.camera.getPicture(options).then(imageData => {
      success(imageData);
     
      console.log('success');
    }, (err) => {
      error(err);
    });
  }

  updateImgGetUrl(imageData, imgId, width, height, success, error) {
    let self = this;

    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let contentType = 'image/jpg';
    let b64Data = imageData;

    let blob = this.b64toBlob(b64Data, contentType, width);

    let metadata = {
      contentType: 'image/jpg',
    };
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child('images/' + imgId + '.jpg').put(blob, metadata);;
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
    }, error, function () {
      // Handle successful uploads on complete
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log('upload image done', downloadURL);
      success(downloadURL);
       
       
    });
  }
}
