import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-issue-list-by-filter',
  templateUrl: './issue-list-by-filter.page.html',
  styleUrls: ['./issue-list-by-filter.page.scss'],
})
export class IssueListByFilterPage implements OnInit {

  filter_type = '';
  is_list = false;
  constructor(private activatedRoute:ActivatedRoute,private appConstant:AppConstantService,private router:Router,
    private changeRef:ChangeDetectorRef,private restApi:RestApiService) {
    this.filter_type = this.activatedRoute.snapshot.paramMap.get('type'); 
    this.getAllIncidentByFilter()
   }

  ngOnInit() {
  }

  goBack(){
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      this.router.navigateByUrl('/users/tabs/home');
    }else{
      this.router.navigateByUrl('/admin/tabs/action');
    } 
  }

  
  getFormatedDate(date){
    let date2 =  date.replace(' ','T');
    const datePipe = new DatePipe("en-US");
    const final_date = datePipe.transform(date2, 'dd.MM.YYYY');
    let ShowTime = '';
    let final_time = date2.split('T')[1]; 
    let finalTime = final_time.substring(0,final_time.length-1);
    let dTime = finalTime.split(':')[0];
    if(dTime>=12){
      if(dTime==12){
        ShowTime = '12'+":"+finalTime.split(':')[1]+" PM"
      }else{
        let fTime = dTime-12;
        ShowTime = fTime+":"+finalTime.split(':')[1]+" PM"
      }
     
    }else{
      ShowTime = finalTime.split(':')[0]+":"+finalTime.split(':')[1]+" AM"
    }
    return final_date + ' | ' +ShowTime;
  }

  ionViewDidEnter(){
   }

   addIncident(){
      this.router.navigateByUrl('/incident-details');
   }

  //  getAreaByID(area_id){
  //    return this.appConstant.getAreaNameById(area_id)['name']
  //  }

   openInc_res(inc_id,status, index){
      this.router.navigate(['/inc-response', {id: inc_id,status:status,type:this.filter_type}]);
  }

   incidentList =[];
   isEnd = false;
   getAllIncidentByFilter() { 
     let data= {
      area: "",
      category: "",
      date: "",
      emp: "",
      limit: 0,
      page: this.currentPage,
      plant: "",
      searchText: "",
      severity:"", 
      sortby: "id",
      sorttype: "desc",
      status: "",
      whereData: [
        (this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='org admin')?{field: "`incident_details`.`organization_ref_id`", value: 3, type: "AND", nested: ""}:{field: "`incident_details`.`plant_ref_id`", value: this.appConstant.getPlantId(), type: "AND", nested: ""},
        {field: "`incident_details`.`severity`", value:  this.filter_type, type: "AND", nested: ""}
      ]
     }
     this.restApi.getIssueListByFilter(data).then((success) => {
       let newList = [];
       newList = success['data']
       if(newList.length<1){
        this.isEnd = true
       }else{
        newList.forEach(item => {
         this.incidentList.push(item)
       });
      
       }
       
      this.is_list = true;
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

  currentPage = 1
  doInfinite(event){
    this.currentPage++;
    this.getAllIncidentByFilter()
    event.target.complete();
  }


  getDays(incident){
    let currentdate = incident['updated_at'];
    const today1 =  new Date();
    var date1 = new Date(today1); 
	  var date2 = new Date(currentdate); 
  
    var Time = date1.getTime() - date2.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    if(isNaN(Days)){
      return 0
    }else{
      return Math.floor(Days);
    }
  }

}
