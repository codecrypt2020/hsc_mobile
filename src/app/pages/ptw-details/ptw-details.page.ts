import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { AppConstantService } from 'src/app/services/app-constant.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { FileUploadService } from 'src/app/upload/file-upload.service';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { PtwStatusComponent } from 'src/app/m_ptw/ptw-status/ptw-status.component';
import { environment as ENV } from '../../../environments/environment'
import { iif } from 'rxjs';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';


@Component({
  selector: 'app-ptw-details',
  templateUrl: './ptw-details.page.html',
  styleUrls: ['./ptw-details.page.scss'],
})
export class PtwDetailsPage implements OnInit{

  ptw_id;
  cat_id = '';
  cat_name = '';
  requester_id = ''
  safety_officer_comment = ''
  isSafetyOfficerApproved = false;

  co_signer_1_comment = ''
  isCoSigner1Approved = false;

  co_signer_2_comment = ''
  isCoSigner2Approved = false;

  baseNodeUrl = ENV.IMG_BASE_N_URL +'public/permit/documentImage/';
  baseSignUrl = ENV.IMG_BASE_N_URL +'public/permit/signature/';
  constructor(private restApi:RestApiService,private appConstant:AppConstantService,private activatedRoute:ActivatedRoute,private router:Router,private base64ToGallery: Base64ToGallery,
    private platform:Platform,private file:File,private fileUploadService:FileUploadService,private popoverController:PopoverController,
    private updateData:UpdateDataStatusService) {
  }

  currentTab = 1
  selectDetails(tabId){
    this.currentTab = tabId
  }

  currentPopover = null
  async showStatusIP(event){ 
    if(this.showCL_SUP){
    const popover = await this.popoverController.create({
      event,
      component: PtwStatusComponent,
      cssClass: 'my-custom-class', 
      mode : 'md',
      componentProps: {
        'ptw_id':this.ptw_id,
        'cat_id':this.cat_id,
        'cat_name':this.cat_name,
        'isOpen':false
      }
    });
    this.currentPopover = popover;
    return await popover.present();
  }
}

  async showStatusOpen(event){ 
    if(this.showCL_SUP){
    const popover = await this.popoverController.create({
      event,
      component: PtwStatusComponent,
      cssClass: 'my-custom-class', 
      mode : 'md',
      componentProps: {
        'ptw_id':this.ptw_id,
        'cat_id':this.cat_id,
        'cat_name':this.cat_name,
        'isOpen':true
      }
    });
    this.currentPopover = popover;
    return await popover.present();
  }
}



  viewImage(imgUrl){
   // this.photoViewer.show(imgUrl);
  }

  isAllowSuspend(){
    // console.log('requester ID : '+this.requester_id)
    // console.log('User ID : '+localStorage.getItem(this.appConstant.TAG_IS_USER_ID))
    if(Number(this.requester_id)==Number(localStorage.getItem(this.appConstant.TAG_IS_USER_ID))){
      return true
    }else{
      return false;
    }
  }

  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl : ElementRef;
  signatureImg: string;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    //console.log(event);
    this.signatureImg = ''
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }
  
  base64Image = ''
  savePad() {
    let uploadTag = '';
    if(this.isShowApproveBtn(this.ptwDetails['co_signer_1'])){
      uploadTag = 'coSignerOne'
    }else if((this.isShowApproveBtn(this.ptwDetails['co_signer_2']))){
      uploadTag = 'coSignerTwo'
    }else if((this.isShowApproveBtn(this.ptwDetails['safety_officer']))){
      uploadTag = 'safety'
    }
    this.checkFileBlob(uploadTag);
  }

  async checkFileBlob(uploadTag) {
    console.log('checkFileBlob : '+uploadTag)
    let file = this.signaturePad.toDataURL();
    await fetch(file).then(r => r.blob()).then(blobFile => {
      console.log('blobFile : '+uploadTag)
      this.fileUploadService.uploadPTW_S_Image(blobFile,this.ptw_id,uploadTag).subscribe((event: any) => {
      });
    })
  }

  convertBase64(imageData){
    //var imageData = $scope.image1.compressed.dataURL.toString();
    var byteCharacters = atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([ byteArray ], {
      type : undefined
    });
  }

  readFile(file: any,tag) {
    const reader = new FileReader();
    reader.onload = () => {
        const imgBlob = new Blob([reader.result], { type: file.type});
        this.fileUploadService.uploadPTW_S_Image(imgBlob,this.ptw_id,tag).subscribe((event: any) => {
        });
    };
    reader.readAsArrayBuffer(file);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  approveSO(event){
    if(this.isSafetyOfficerApproved = event['detail']['checked']){
      this.isSafetyOfficerApproved = true;
    }else{
      this.isSafetyOfficerApproved = false;
    }
  }

  approveCO1(event){
    if(this.isCoSigner1Approved = event['detail']['checked']){
      this.isCoSigner1Approved = true;
    }else{
      this.isCoSigner1Approved = false;
    }
  }

  approveCO2(event){
    if(this.isCoSigner2Approved = event['detail']['checked']){
      this.isCoSigner2Approved = true;
    }else{
      this.isCoSigner2Approved = false;
    }
  }

  goBack(){
    if(this.byUrl=='noti'){
      this.router.navigate(['notifications',{cat_id:this.cat_id,cat_name:this.cat_name}]);
    }else{
      this.router.navigate(['ptw-list',{cat_id:this.cat_id,cat_name:this.cat_name}]);
    }
  }

  imgUrl = ENV.NODE_URL + "public/permit/documentImage/";

  contractorTypeList = ['Internal','Register Vendor','Un-Register Vendor']
  getContractorType(){
    return 'Contractor Type : '+this.contractorTypeList[Number(this.ptwDetails['permit_contract_type'])-1]
  }

  getYesNo(result){
    if(result == 0 || result =='0' || result == null || result == undefined){
      return 'No'
    }else{
      return 'Yes'
    }
  }

  byUrl = ''
  ngOnInit() {
    this.ptw_id = this.activatedRoute.snapshot.paramMap.get('ptw_id');
    try{
      this.cat_id = this.activatedRoute.snapshot.paramMap.get('cat_id');
    }catch(e){
      this.cat_id = ''
    }
    try{
      this.cat_name = this.activatedRoute.snapshot.paramMap.get('cat_name');
    }catch(e){
      this.cat_name = ''
    }
    try{
      this.byUrl = this.activatedRoute.snapshot.paramMap.get('byUrl');
    }catch(e){
      this.byUrl = ''
    }
    this.loadDetails();
    //this.loadPTWAnswer();
    this.updateData.dataChangeState.subscribe(state => {
      if (state) {
        if(localStorage.getItem("dataUpdatePTWDetails")=='1'){
          this.loadDetails();
         // this.loadPTWAnswer();
        }
        localStorage.setItem("dataUpdatePTWDetails","0");
        this.updateData.dataChangeState.next(false);
      } else {
      }
    });
  }

  ptwDetails=[]
  imageListMD = []
  imageListAW = [];
  imageListGI = [];
  imageListTRC = [];
  showCL_SUP= false
  signatureImgSaved = ''
  loadDetails(){
    let data = {
      updateId: this.ptw_id
    }
    this.restApi.getPTWDetails(data).then((success) => {
      this.appConstant.consoleLog(success,'Ptw Details')
      this.ptwDetails =[]
      this.ptwDetails = success['data'][0]
      this.cat_id = this.ptwDetails['permit_cat_ref_id']
      this.cat_name = this.ptwDetails['cat_name']
      this.loadPTWAnswer();
      this.co_signer_1_comment = this.ptwDetails['co_signer_1_comment']
      this.co_signer_2_comment = this.ptwDetails['co_signer2_comment']
      this.safety_officer_comment = this.ptwDetails['safety_officer_comment']
      this.requester_id = this.ptwDetails['created_by']
      
      if(this.isShowApproveBtn(this.ptwDetails['co_signer_1'])){
        this.signatureImgSaved = this.ptwDetails['co1_sign_img']
      }else if((this.isShowApproveBtn(this.ptwDetails['co_signer_2']))){
        this.signatureImgSaved = this.ptwDetails['co2_sign_img']
      }else if((this.isShowApproveBtn(this.ptwDetails['safety_officer']))){
        this.signatureImgSaved = this.ptwDetails['so_sign_img']
      }else{
        this.signatureImgSaved = ''
      }


      if(this.isSafetyOfficerApproved = this.ptwDetails['safety_officer_approve']){
        this.isSafetyOfficerApproved = true;
      }else{
        this.isSafetyOfficerApproved = false;
      }

      if(this.isCoSigner1Approved = this.ptwDetails['co_signer_1_approve']){
        this.isCoSigner1Approved = true;
      }else{
        this.isCoSigner1Approved = false;
      }

      if(this.isCoSigner2Approved = this.ptwDetails['co_signer2_approve']){
        this.isCoSigner2Approved = true;
      }else{
        this.isCoSigner2Approved = false;
      }

      try{
        let imglistMd = this.ptwDetails['medical_report_img']
        this.imageListMD = imglistMd.split(',');
      }catch(e){
        this.imageListMD = []
      }

      try{
        let imglistAW = this.ptwDetails['list_of_all_workers_img']
        this.imageListAW = imglistAW.split(',');
      }catch(e){
        this.imageListAW = []
      }


      try{
        let imglistGI = this.ptwDetails['gov_id_img']
        this.imageListGI = imglistGI.split(',');
      }catch(e){
        this.imageListGI = []
      }

      try{
        let imglistTRC = this.ptwDetails['ppe_equipment_tools_img']
        this.imageListTRC = imglistTRC.split(',');
      }catch(e){
        this.imageListTRC = []
      }

      try{
        console.log(typeof(this.requester_id))
        console.log(typeof(localStorage.getItem(this.appConstant.TAG_IS_USER_ID)))
        if(Number(this.requester_id)==Number(localStorage.getItem(this.appConstant.TAG_IS_USER_ID))){
          this.showCL_SUP = true;
        }else{
          this.showCL_SUP = false;
        }
      }catch(e){
        this.showCL_SUP = false;
      }
      try{
        if(this.ptwDetails['permit_status']==6){
          this.loadPreviousDetails();
        }
      }catch(e){}

    }, (error) => {
    });
  }

  previoudDetails = []
  loadPreviousDetails(){
    let data = {
      currentId: this.ptw_id
    }
    this.restApi.getPreviousDetails(data).then((success) => {
      this.previoudDetails = success['data'][0]
      this.appConstant.consoleLog(success,'loadPreviousDetails');
    }, (error) => {
    });
  }

  allowSelectAns(){
    if(this.requester_id==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
      return false;
    }else{
      return true;
    }
  }

  isCloseSup(){
    if(this.requester_id==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
      return true;
    }else{
      return false;
    }
  }

  addPTWComment(type){
    let data;
    if(type==1){
       data = {
        approve: (this.isCoSigner1Approved)?1:0,
        comment: this.co_signer_1_comment,
        id: this.ptw_id,
      }
    }else if(type==2){
      data = {
        approve: (this.isCoSigner2Approved)?1:0,
        comment: this.co_signer_2_comment,
        id: this.ptw_id,
      }
    }else if(type==3){
      data = {
        approve: (this.isSafetyOfficerApproved)?1:0,
        comment: this.safety_officer_comment,
        id: this.ptw_id,
      }
    }

    this.restApi.savePTWComment(data).then((success) => {
      this.appConstant.toastMsg('Comment added successfully.')
      this.loadDetails();
      this.loadPTWAnswer();
    }, (error) => {
    });
  }

  isShowApproveBtn(userId){
    if(userId==localStorage.getItem(this.appConstant.TAG_IS_USER_ID)){
      return true;
    }else{
      return false;
    }
  }

  saveOption(event,question_id){
   this.saveAnswer(event.detail.value,question_id);
  }

  saveAnswer(answer,question_id){
    let data = {
      ques_ref_id: question_id,
      selected_option: answer,
      work_permit_id: this.ptw_id
    }

    this.restApi.savePTWQ_answer(data).then((success) => {
      this.appConstant.toastMsg('Answer submitted successfully.')
    }, (error) => {
    });

  }

  questionList = []
  loadPTWQuestion(){
    let data = {
      catId: this.cat_id
    }
    this.restApi.getPTWQuestion(data).then((success) => {
      this.questionList=success['data']
    }, (error) => {
    });
  }

  answerList = []
  loadPTWAnswer(){
    let data = {
      work_permit_id: this.ptw_id
    }
    this.restApi.loadPTWQAnswer(data).then((success) => {
      this.answerList=success['data']
      this.loadPTWQuestion();
    }, (error) => {
    });
  }

  getQuestionAnswer(questionID){
    try{
      let ans = this.answerList.find(x => x.question_ref_id == questionID).selected_option;
      return ans;
    }catch(e){
      return '';
    }
  }

  isShowSO(){
    if(this.ptwDetails['safety_officer_valid']==1){
      if(this.ptwDetails['safety_officer_valid']==1){
      }else{
        return true;
      }
    }else{
      return false
    }
    return false;
  }

}
