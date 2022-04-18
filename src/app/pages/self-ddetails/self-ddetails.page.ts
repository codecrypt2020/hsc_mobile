import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-self-ddetails',
  templateUrl: './self-ddetails.page.html',
  styleUrls: ['./self-ddetails.page.scss'],
})
export class SelfDDetailsPage implements OnInit {

  checklist_id;
  userDetails : any;
  selectedStartDate = '';
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private restApi:RestApiService,private appConstant:AppConstantService) {
    let userD = this.activatedRoute.snapshot.paramMap.get('userData');
    this.selectedStartDate = this.activatedRoute.snapshot.paramMap.get('date');
    this.userDetails = JSON.parse(userD);
    this.getSDAnswer(this.userDetails['submitted_by'],this.activatedRoute.snapshot.paramMap.get('id'),this.activatedRoute.snapshot.paramMap.get('date'));
   }

  ngOnInit() {
  }

  result = true;
  title = '';
  msg = '';
  getSDAnswer(user_id,chk_id,date){
    let data={
      checklistId : chk_id,
      date: date,
      userId:user_id
    }
    this.restApi.getNodeCHKAns(data).then((success) => {
      let ansList = success['data']
      ansList.forEach(item => {
        if(item['selected_options']=="yes" || item['selected_options']=="Yes"){
          this.result = false;
        }
      });
      if(this.result){
        this.msg = 'User is Safe to enter in premises.'
        this.title = 'Safe to Enter'
      }else{
        this.msg = 'Entry Denied. Please don’t allow user, to enter in the premises.'
        this.title = 'Unsafe to Enter'
      }
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
    
  }

  goBack(){
    this.router.navigateByUrl('/admin/tabs/self-dreports');
   }

}
