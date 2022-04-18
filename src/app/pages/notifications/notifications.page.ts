import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private appConstant:AppConstantService,private router:Router,private restApi:RestApiService) { }

  ngOnInit() {
    this.loadNotifications();
  }
  goBack(){
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      this.router.navigateByUrl('/users/tabs/home');
    }else{
      this.router.navigateByUrl('/admin/tabs/action');
    }
  }

  noti_list : any;
  loadNotifications(){
    let dataObject =this.appConstant.getNotiData()
    this.restApi.getNodeNotification(dataObject).then((success) => {  
      this.noti_list = success['data'];
      let oldServerCount = localStorage.getItem("currentSNCount")
      localStorage.setItem("oldCount", oldServerCount)
      localStorage.setItem("noti_count",'00')
    }, (error) => {
    });
  }

  openIssue(item){
     //this.router.navigate(['/inc-response', {id: inc_id,status:'',type:'noti'}]);
    // console.log(this.noti_list['permit_id'])
    // console.log(this.noti_list['incident_id'])
    if(item['permit_id']!=undefined && item['permit_id']!=null){

    }else if(item['incident_id']!=undefined && item['incident_id']!=null){
      this.router.navigate(['/inc-response', {id: item['incident_id'],status:'',type:'noti'}]);
    }
  }
}
