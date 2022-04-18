import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstantService } from '../services/app-constant.service';
import { environment as ENV } from '../../environments/environment'
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

   baseApiUrl = ENV.NODE_URL+ this.appConstatnt.API_ANSWER_IMAGE
   basePTWApiUrl = ENV.NODE_URL+ this.appConstatnt.API_N_PTW_UPLOAD_IMAGE
   basePTW_S_IMG_ApiUrl = ENV.NODE_URL+ this.appConstatnt.API_N_PTW_UPLOAD_S_IMAGE
   constructor(private http:HttpClient,private appConstatnt:AppConstantService) { }
   
   // Returns an observable
   uploadImage(fileObject,answerID):Observable<any> {
       const formData = new FormData(); 
      formData.append("image", fileObject);
      formData.append('answerId', answerID);
      return this.http.post(this.baseApiUrl, formData)
   }


//   permitId: 36
// filetype: 1
// type: Tools
// image: (binary)
   uploadPTWImage(images,permit_id,upload_tag):Observable<any> {
      console.log(images);
      console.log(permit_id);
      console.log(upload_tag);
      console.log(this.basePTWApiUrl);
      const formData = new FormData(); 
      images.forEach(item => {
         formData.append("image", item);
      });
     formData.append('permitId', permit_id);
     formData.append('filetype', '1');
     formData.append('type', upload_tag);
     return this.http.post(this.basePTWApiUrl, formData)
  }

  uploadPTW_S_Image(fileObject,permit_id,upload_tag):Observable<any> {
     console.log('upload_tag : '+upload_tag)
      const formData = new FormData(); 
      formData.append("image", fileObject);
      formData.append('permitId', permit_id);
      formData.append('filetype', '1');
      formData.append('type', upload_tag);
   return this.http.post(this.basePTW_S_IMG_ApiUrl, formData)
}

   uploadImagesCL_api(id,file_type,images,type):Observable<any> {
      const formData = new FormData(); 
     formData.append("id", id);
     formData.append('file_type', file_type);
     images.forEach(item => {
         formData.append("image", item);
      });
     formData.append('type', type);
     return this.http.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_CL_IMAGE, formData)
  }

  uploadImagesPL_api(id,file_type,images,type):Observable<any> {
      const formData = new FormData(); 
      formData.append("id", id);
      formData.append('file_type', file_type);
      images.forEach(item => {
         formData.append("image", item);
      });
      formData.append('type', type);
   return this.http.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_IP_IMAGE, formData)
}

uploadIncidentImages(id,images):Observable<any> {
   const formData = new FormData(); 
   formData.append("id", id);
   formData.append('filetype', '1');
   images.forEach(item => {
      formData.append("image", item);
   });
return this.http.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_IMAGE, formData)
}

uploadProfileImage(images,empId):Observable<any> {
   const formData = new FormData(); 
  formData.append("id", empId);
  formData.append('file_type', '1');
  formData.append("image", images);
  return this.http.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_USER_IMAGE, formData)
}

}
