import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { SaveIssueResponsePage } from 'src/app/save-issue-response/save-issue-response.page';
import { StatusComponentComponent } from '../status-component/status-component.component';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { environment as ENV } from '../../../environments/environment'
import { DatePipe } from '@angular/common';
import { UpdateStatusIncService } from 'src/app/services/update-status-inc.service';
import { UpdateIncListService } from 'src/app/services/update-inc-list.service';

@Component({
  selector: 'app-inc-response',
  templateUrl: './inc-response.page.html',
  styleUrls: ['./inc-response.page.scss'],
})
export class IncResponsePage implements OnInit {

  //inc_R_details:any;
  inc_details:any;
  show_plant_admin=false;
  show_org_admin=false;
  status = 'open';
  is_details_loaded = false;
  inc_d_id = '';
  plant_admin_images=[];
  Org_admin_images=[];
  plant_admin_images_count = 0;
  Org_admin_images_count = 0;
  action_points=[];
  action_points_check=[];
  action_points_a_name=[];
  action_points_id = []
  inc_images:[];
  is_images=false;
  isAllowToEditPA = false;
  isAllowToEditOA = false;

  //baseUrl = ENV.IMG_BASE_URL +'storage/incident/';
  baseUrl = ENV.IMG_BASE_N_URL +'public/incident/storage/app/public/incident/'; 
  baseNodeUrl = ENV.IMG_BASE_N_URL +'public/images/incident/';
  type = ''
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private appConstant:AppConstantService,private restApi:RestApiService,
    public modalController: ModalController,private popoverController:PopoverController,private updateStatus: UpdateStatusIncService,
    private updateIncList: UpdateIncListService, private ref: ChangeDetectorRef,private photoViewer:PhotoViewer) { 
  }

  // getAreaName(a_id){
  //   let area = this.appConstant.getAreaNameById(a_id);
  //   return area['name'];
  // }

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

  doRefresh(event){
    setTimeout(() => {
      this.loadIncResponse(this.inc_d_id);
      event.target.complete();
    }, 2000);
  }

  emp_list = []
  loadEMPList(){
    let data= {
      "searchText": "",
      "sortby": "id",
      "sorttype": "desc",
      "page": 0,
      "whereData": [
        {
          "field": "`employee`.`plant_ref_id`",
          "value": this.appConstant.getPlantId(),
          "type": "AND",
          "nested": ""
        },
        {
          "field": "`employee`.`emp_type_ref_id`",
          "value": "0",
          "type": "AND",
          "nested": "("
        },
        {
          "field": "`employee`.`emp_type_ref_id`",
          "value": "2",
          "type": "OR",
          "nested": ")"
        }
      ]
    }
      this.restApi.getNodeEMPList(data).then((success) => {
          this.emp_list = success['data']

      }, (error) => {
        this.appConstant.handleApiError(error)
      });
  }

  // getEmpName(emp_id){
  //   this.emp_list.forEach(item => {
  //     if(item['userid']==emp_id){
  //       return item['emp_name'];
  //     }
  //   });
  // }

  // ionViewWillEnter(){
  //   if(this.inc_d_id!=null || this.inc_d_id!=undefined || this.inc_d_id!=''){
  //     this.loadIncResponse(this.inc_d_id,this.status);
  //   }
  // }

  // getOrganization(org_id){
  //   let des=this.appConstant.getORGNameById(org_id);
  //   return des['org_name'];
  // }

  //my-custom-class
  //my-custom-class
  currentPopover = null
  async showPopover(event) { 
    if(this.inc_details['severity']=='High'){
      if(this.isAllowToEditOA || this.isAllowToEditPA) {
        const popover = await this.popoverController.create({
          event,
          component: StatusComponentComponent,
          cssClass: 'my-custom-class', 
          mode : 'md',
          componentProps: {
            'inc_id':this.inc_d_id,
            'type':this.type,
            'status':this.status,
            'severity':this.inc_details['severity'],
            'rsponseDetails':this.inc_details,
            'is_s_plant_admin': (this.appConstant.isPlnatSuperAdmin() ? true : false),
          }
        });
        this.currentPopover = popover;
        return await popover.present();
      }
    }else{
      if(this.isAllowToEditPA) {
        const popover = await this.popoverController.create({
          event,
          component: StatusComponentComponent,
          cssClass: 'my-custom-class', 
          mode : 'md',
          componentProps: {
            'inc_id':this.inc_d_id,
            'status':this.status,
            'type':this.type,
            'severity':this.inc_details['severity'],
            'rsponseDetails':this.inc_details,
            'is_s_plant_admin': (this.appConstant.isPlnatSuperAdmin() ? true : false),
          }
        });
        this.currentPopover = popover;
        return await popover.present();
      }
    }
  }

   dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => { 
        this.appConstant.toastMsg('popup closed')
        this.currentPopover = null; 
      
      });
    }
  }

  viewImage(imgUrl){
    this.photoViewer.show(imgUrl);
  }

  orgAdminName = 'Pending'
  plantAdminName = 'Pending'
  loadPlantAdmin(plantAdminId){
    if(plantAdminId==null)
      return;
    let data= {
      user_id :  plantAdminId
     }
    this.restApi.loadUserDetails(data).then((success) => {
        this.plantAdminName = success['data'][0]['emp_name'];
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }


  loadOrgAdmin(ordAdminId){
    if(ordAdminId==null)
      return;
    let data= {
      user_id :  ordAdminId
     }
    this.restApi.loadUserDetails(data).then((success) => {
      this.orgAdminName = success['data'][0]['emp_name'];
    }, (error) => {
      this.appConstant.dismissLoading();
      this.appConstant.handleApiError(error)
    });
  }
  

  ngOnInit() {

    let inc_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.inc_d_id = inc_id;
   try{
    this.status = this.activatedRoute.snapshot.paramMap.get('status');
   }catch(e){
    this.status = ''
   }
    try{
      this.type = this.activatedRoute.snapshot.paramMap.get('type');
    }catch(e){
      this.type = ''
    }

    this.loadIncResponse(inc_id);
    if(this.status=='close'){
      this.status = 'Closed';
    }
    this.updateStatus.updateStatusState.subscribe(state => {
      console.log('Inc List state :'+state)
      console.log(' dataUpdateStatus : '+localStorage.getItem("dataUpdateStatus"))
      if (state) {
        setTimeout(()=>{ 
             this.loadIncResponse(this.inc_d_id);
        }, 3000)
        //localStorage.setItem("dataUpdateStatus","0");
        this.updateStatus.updateStatusState.next(false);
      } else {
      }
    });
  }

  isHideSpan = true;
  filterCriteriaCat = 'Organization';
  toggledFilterCat = false;
  toggleFilter(){
     if(this.toggledFilterCat){
       this.toggledFilterCat = false;
     }else{
       this.toggledFilterCat = true;
     }
  }

  //isListUpdate = false;
  goBack(){
    if(this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))=='user'){
      this.router.navigateByUrl('/users/tabs/home');
    }else{
      if(this.type=='list'){
       if(localStorage.getItem("dataUpdateStatus")=='1'){
          localStorage.setItem("dataUpdateStatus","0");
          localStorage.setItem("dataUpdateAdminInc","1");
          this.updateIncList.updateListState.next(true);
       }
        this.router.navigateByUrl('/admin/tabs/overview');
      }else if(this.type=='noti'){
        this.router.navigateByUrl('/notifications');
      }else{
        this.router.navigate(['issue-list-by-filter',{type:this.type}]);
      }
      
    } 
  }


  // getcategoryName(cat_id){
  //   return this.appConstant.getCategoryById(cat_id);
  // }

  getDays(currentdate){
    //let currentdate = incident['updated_at'];
    const today1 =  new Date();
    var date1 = new Date(today1); 
	  var date2 = new Date(currentdate); 
  
    var Time = date1.getTime() - date2.getTime(); 
    var Days = Time / (1000 * 3600 * 24);
    return Math.floor(Days);;
  }

  changeStatus(index,status,checkValue){
    if(this.status!='Closed'){
      if(this.isValidUser(index) && this.action_points_check[index]==checkValue){
        if(this.action_points_id[index] ==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
          this.action_points_check.splice(index,1,status)
          let data = this.action_points_check.join(',')+'~'+this.action_points.join(',')+'~'+this.action_points_id.join(',')
          if(this.status!='Closed'){
            this.changeActionPStatus(data);
          }
          
        }
      }
   }
  }

  isValidUser(index){
    if(this.action_points_id[index] ==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
      return true
    }else{
      return false
    }
  }


  changeActionPStatus(actionPoints){
    let data= {
      "action_points": actionPoints,
      "incId": this.inc_d_id,
    }
    this.restApi.changeActionStatus(data).then((success) => {
    }, (error) => {
      this.appConstant.handleApiError(error)
    });
  }

  loadIncResponse(inc_id){
    this.loadEMPList();
    let nodeParams = {
      incId: inc_id,
    };

  

    this.restApi.nodeGetIncDetails(nodeParams).then((success) => {
      // this.inc_details=[];
      // this.show_plant_admin=false;
      // this.show_org_admin=false;
      // this.status = 'open';
      // this.is_details_loaded = false;
      // this.plant_admin_images=[];
      // this.Org_admin_images=[];
      // this.plant_admin_images_count = 0;
      // this.Org_admin_images_count = 0;
      // this.action_points=[];
      // this.action_points_check=[];
      // this.action_points_a_name=[];
      // this.action_points_id = []
      // this.inc_images=[];
      // this.is_images=false;
      // this.isAllowToEditPA = false;
      // this.isAllowToEditOA = false;

       this.is_details_loaded = true;

      this.inc_details = success['data'][0];
      this.status = this.inc_details['status']

      try{
        this.loadPlantAdmin(this.inc_details['by_plant_admin']);
        this.loadOrgAdmin(this.inc_details['by_org_admin']);
      }catch(e){
      }
      if(this.status=='open'){
        this.show_plant_admin=false;
        this.show_org_admin=false;
      }else if(this.status=='review'){
        try{
          this.show_plant_admin=true;
          this.show_org_admin=false;
          let stringData = this.inc_details['images_by_plant_a'];
          this.plant_admin_images = stringData.split(",")
          this.plant_admin_images_count = this.plant_admin_images.length;
        }catch(e){}

      }else if(this.status=='in progress' || this.status=='close'){
        try{
          let a_p = this.inc_details['action_points'];
          if(a_p!=''){
            let action_p = a_p.split("~");
            this.action_points =  action_p[1].split(","); 
            this.action_points_check =  action_p[0].split(","); 
            this.action_points_id = []
            this.action_points_id =  action_p[2].split(","); 
            let id_index = 0;
         
              this.action_points.forEach(item => {
                this.action_points_a_name[id_index] = ''
                this.emp_list.forEach(item => {
                  if(item['id']==this.action_points_id[id_index]){
                    this.action_points_a_name[id_index]=item['emp_name']
                    this.ref.detectChanges();
                  }
                });  
                id_index++;
              });
           
            setTimeout(()=>{ 
              if(this.action_points_a_name.length<1){
                this.loadAPNAmes();
              }else{
                if(this.action_points_a_name[0]==''){
                  this.loadAPNAmes();
                }
              }
            }, 2000)
            this.ref.detectChanges();
          }
        }catch(e){
        }

       try{
          this.show_plant_admin=true;
          this.show_org_admin=true;
          try{
            let stringDataA = this.inc_details['images_by_plant_a'];
            if(stringDataA!=''){
              this.plant_admin_images = stringDataA.split(",")
            }
            this.plant_admin_images_count = this.plant_admin_images.length;
          }catch(e){}
          this.ref.detectChanges();
          try{          
            let stringData = this.inc_details['images_by_org_a'];
            if(stringData!=''){
              this.Org_admin_images = stringData.split(",")
            }
            this.Org_admin_images_count = this.Org_admin_images.length;
          }catch(e){}
          this.ref.detectChanges();
       }catch(e){
       }
       this.ref.detectChanges();
      }

      if(this.inc_details['severity']=='High'){
          if(this.status=='open'){
            this.isAllowToEditPA = this.appConstant.isPlnatSuperAdmin() ? true : false;
          }else if(this.status=='in progress'){
            this.isAllowToEditPA = this.appConstant.isPlnatSuperAdmin() ? true : false;
            this.isAllowToEditOA = this.appConstant.isPlnatSuperAdmin() ? true : false;
          }else if(this.status=='close'){
            this.isAllowToEditPA = false;
            this.isAllowToEditOA = false;
          }
      }else{
        if(this.status=='open'){
          this.isAllowToEditPA = this.appConstant.isPlnatAdmin() ? true : false;
          this.isAllowToEditOA = false;
        }else if(this.status=='in progress'){
          this.isAllowToEditPA = this.appConstant.isPlnatAdmin() ? true : false;
          this.isAllowToEditOA = this.appConstant.isPlnatAdmin() ? true : false;
        }else if(this.status=='close'){
          this.isAllowToEditPA = false;
          this.isAllowToEditOA = false;
        }
      }
      if(this.status=='close'){
        this.status = 'Closed';
      }
      this.ref.detectChanges();
    }, (error) => {
    });

    this.restApi.nodeGetIncImages(nodeParams).then((success) => {
        try{
          if(success['data'].length>0){
            this.is_images=true;
            this.inc_images = success['data'];
            this.ref.detectChanges();
          }else{
            this.is_images=false;
            this.inc_images = [];
          }
          this.ref.detectChanges();
        }catch(e){
        }
      }, (error) => {
    });

    setTimeout(()=>{ 
      this.restApi.nodeGetIncImages(nodeParams).then((success) => {
          try{
            if(success['data'].length>0){
              this.is_images=true;
              this.inc_images = success['data'];
              this.ref.detectChanges();
            }else{
              this.is_images=false;
              this.inc_images = [];
            }
            this.ref.detectChanges();
          }catch(e){
          }
        }, (error) => {
      });
    }, 1000)
  }

  loadAPNAmes(){
    try{
      let a_p = this.inc_details['action_points'];
      if(a_p!=''){
        let action_p = a_p.split("~");
        this.action_points =  action_p[1].split(","); 
        this.action_points_check =  action_p[0].split(","); 
        this.action_points_id = []
        this.action_points_id =  action_p[2].split(","); 
        let id_index = 0;
          this.action_points.forEach(item => {
            this.action_points_a_name[id_index] = ''
            this.emp_list.forEach(item => {
              if(item['id']==this.action_points_id[id_index]){
                this.action_points_a_name[id_index]=item['emp_name']
                this.ref.detectChanges();
              }
            });  
            id_index++;
          });
        }
    }catch(e){}
   
  }


  reserData(){
  this.inc_details=[];
  this.show_plant_admin=false;
  this.show_org_admin=false;
  this.status = 'open';
  this.is_details_loaded = false;
  this.plant_admin_images=[];
  this.Org_admin_images=[];
  this.plant_admin_images_count = 0;
  this.Org_admin_images_count = 0;
  this.action_points=[];
  this.action_points_check=[];
  this.action_points_a_name=[];
  this.action_points_id = []
  this.inc_images=[];
  this.is_images=false;
  this.isAllowToEditPA = false;
  this.isAllowToEditOA = false;
  }

}
