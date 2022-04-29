import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { AuthStatusService } from 'src/app/auth/auth-status.service';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { async } from 'rxjs';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { FileUploadService } from 'src/app/upload/file-upload.service';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { environment as ENV } from '../../../environments/environment'

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit{

  flag;
  profileImg;
  userDetails ;
  appVersion = '0.0.0'
  baseURL = ENV.NODE_URL+'public/profile-image/'
  imageURL = ''
  constructor(private authService:AuthStatusService,private appConstant:AppConstantService,private restApi:RestApiService,
    private actionSheetController:ActionSheetController,private camera:Camera,private router:Router,private oneSignal: OneSignal,
    private updateData:UpdateDataStatusService,private platform:Platform,private fileUploadService:FileUploadService,private file:File) {
  
      this.updateData.dataChangeState.subscribe(state => {
        if (state) {
          this.appVersion = this.appConstant.APP_VERSION
          this.loadUserProfile();
          localStorage.setItem("dataUpdateProfile","0");
          this.updateData.dataChangeState.next(false);
        } else {
        }
      });
  }
  ngOnInit(): void {
    this.appVersion = this.appConstant.APP_VERSION
    this.loadUserProfile();
  }

  logout(){
    this.logoutUser();
  }

  stopNotification() {
    this.oneSignal.startInit("f38a59f0-8ba3-4321-9da8-76798d4e338a", "625160820680");
    this.oneSignal.setSubscription(false);
    this.oneSignal.endInit();
  }

  // getDesiganation(){
  //   let des=this.appConstant.getDegignationNameById(this.userDetails['designation_ref_id']);
  //   return des['designation_name'];
  // }

  getOrganization(){
    //let des=this.appConstant.getORGNameById(this.userDetails['organization_ref_id']);
    return localStorage.getItem('org_name');
  }

  load_profile = false;
  loadUserProfile(){
    let data= {
      user_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
     }
    this.restApi.loadUserDetails(data).then((success) => {
      this.userDetails = success['data'][0];
      localStorage.setItem(this.appConstant.TAG_USER_DETAILS, JSON.stringify(this.userDetails));
      this.load_profile = true;
      this.loadUserProfilePic();
    }, (error) => {
      this.load_profile = false;
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }

  logoutUser(){
    this.restApi.logoutUser().then((success) => {
      this.stopNotification()
      localStorage.setItem(this.appConstant.TAG_USER_DETAILS, null);
      localStorage.setItem(this.appConstant.TAG_API_ACCESS_TOKEN, null);
      localStorage.setItem(this.appConstant.TAG_API_ACCESS_TOKEN_TYPE, null);
      localStorage.setItem(this.appConstant.TAG_IS_USER_LOGIN, null);
      localStorage.setItem(this.appConstant.TAG_IS_USER_ID, null);
      localStorage.setItem(this.appConstant.TAG_IS_USER_ROLE,null);
        window.location.reload()
    }, (error) => {
    });
  }


  loadUserProfilePic(){
    let data= {
      emp_id :  localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
     }
    this.restApi.getNodeImageAPI(data).then((success) => {
      this.appConstant.consoleLog(success,success['emp_profilepic'][0]['emp_profilepic'])
      this.imageURL
      if(success['emp_profilepic'][0]['emp_profilepic']!=null){
        this.profileImg = this.baseURL + success['emp_profilepic'][0]['emp_profilepic']
        console.log(this.profileImg);
      }
    }, (error) => {
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 20,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true, 
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.profileImg = 'data:image/jpeg;base64,' + imageData;
  //     this.uploadProfileImage();
  //   }, (err) => {
  //   });
  // }


  base64Image ='';
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 20,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true, 
    }
    this.camera.getPicture(options).then((imageDataURI) => {
      this.base64Image = '';
      if(this.platform.is('ios')){
        let filename = imageDataURI.substring(imageDataURI.lastIndexOf('/')+1);
        let path =  imageDataURI.substring(0,imageDataURI.lastIndexOf('/')+1);
          this.file.readAsDataURL(path, filename).then(res=>{
          this.base64Image= res;
          this.profileImg =this.base64Image
        });
      }else{
        this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
        this.profileImg= this.base64Image
      }

    // this.uploadImageData = imageDataURI
     this.file.resolveLocalFilesystemUrl(imageDataURI).then((entry: FileEntry) =>{
      entry.file(file => {
        const reader = new FileReader();
        reader.onload = () => {
             let imgBlob = new Blob([reader.result], { type: file.type})
             this.fileUploadService.uploadProfileImage(imgBlob, localStorage.getItem(this.appConstant.TAG_IS_USER_ID)).subscribe((event: any) => {
            });
        };
        reader.readAsArrayBuffer(file);
      });
    });


    }, (err) => {
    });
  }

  ionViewWillEnter(){
   console.log('reloading view')
  }

//   uploadProfileImage(){
//     let data={}
//     data['image'] = this.profileImg;
//     data['img_name'] = this.userDetails['emp_id'];
//       this.appConstant.showLoading('Uploading images');
//       this.restApi.uploadDocument(data,this.appConstant.API_PRO_IMG).then((success) => {
//       this.appConstant.dismissLoading();
//       this.appConstant.toastMsg('Profile uploaded sucdessfully');
//     }, (error) => {
//       this.appConstant.dismissLoading();
//       this.appConstant.handleApiError(error)
//     });
// }

}
