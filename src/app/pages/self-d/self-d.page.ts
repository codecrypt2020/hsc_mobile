import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CustomModelPage } from '../custom-model/custom-model.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-self-d',
  templateUrl: './self-d.page.html',
  styleUrls: ['./self-d.page.scss'],
})
export class SelfDPage implements OnInit {

  totalQuestion = 0
  questionIndex = 0
  checklist_id = '0'; 
  answerList=[];
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private appConstant:AppConstantService,private restApi:RestApiService,private actionSheetController:ActionSheetController,private camera:Camera,
    private modalController:ModalController,) { 
    this.checklist_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadChecklistQuestion(this.checklist_id);
  }

  questionlist:any;
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
        }, (error) => {
          this.appConstant.handleApiError(error)
        });
      }
  }

   mcqAnswer(event,id,index){
    let ans ={
      id : id,
      ans : event.detail.value
    }
    this.answerList[index] = ans;
  }

  saveUserAnswer(){
    if(!this.appConstant.isInternet){
      return null;
    }else{
      if(this.answerList.length==5){
        let result = 'Yes';
        this.answerList.forEach(answer => {
          if(answer['ans']=="Yes"){
            result = 'No';
          }
        });
        this.answerList.forEach(item => {
          let data = {
            selected_options: item['ans'],
            input_answer: '',
            images: '',
            comments: '',
            checklist_ref_id: this.checklist_id,
            question_ref_id: item['id']
          }
         
          this.restApi.saveQuestionAnswer(data).then((success) => {
            if(success['success']==true){
            }else{
            }
          }, (error) => {
            this.appConstant.handleApiError(error)
          });
        });
        const today =  new Date();
        const datePipe = new DatePipe("en-US");
        let current_date = datePipe.transform(today, 'd-MM-yyyy');
        localStorage.setItem('self_d',JSON.stringify(this.answerList));
        localStorage.setItem('self_d_date',current_date);
        if(result=="Yes"){
          this.presentModal('Safe to Enter','Self Declaration submitted successfully.',result);
        }else{
          this.presentModal('Unsafe to Enter','Self Declaration submitted successfully.',result);
        }
      }else{
        this.appConstant.toastMsg('Answer all question')
      }
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

  async presentModal(title,msg,result) {
    const modal = await this.modalController.create({
      component: CustomModelPage,
      cssClass: 'modal-custom-css',
      componentProps: {
        'pop_up_type': 'self_d',
        'title':title,
        'msg':msg,
        'redirect': '/users/tabs/self-d-home',
        'result':result
      }
    });
    return await modal.present();
  }

  goBack(){
    this.router.navigateByUrl('/users/tabs/self-d-home');
   }
}
