import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';

@Component({
  selector: 'app-self-dhome',
  templateUrl: './self-dhome.page.html',
  styleUrls: ['./self-dhome.page.scss'],
})
export class SelfDHomePage implements OnInit {

  constructor(private changeRef: ChangeDetectorRef,private router:Router,private appConstant:AppConstantService,private restApi:RestApiService,private updateData:UpdateDataStatusService) {
    this.updateData.dataChangeState.subscribe(state => {
      if (state) {
          this.loadCheckList();
          //this.getSDAnswer();
          this.changeRef.detectChanges(); 
          localStorage.setItem("dataUpdate","0");
          this.updateData.dataChangeState.next(false);
      } else {
      }
    });
  }

  checklist_id=0;
  checklist =[];
  title = '';
  msg = '';
  result = true;
  is_submitted = false;

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.loadCheckList();
  }

  getSDAnswer(){
    const today =  new Date();
    const datePipe = new DatePipe("en-US");
    let current_date = datePipe.transform(today, 'YYYY-MM-d');
    let data={
      checklistId : this.checklist_id,
      date: current_date,
      userId:localStorage.getItem(this.appConstant.TAG_IS_USER_ID)
    }
    this.restApi.getNodeCHKAns(data).then((success) => {
      let ansList = success['data']
      if(ansList.length>0){
        this.is_submitted = true;
      }else{
        this.is_submitted = false;
      }
      ansList.forEach(item => {
        if(item['selected_options']=="yes" || item['selected_options']=="Yes"){
          this.result = false;
        }
      });
      if(this.result){
        this.msg = 'Entry Granted. You are Safe to enter in premises.'
        this.title = 'Safe to Enter'
      }else{
        this.msg = 'Entry Denied. You are not allowed to enter in the premises.'
        this.title = 'Unsafe to Enter'
      }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
    
  }

  // getSelfDResult(){
  //   const today =  new Date();
  //   const datePipe = new DatePipe("en-US");
  //   let current_date = datePipe.transform(today, 'd-MM-yyyy');
  //   let lastSubmittedDate = localStorage.getItem('self_d_date');
  //   if(current_date==lastSubmittedDate){
  //     let answerList = JSON.parse(localStorage.getItem('self_d'));
  //     answerList.forEach(answer => {
  //       if(answer['ans']=="Yes"){
  //         this.result = 'No';
  //       }
  //     });
  //     if(this.result=="Yes"){
  //       this.msg = 'Self Declaration already submitted.'
  //       this.title = 'Safe to Enter'
  //     }else{
  //       this.msg = 'Self Declaration already submitted.'
  //       this.title = 'Unsafe to Enter'
  //     }
  //     this.is_submitted = true;
  //   }else{
  //     this.is_submitted = false;
  //   }
  // }

  openSDForm(){
    if(this.is_submitted){
      this.appConstant.toastMsg('Self Declaration already submitted.')
    }else{
      this.router.navigate(['/self-d', {id: this.checklist_id}]);
    }
  }

  loadCheckList(){   
    if(!this.appConstant.isInternet){
        return null;
    }else{
      let data ={
        page: 0,
        searchText: "",
        sortby:""
      }
      this.restApi.getCheckList(data).then((success) => {
        if(success['success']==true){
          this.checklist=success['data'];
        }else{
        }
        this.checklist.forEach(item => {
          if(item['identifier']=='SD'){
            this.checklist_id =item['id']
          }
        });
        this.getSDAnswer();
      }, (error) => {
        this.appConstant.handleApiError(error)
      });
    }
  }
}
