import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import { FileUploadService } from 'src/app/upload/file-upload.service';


@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.page.html',
  styleUrls: ['./upload-doc.page.scss'],
})
export class UploadDocPage implements OnInit {

 // Variable to store shortLink from api response
 shortLink: string = "";
 loading: boolean = false; // Flag variable
 file: File = null; // Variable to store file

 customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
 customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
 customPickerOptions: any;

 // Inject service 
 constructor(private fileUploadService: FileUploadService) { 
    this.customPickerOptions = {
        buttons: [{
          text: 'Save',
          handler: () => console.log('Clicked Save!')
        }, {
          text: 'Log',
          handler: () => {
            console.log('Clicked Log. Do not Dismiss.');
            return false;
          }
        }]
      }
 }

 shareOnMail(){
 
 }


 // On file Select
 onChange(event) {
     this.file = event.target.files[0];
 }

 // OnClick of button Upload
 onUpload() {
     this.loading = !this.loading;
     console.log(this.file);
     //(fileObject,permit_id,upload_tag)
     this.fileUploadService.uploadPTWImage(this.file,'91','medicalReports').subscribe(
         (event: any) => {
             if (typeof (event) === 'object') {
                 // Short link via api response
                 this.shortLink = event.link;
                 this.loading = false; // Flag variable 
             }
         }
     );
 }

  ngOnInit() {
  }

}
