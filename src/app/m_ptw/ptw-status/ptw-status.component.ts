import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterDirection } from '@ionic/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ptw-status',
  templateUrl: './ptw-status.component.html',
  styleUrls: ['./ptw-status.component.scss'],
})
export class PtwStatusComponent implements OnInit {

  @Input() cat_id:any;
  @Input() ptw_id:any;
  @Input() cat_name:any;
  @Input() isOpen:any;

  constructor(private restApi:RestApiService,private router:Router,private popoverController: PopoverController) { }

  ngOnInit() {
    console.log('ptw status : '+ this.isOpen)
  }

  async suspendStatus(){
    this.popoverController.dismiss();
    this.router.navigate(['/update-status-ptw', 
    {
      'ptw_id': this.ptw_id,
      'cat_id': this.cat_id,
      'cat_name': this.cat_name,
      'type':'suspend',
    }]);
  }
  closeStatus(){
    this.popoverController.dismiss();
    this.router.navigate(['/update-status-ptw', 
    {
      'ptw_id': this.ptw_id,
      'cat_id': this.cat_id,
      'cat_name': this.cat_name,
      'type':'close',
    }]);
  }
}
