import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ConnectionStatusService } from '../connection/connection-status.service';

@Injectable({
  providedIn: 'root'
})
export class AppConstantService {
  loading;
  isLoading: boolean = false;
  isInternet: boolean = true;
  constructor(public loadingController: LoadingController,private toastController:ToastController,private connectionService:ConnectionStatusService) { }

  getNetStatus(){
    return this.connectionService.isConnectionAvailable();
  }

  //APP_VERSION: string = '1.2.0';
  APP_VERSION: string = '1.0.5';

  APP_ANDROID_BUILD = "18";
  APP_IOS_BUILD = "11";

  TAG_IS_USER_LOGIN: string = 'is_login';
  TAG_API_ACCESS_TOKEN: string = 'access_token';
  TAG_API_ACCESS_TOKEN_TYPE: string = 'token_type';
  TAG_USER_DETAILS: string = 'user_details';
  // TAG_MASTER_DETAILS: string = 'master_details';
  TAG_IS_USER_ID: string = 'user_id';
  TAG_IS_USER_ROLE: string = 'user_role';

  LOGIN_API: string = 'auth/login';
  INC_ADD_API: string = 'incident/create';
  INC_LIST_API: string = 'incident/list';
  INC_LIST_BY_PLANT_API: string = 'incident/list/by_plant';
  

  AREA_LIST_API: string = 'area/list';
  API_AREA_LIST_PLANT: string = 'area/list_by_plant';
  API_CAT_LIST_ORG: string = 'cat/get_cat_list_by_org';
  
  API_MASTER_DETAILS: string = 'details/master_details';
  API_INC_IMG = 'image/upload_inc';
  API_PRO_IMG = 'image/upload_profile';
  API_USER_PROFILE = 'user/update';
  API_USER_DETAILS = 'user/details';
  API_USER_ALL_DETAILS = 'user/all_details';
  API_SEND_OTP = 'user/send_otp';
  API_UPDATE_PASSWORD = 'user/update_password';
  API_DASHBOARD = 'dashboard';
  API_ORG_LIST = 'org_list_by_user';
  API_PLANT_LIST = 'plant_list_by_org';
  API_INC_RESPONSE = 'incident/details';
  API_INC_SYNC = 'incident/sync_incident';

  API_NOTI_COUNT = 'notification/count';
  API_NOTI_LIST = 'notification/list';

  API_CHK_FORCE_UPDATE="checkforceupdate"

  // Node URL API LIST
  API_ADD_PLAYER_ID = 'emp/register/player';
  API_N_CHECK_CAT = 'checklist/category/list';
  API_N_CHECK_LIST = 'checklist/list';
  //Changing the api end -- old one 
  API_N_CHK_S_ANS_LIST = 'checklist/answer/assignedchecklist';
  //New api end for fetch answer
  API_TEST_NEW_END = "checklist/users/answer"

  API_N_CHK_ANS_LIST = 'checklist/question/listbyid';
  API_N_SAVE_ANSWER = 'checklist/answer/save';
  API_CHK_ANSWER = 'checklist/answer/status';
  API_ANSWER_IMAGE = 'users/answer/image';
  API_CHK_ANSWER_R = 'checklist/users/answer';
  API_N_SD_USERS = 'checklist/users/view';
  API_N_SD_SCORE = 'checklist/score';

  //Dashboard 
  API_N_LAST_DAYS = 'incident/incident-dashboard-dayuser';
  API_N_STATS_BY_AREA = 'incident/incident-dashboard-group-app'; //'incident/incident-dashboard-group'//
  API_N_INC_DASHBOARD = 'incident/incident-dashboard-app';

  API_N_UAUC_DASHBOARD = 'incident/incident-dashboard';
  
  API_N_USER_ACCESS = 'org/limit/details';
  API_N_CHECKLIST_ANS = 'checklist/answer/multiple';
  API_N_NOTI_COUNT = 'notification/countlist';
  API_N_NOTIFICATION = 'notification/list';
  //Stats update
  API_N_UPDATE_STATUS = 'incident/progress';
  API_N_CLOSE_STATUS = 'incident/close';
  API_N_EMP_LIST = 'emp/list';

  API_N_EDIT_AP = 'incident/edit-action';
  API_N_CHK_UCHK_VALUE = 'incident/view/actionsave';
  
  
  API_N_INC_IMAGE="users/incident-issue-image"

  API_N_INC_IP_IMAGE="users/incidentImage"

  API_N_INC_CL_IMAGE="users/incident-progress-image"
  API_N_INC_USER_IMAGE="users/profile-image"


  //Checklist Dashboard api key
  API_N_CHK_CAT_LIST="checklist/category/homelist"

  API_N_CHK_P_LIST="checklist/category/checklist"

  API_N_CHK_SCORE="checklist/details/score"
  API_N_CHK_LIST="checklist/last/records"
  API_N_CHK_DETAIL_LIST="checklist/details/list"
  API_N_CHK_AREA_CHART="checklist/home/areachart"
  API_N_CHK_PROGRESS="checklist/progress"

  API_N_CHK_ASSIGNED_LIST_CAT="checklist/category/assigned"

  API_N_CHK_Q_ANS="checklist/answer/single"
  API_N_CHK_ASSIGNED_LIST="checklist/assignlist"

  //PTW
  API_N_PTW_CATEGORY ="permit/category/list"
  API_N_PTW_LIST ="permit/list"
  API_N_PTW_DETAILS ="permit/permitDetails"
  API_N_ORG_SHIFTS ="org/shiftList"

  API_N_PTW_Q_LIST ="permit/question/listbycatid"

  API_N_PTW_Q_SAVE ="permit/question/response/save"
  API_N_PTW_SAVE ="permit/save"
  API_N_PTW_Q_ANS ="permit/question/response/details"

  API_N_PTW_UPLOAD_IMAGE ="users/documenImage/image"
  API_N_PTW_UPLOAD_S_IMAGE ="users/signature/image"
  
  API_N_PTW_COMMENT_SAVE ='permit/below/save'
  
  API_N_ISSUE_LIST ="incident/list"

  API_N_STATUS_CHANGE ="permit/close"
  API_N_PTW_STATS ="permit/reqID"
  API_N_PTW_DASHBOARD ="permit/permit-dashboard"
  API_N_PTW_CAT_BOARD ="permit/permit-Catdashboard"

  API_N_PTW_T_OPEN ="permit/reqOpenID"
  API_N_PTW_V_COUNT ="permit/permitVerifierCount"

  API_N_SAVE_INC ="incident/save"
  API_N_INC_DETAILS ="incident/view/details"
  API_N_INC_IMAGES ="incident/images"

  API_N_CAT_LIST ="incident/cat/list"
  API_N_CAT_LIST_ORG ="org/org-categories"

  API_N_FORCE_UPDATE ="emp/version_check"

  API_N_PLANT_LIST = 'plant/list'

  API_N_AREA_LIST = 'plant/details'

  
  API_N_EMP_PROFILE = 'emp/user-details' 
  API_N_EMP_UPDATE = 'emp/profile/save'
  API_N_EMP_UPDATE_PWD = 'emp/profile/password'

  API_N_EMP_IMAGE = "emp/profile"

  API_N_ORG_LIST = 'org/list'

  API_N_ALL_AREA_LIST = 'area/list'

  API_N_USER_LOGIN = 'users/login'

  API_N_PTW_PRI = 'permit/previousPermitDetails'

  API_N_LOGOUT = "emp/logout"


  
  getRequestHeader() {
    let headerObject = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': "application/json",
      'Authorization': (localStorage.getItem(this.TAG_API_ACCESS_TOKEN) == null) ? ' ' : localStorage.getItem(this.TAG_API_ACCESS_TOKEN_TYPE) + ' ' + localStorage.getItem(this.TAG_API_ACCESS_TOKEN)
    };
    return headerObject;
  }

  getNodeRequestHeader() {
    let headerObject = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': "application/json",
      "x-access-token":this.getNodeToken(),
      "x-access-type": this.getXAccessType(),
     };
    return headerObject;
  }

  getXAccessType(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='user'){
      return 'user';
    }else if(user_role=='plant admin'){
      return 'plantadmin';
    } else if(user_role=='plant super admin'){
      return 'plantsadmin';
    }else{
      return  'orgadmin'
    }
  }
  

  getNotiData(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='user'){
      return { 
        id : localStorage.getItem(this.TAG_IS_USER_ID),
        type: 'user'
      };
    }else if(user_role=='plant admin'){
      return { 
        id : this.getPlantId(),
        type: 'plantadmin'
      };
    } else if(user_role=='plant super admin'){
      return { 
        id : this.getPlantId(),
        type: 'plantsadmin'
      };
    }else{
      return { 
        id : this.getORGId(),
        type: 'orgadmin'
      };
    }
  }

  getUserType(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='user'){
      return 'user'
    }else if(user_role=='plant admin'){
      return 'plantadmin'
    } else if(user_role=='plant super admin'){
      return 'plantsadmin'
    }else{
      return 'orgadmin'
    }
  }

  isPlnatAdmin(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='plant admin'){
      return true;
    }else{
      return false;
    }
  }

  isPlnatSuperAdmin(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='plant super admin'){
      return true;
    }else{
      return false;
    }
  }

  isORGAdmin(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='org admin'){
      return true;
    }else{
      return false;
    }
  }

  isUser(){
    let user_role = this.getRoleById(localStorage.getItem(this.TAG_IS_USER_ROLE));
    if(user_role=='user'){
      return true;
    }else{
      return false;
    }
  }

  getCurrentCount(serverCount){
    let localOldCount =  localStorage.getItem("oldCount")
    if(localOldCount == null || localOldCount == undefined){
        localStorage.setItem("oldCount", "0")
        localOldCount = localStorage.getItem("oldCount")
    }
    localStorage.setItem("currentSNCount", serverCount)
    let finalCount = serverCount - Number(localOldCount)
    if(finalCount>99){
      localStorage.setItem("noti_count", '99');
    }else if(finalCount>10 && finalCount<99){
      localStorage.setItem("noti_count", String(finalCount));
    }else if(finalCount<10 && finalCount>0){
      localStorage.setItem("noti_count", '0'+finalCount);
    }else{
      localStorage.setItem("noti_count", '00');
    }
  }

  getRequestToken() {
    return (localStorage.getItem(this.TAG_API_ACCESS_TOKEN) == null) ? ' ' : localStorage.getItem(this.TAG_API_ACCESS_TOKEN_TYPE) + ' ' + localStorage.getItem(this.TAG_API_ACCESS_TOKEN);
  }

  async showLoading(strMsg) {
    if (!this.loading) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: strMsg,
        duration: 500,
        translucent: true,
        cssClass: 'custom-class custom-loading',
        backdropDismiss: true
      });
      await loading.present();

    }
  }

  dismissLoading() {
    if (this.loading) {
      this.isLoading = false;
      this.loading.dismiss();
      this.loading = null;
    }
  }


  async toastMsg(strMsg) {
    let toast = await this.toastController.create({
      message: strMsg,
      duration: 1000,
      position: 'bottom',
    });
    toast.present();
  }

  createUID(sLength) {
    let result   = '';
    let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < sLength; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


  createUniqueId() {
    let startString = 'INC';
    let result   = '';
    let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return startString+'-'+result;
 }

 getORGId(){
   let user = JSON.parse(localStorage.getItem(this.TAG_USER_DETAILS));
   return user['organization_ref_id'];
 }

 getPlantId(){
  let user = JSON.parse(localStorage.getItem(this.TAG_USER_DETAILS));
  return user['plant_ref_id'];
}

 getNodeToken(){
  return localStorage.getItem(this.TAG_API_ACCESS_TOKEN);
}



//  getAreaNameById(area_id){
//   let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
//   let areaList = master_details['area'];
//   let area;// = 'No area selected';
//   areaList.forEach(value => {
//     if(value['id']==area_id){
//       area = value;
//     }
//   });
//   return area;
//  }

//  getDegignationNameById(id){
//   let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
//   let areaList = master_details['designation'];
//   let designation;
//   areaList.forEach(value => {
//     if(value['id']==id){
//       designation = value;
//     }
//   });
//   return designation;
//  }

//  getORGNameById(id){
//   let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
//   let areaList = master_details['organization'];
//   let area;
//   areaList.forEach(value => {
//     if(value['id']==id){
//       area = value;
//     }
//   });
//   return area;
//  }

//  getCategoryById(id){
//   let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
//   let catList = master_details['incident_category'];
//   let incident_category;
//   catList.forEach(value => {
//     if(value['id']==id){
//       incident_category = value;
//     }
//   });
//   return incident_category['inc_cat_name'];
//  }

//  getCategoryList(){
//   let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
//   let catList = master_details['incident_category'];
//   return catList;

//  }

 getRoleById(id){
  // let master_details = JSON.parse(localStorage.getItem(this.TAG_MASTER_DETAILS));
  // let roleList = master_details['emp_type'];
  // let role= 'user';
  //   roleList.forEach(childObj=> {
  //     if(childObj['id']==id){
  //       role = childObj['emp_type_name'];
  //     }
  // });

// 0: {id: 4, emp_type_name: "Plant Super Admin", created_at: "2021-09-02T07:24:57.000000Z",…}
// 1: {id: 3, emp_type_name: "Org Admin", created_at: "2021-05-13T10:22:55.000000Z",…}
// 2: {id: 2, emp_type_name: "Plant Admin", created_at: "2021-05-13T10:22:26.000000Z",…}
// 3: {id: 1, emp_type_name: "User", created_at: "2021-05-13T10:22:20.000000Z",…}
  if(id==1){
    return 'user';
  }else if(id==2){
    return 'plant admin';
  }else if(id==3){
    return 'org admin';
  }else if(id==4){
    return 'plant super admin';
  }else{
    return 'user';
  }
 }


 handleApiError(error) {
  if (error['status'] == 401) {
    //this.toastMsg(error.error['message']);
  } else if (error['status'] == 500) {
   // this.toastMsg(error.error['message']);
  }
}


getCurrentStatus(percentage){
  if(percentage == 100){
    return 'Completed';
  }else if(99 > percentage && percentage > 0){
    return 'In Progress';
  }else if(percentage == 0){
    return 'Pending';
  }else{
    return 'Pending';
  }
}

consoleLog(msg,title){
  console.log('--------------------- start of log : '+title+':----------------------')
  console.log(msg)
  console.log('--------------------- end of log : '+title+':----------------------')
}
}


