import { Component } from '@angular/core';
import { ViewController, NavParams,NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import {Product} from '../../models/product';
import { ProductsService } from '../../providers/products/products';
import { PhotoViewer } from '@ionic-native/photo-viewer';
/**
 * Generated class for the QuantityComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'product-crud',
  templateUrl: 'product-crud.html'
})
export class ProductCrudComponent {

  products: FirebaseObjectObservable<any>;
   product={images: [], name:''};

  page:string;
  id:any;
  private quantity = 0;
     constructor(public navCtrl: NavController,private photoViewer: PhotoViewer, public params: NavParams, private camera : Camera, public af: AngularFireDatabase,  public productService: ProductsService,  public viewCtrl: ViewController, public translateService: TranslateService) {

   this.page = params.get('page');
   this.id = params.get('id');
      console.log(this.id)

  }
   ngOnInit() {
     if(this.page == 'edit'){
           
         //  this.af.object('/item'+this.id, { preserveSnapshot: true }).map(this.product);
     
     }
   }

 addItem() {
    this.productService.addProduct(this.product);
     this.viewCtrl.dismiss();
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
      let imageid = this.product.name + this.product.images.length.toString(); 
    let getImgSuccess = data => {
       let success = data => {
         var image = {url: '', id:''};
         image.url = data;
         image.id = imageid;

        this.product.images.push(image);
    console.log(this.product);
      }
      this.updateImgGetUrl(data, imageid, width, height, success, error);
     
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

  edit(){
    console.log(this.product)
    this.productService.editProduct(this.id, this.product);
     this.viewCtrl.dismiss();
  }
viewImage(image){
this.photoViewer.show(image);
}
deleteImage(image){
   var index = this.product.images.indexOf(image);
        this.product.images.splice(index, 1);
         let storageRef = firebase.storage().ref();
        var desertRef = storageRef.child('images/' + image.id + '.jpg');

// Delete the file
desertRef.delete().then(function() {
  console.log('File deleted successfully');
}).catch(function(error) {
  console.log(error);
});
}

    close() {
          this.viewCtrl.dismiss();
        }

}
