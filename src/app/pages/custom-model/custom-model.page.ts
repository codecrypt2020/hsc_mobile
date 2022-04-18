import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';
@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.page.html',
  styleUrls: ['./custom-model.page.scss'],
})
export class CustomModelPage implements OnInit {

  @Input() pop_up_type:any;
  @Input() title:any;
  @Input() msg:any;
  @Input() redirect:any;
  @Input() result:any;
  constructor(private router:Router,private modalCtrl:ModalController,private updateData:UpdateDataStatusService) { }

  ngOnInit() {
  }
  cancelDialog(){
    this.modalCtrl.dismiss();
  }
  
  goBack(){
    localStorage.setItem("dataUpdate","1");
    this.updateData.dataChangeState.next(true);
    this.router.navigateByUrl(this.redirect);
    this.modalCtrl.dismiss();
    // if(this.pop_up_type=='ch_list_submit'){

    // }else{
    //   this.router.navigateByUrl('/admin/tabs/self-d-home');
    // this.modalCtrl.dismiss();
    // } 
   }

}
