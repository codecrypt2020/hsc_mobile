import { Component, Input, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { SaveIssueResponsePage } from 'src/app/save-issue-response/save-issue-response.page';
import { AppConstantService } from 'src/app/services/app-constant.service';
@Component({
  selector: 'app-status-component',
  templateUrl: './status-component.component.html',
  styleUrls: ['./status-component.component.scss'],
})



export class StatusComponentComponent implements OnInit {
  @Input() status:any;
  @Input() role:any;
  @Input() rsponseDetails:any;
  @Input() is_s_plant_admin:any;
  @Input() inc_id:any;
  @Input() severity:any;
  @Input() type:any;
  

  currentStatus ='';
  constructor(private appConstant:AppConstantService,private popoverController: PopoverController,private modalController:ModalController,private router:Router) { }

  ngOnInit() {
    if(this.status=='open'){
        this.currentStatus = 'In Progress'
    }else if(this.status=='in progress'){
      this.currentStatus = 'Close'
    }
  }
  wifiSetting(){
    this.popoverController.dismiss();
    this.loadModelComp();
  }

  async loadModelComp(){
    this.router.navigate(['/save-issue-response', {
      'role':'plant admin',
      'status':this.currentStatus,
      'rsponseDetails':JSON.stringify(this.rsponseDetails),
      'is_s_plant_admin': this.is_s_plant_admin,
      'inc_id':this.inc_id,
      'type':this.type,
      'severity':this.severity}]);

    // const modal = await this.modalController.create({
    //   component: SaveIssueResponsePage,
    //   cssClass: 'modal-custom-css',
    //   componentProps: {
    //     'role':'plant admin',
    //     'status':this.currentStatus,
    //     'rsponseDetails':this.rsponseDetails,
    //     'is_s_plant_admin':this.is_s_plant_admin,
    //     'inc_id':this.inc_id,
    //     'severity':this.severity
    //   }
    // });
    // return await modal.present();
  
}

}
