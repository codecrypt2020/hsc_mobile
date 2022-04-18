import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ThisReceiver } from '@angular/compiler';
import { ChecklistActionPage } from '../checklist-action/checklist-action.page';

@Component({
  selector: 'app-checklist-by-submitted',
  templateUrl: './checklist-by-submitted.page.html',
  styleUrls: ['./checklist-by-submitted.page.scss'],
})
export class ChecklistBySubmittedPage implements OnInit {

  checklistUPast =[]
  checklistUCurrent =[]
  userNotSubmitted = [];
  is_list = true;
  isSubmitted = '0';
  checklist_id;
  title = 'Inspection Submitted By'
  msg = 'Inspection not submitted by any user.'

   
  id:any
  isSubmittedU = false;
  item;
  status;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private restApi:RestApiService,private appConstant:AppConstantService,
    private modalCtrl:ModalController,private callNumber: CallNumber) {
   try{
    this.checklist_id = this.activatedRoute.snapshot.paramMap.get('checklist_id');
    this.item = JSON.parse(this.activatedRoute.snapshot.paramMap.get('item'));
    
    this.status = this.activatedRoute.snapshot.paramMap.get('status'); 
    this.isSubmitted = this.activatedRoute.snapshot.paramMap.get('is_submitted');
    this.id = JSON.parse( this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.isSubmitted=='0'){
      this.title = 'Inspection Submitted By'
      this.isSubmittedU = true;
    }else{
      this.title = 'Inspection Not Submitted By'
      this.msg = 'Users not available.'
      this.isSubmittedU = false;
    }
   }catch(e){
   }
    this.loadUsers();
   }

   ionViewWillEnter(){
    this.segmentModel = (localStorage.getItem('ins_tab')=='')?'u_current':localStorage.getItem('ins_tab');
  }


  segmentModel = (localStorage.getItem('ins_tab')=='')?'u_current':localStorage.getItem('ins_tab');
  segmentChanged(ev: any) {
    this.segmentModel = ev['detail']['value'];
    localStorage.setItem('ins_tab',this.segmentModel)
  }

  
   loadUsers(){
    if(!this.appConstant.isInternet){
      return null;
    }else{
      if(this.isSubmitted=='0'){
        let data = {
          checklistId : this.checklist_id,
          date: '',//this.maxDate
           whereData:[
            {"field":"`employee`.`organization_ref_id`","value":this.appConstant.getORGId(),"type":"AND","nested":""},
             {"field":"`employee`.`plant_ref_id`","value":this.appConstant.getPlantId(),"type":"AND","nested":""},
             {"field":"`employee`.`emp_type_ref_id`","value":"1","type":"AND","nested":"("},
             {"field":"`employee`.`emp_type_ref_id`","value":"2","type":"OR","nested":""},
             {"field":"`employee`.`emp_type_ref_id`","value":"3","type":"OR","nested":""},
             {"field":"`employee`.`emp_type_ref_id`","value":"4","type":"OR","nested":")"}
            ]
        }
        this.restApi.getSDReportedUser(data).then((success) => {
          this.checklistUCurrent = [];
          this.checklistUPast = [];
          if(success['success']==true){
            this.checklistUCurrent = success['data']
            this.checklistUPast = success['datapast']
            
          }else{
          }
        }, (error) => {
          this.appConstant.handleApiError(error)
        });
      }else{
        let data2 = {
          checklist_id : this.checklist_id,
        }

        this.restApi.getChkProgress(data2).then((success) => {
          this.userNotSubmitted = [];
          if(success['success']==true){
            this.userNotSubmitted =  success['data'];
          }else{
          }
        }, (error) => {
          this.appConstant.handleApiError(error)
        });
    }
   }
  }
  getMobile(mobile){
    let m = mobile.split('')
    let mobileN = '';
    for(let i=0;i<m.length;i++){
      if(i<6){
        mobileN+='*'
      }else{
        mobileN+=m[i]
      }
    }
    return mobileN
  }

  StartDilar(mobile){
    // this.callNumber.callNumber(mobile, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }

   geListLengthP(){
    let isListSHow = false;
    try{
      if(this.checklistUPast.length==0){
        isListSHow = false
        this.msg = 'Past Inspection not available.'
      }else{
        isListSHow =  true
      }
    }catch(e){
      isListSHow =  false
      this.msg = 'Past Inspection not available.'
    }
    return isListSHow;
  }

  geListLengthC(){
    let isListSHow = false;
    try{
      if(this.checklistUCurrent.length==0){
        isListSHow = false
        this.msg = 'Inspection not submitted by any user.'
      }else{
        isListSHow =  true
      }
    }catch(e){
      isListSHow =  false
      this.msg = 'Inspection not submitted by any user.'
    }
    return isListSHow;
  }

  openCheckListResult(name,user_id){
    if(this.isSubmitted=='0'){
      localStorage.setItem('ins_tab',this.segmentModel)
      this.router.navigate(['/checklist-view', {
        'checklist_id': this.checklist_id,
        'name':name,
        'is_submitted':this.isSubmitted,
        'user_id':user_id,
        'item': JSON.stringify(this.item),
        'id':this.id,
        'status': this.status}]);
    }
    
  }

  goBack(){
    localStorage.setItem('ins_tab','')
    this.router.navigate(['/checklist-action', {
      'checklist_id': this.checklist_id,
      'item': JSON.stringify(this.item),
      'id':this.id,
      'status': this.status
    }]);
   }


  ngOnInit() {
  }

}
