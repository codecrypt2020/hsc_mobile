import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CustomModelPage } from '../custom-model/custom-model.page';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { ChecklistActionPage } from '../checklist-action/checklist-action.page';
import { FileUploadService } from 'src/app/upload/file-upload.service';

import {File, FileEntry} from '@ionic-native/file/ngx';
import { environment as ENV } from '../../../environments/environment'
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {
  description = '';
  answer = '';

  totalQuestion = 0
  questionIndex = 0
  checklist_id = '0'; 
  baseUrl = ENV.NODE_URL+'public/answer/'
  id:any;

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private appConstant:AppConstantService,private restApi:RestApiService,private actionSheetController:ActionSheetController,private camera:Camera,
    private modalController:ModalController,private updateData:UpdateDataStatusService,private fileUploadService:FileUploadService,private file:File,private domSanitizer:DomSanitizer,
    private platform:Platform,private photoViewer:PhotoViewer) { 
      
    this.checklist_id = this.activatedRoute.snapshot.paramMap.get('checklist_id');
    this.item = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    this.status = this.activatedRoute.snapshot.paramMap.get('status'); 
    this.id = JSON.parse( this.activatedRoute.snapshot.paramMap.get('id'));
      this.loadChecklistQuestion(this.checklist_id);
  }

  viewImage(imgUrl){
    this.photoViewer.show(this.baseUrl+imgUrl);
  }


  item;
  status;

  questionlist:any;
  ansList:[];
  is_show = false;
  is_q_present = false;
  loadChecklistQuestion(checklist_id){
      if(!this.appConstant.isInternet){
        return null;
    }else{
      let data ={
        checklistId: checklist_id,
      }
      this.restApi.getQuestionByID(data).then((success) => {
        if(success['success']==true){
          this.questionlist=success['data'];
        }else{
        }
        this.is_show = true
        if(this.questionlist.length>0){
          this.is_q_present = true;
        }else{ 
          this.is_q_present = false;
        }
        this.totalQuestion = this.questionlist.length-1
        this.loadAnswer();
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }

  loadAnswer(){
    let data ={
      checklistId: this.checklist_id,
    }
    this.restApi.getCHKAnsByList(data).then((success) => {
      this.ansList=[]
      if(success['success']==true){
        this.ansList=success['data'];
      }else{
      }
      this.getQuestionAnswer(this.questionlist[this.questionIndex]['id'])
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

  saved_Images = [];
  getQuestionAnswer(questionID){
    this.selected_old_answer='';
      this.answer = ''
      this.selected_answer = ''
      this.description = ''
      this.images = []
      this.selected_mages = [];
      this.saved_Images = [];
    if(this.ansList.length<=0){
        this.answer = ''
        this.selected_answer = ''
        this.description = ''
        this.images = []
        this.selected_mages = [];
        this.saved_Images = [];
    }else{
      this.answer = ''
      this.selected_answer = ''
      this.description = ''
      this.images = []
      this.selected_mages = [];
      this.saved_Images = [];

      this.ansList.forEach(item => {
        if(item['question_ref_id']==questionID){
          this.answer = item['input_answer']
          this.selected_answer = item['selected_options']
          this.selected_old_answer=item['selected_options']
          this.description = item['comments']
          if(item['images']!=''){
            let dataI = '';
            dataI = item['images']
            this.saved_Images = dataI.split(',')
          } 
        }
      });
    }
  }

  selected_answer='';
  selected_old_answer='';
   mcqAnswer(event){
    this.isAnswerSelected = false;
    this.selected_answer = event.detail.value;
  }

  selectedAnswer(ans){
    this.isAnswerSelected = false;
    this.selected_answer = ans;
  }

  saveLastUserAnswer(){
    if(this.questionlist[this.questionIndex]['question_type']=='1'){
      if(this.selected_answer.length<1){
        this.isAnswerSelected = true;
        return '';
      }
  }else if(this.questionlist[this.questionIndex]['question_type']=='2'){
      if(this.answer.length<1){
        this.appConstant.toastMsg('Please enter your answer.')
        return '';
      }
  }
    // if(this.description.length<1){
    //   this.isComment = true
    //   return '';
    // }else{
      
    // }
    this.presentModal('Submit Inspection','Are you sure, you want to submit the Inspection?');
  }

  onCommentChange(){
    // if(this.description.length<3){
    //   this.isComment = true;
    // }else{
    //   this.isComment = false;
    // }
  }

  images = [];
  selected_mages = [];
  isComment = false;
  isAnswerSelected = false;
  saveUserAnswer(){
    let timer = 0;
    if(!this.appConstant.isInternet){
      return null;
    }else{
        if(this.questionlist[this.questionIndex]['question_type']=='1'){
            if(this.selected_answer.length<1){
              this.isAnswerSelected = true;
              return '';
            }
        }else if(this.questionlist[this.questionIndex]['question_type']=='2'){
            if(this.answer.length<1){
              this.appConstant.toastMsg('Please enter your answer.')
              return '';
            }
        }
        if(this.selected_old_answer!=this.selected_answer || this.images.length>0){
            this.appConstant.showLoading('Submitting Answer');
            timer = 1000;
        }else{
          //this.appConstant.toastMsg('No changes in answers');
        }
        
        
        // if(this.description.length<1){
        //   this.isComment = true
        //   return '';
        // }

        if(this.questionlist[this.questionIndex]['accept_file']=='1'){
          // if(this.images.length<1){
          //   this.appConstant.toastMsg('Please select images')
          //   return '';
          // }
          //(this.saved_Images.length>0)?this.saved_Images:
            let data = {
              selected_options: this.selected_answer,
              input_answer: this.answer,
              images: '',
              comments: this.description,
              checklist_ref_id: this.checklist_id,
              question_ref_id: this.questionlist[this.questionIndex]['id']
            }

            let answeID = '';
            this.restApi.saveQuestionAnswer(data).then((success) => {
              if(success['success']==true){
                answeID = success['answerId'];
              }else{
              }
              if(this.images.length>0){
                this.images.forEach(imageValue => {
                  this.file.resolveLocalFilesystemUrl(imageValue).then((entry: FileEntry) =>{
                    entry.file(file => {
                      this.readFile(file,answeID);
                    });
                  });
                });
                setTimeout(()=>{ 
                  this.appConstant.dismissLoading()
                  this.loadAnswer();
                  this.nextQuestion();
                }, timer)
              }else{
                setTimeout(()=>{ 
                  this.appConstant.dismissLoading()
                  this.loadAnswer();
                  this.nextQuestion();
                }, timer)
              }
              localStorage.setItem("dataUpdate","1");
              this.updateData.dataChangeState.next(true);
            }, (error) => {
              this.appConstant.dismissLoading()
              this.appConstant.handleApiError(error)
            });
        }else{
            let data = {
              selected_options: this.selected_answer,
              input_answer: this.answer,
              images: '',
              comments: this.description,
              checklist_ref_id: this.checklist_id,
              question_ref_id: this.questionlist[this.questionIndex]['id']
            }
            this.restApi.saveQuestionAnswer(data).then((success) => {
              if(success['success']==true){
                setTimeout(()=>{ 
                  this.appConstant.dismissLoading()
                  this.loadAnswer();
                  this.nextQuestion();
                }, timer)
              }else{
              }
              localStorage.setItem("dataUpdate","1");
              this.updateData.dataChangeState.next(true);
            }, (error) => {
              this.appConstant.handleApiError(error)
            });
        }
  }
}

isShowDescription(des){
  if(des.length>0){
    return true;
  }else{
    return false;
  }
}

  getListLength(){
    let isListSHow = false;
    try{
      if(this.questionlist.length==0){
        isListSHow = false
      }else{
        isListSHow =  true
      }
    }catch(e){
      isListSHow =  false
    }
    return isListSHow;
  }

  ngOnInit() {
  }

  preQuestion(){
    this.isAnswerSelected = false;
    this.isComment = false;
    if(this.questionIndex==0){
      
     }
     if(1>this.questionIndex){
  
     }else{
       this.questionIndex--;
     }
     this.getQuestionAnswer( this.questionlist[ this.questionIndex]['id'])
   }

  nextQuestion(){
    this.isAnswerSelected = false;
    this.isComment = false;
    if(this.totalQuestion==this.questionIndex){
    }else{
      this.questionIndex++;
    } 
    this.getQuestionAnswer(this.questionlist[ this.questionIndex]['id'])
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
          this.base64Image = res;
          this.selected_mages.push(this.base64Image)
        });
      }else{
        this.base64Image = (<any>window).Ionic.WebView.convertFileSrc(imageDataURI);;
        this.selected_mages.push(this.base64Image)
      }
      this.images.push(imageDataURI)  
    }, (err) => {
      // Handle error
    });
  }

  getImagFile(image){
    this.file.resolveLocalFilesystemUrl(image).then((entry: FileEntry) =>{
      entry.file(file => {
        const reader = new FileReader();
        reader.onload = () => {
        const imgBlob = new Blob([reader.result], { type: file.type});
          return imgBlob;
    };
    reader.readAsArrayBuffer(file);
      });
    });
  }

  readFile(file: any,answeID) {
    const reader = new FileReader();
    reader.onload = () => {
        const imgBlob = new Blob([reader.result], { type: file.type});
        this.fileUploadService.uploadImage(imgBlob,answeID).subscribe((event: any) => {
          // this.loadAnswer();
          // this.nextQuestion();
        });
    };
    reader.readAsArrayBuffer(file);
  }


  async presentModal(title,msg) {
    const modal = await this.modalController.create({
      component: CustomModelPage,
      cssClass: 'modal-custom-css',
      componentProps: {
        'pop_up_type': 'ch_list_submit',
        'title':title,
        'msg':msg,
        'redirect': '/admin/tabs/inspections',
        'result':''
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.saveUserAnswer();
        this.appConstant.toastMsg('Checklist submitted successfully')
        this.goBack();
        });
    return await modal.present();
  }


  goBack(){
    this.router.navigate(['/checklist-action', {
      'checklist_id': this.checklist_id,
      'item': JSON.stringify(this.item),
      'status': this.status,
      'id':this.id
    }]);
   }
}
