import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { UpdateDataStatusService } from 'src/app/services/update-data-status.service';

@Component({
  selector: 'app-update-status-ptw',
  templateUrl: './update-status-ptw.page.html',
  styleUrls: ['./update-status-ptw.page.scss'],
})
export class UpdateStatusPTWPage implements OnInit {
  ptw_id;
  cat_id;
  cat_name;
  type;
  description = '';
  byUrl
  constructor(private activatedRoute:ActivatedRoute,private restApi:RestApiService,private router:Router,private updateData:UpdateDataStatusService) { 
    this.ptw_id = this.activatedRoute.snapshot.paramMap.get('ptw_id');
    this.cat_id = this.activatedRoute.snapshot.paramMap.get('cat_id');
    this.cat_name = this.activatedRoute.snapshot.paramMap.get('cat_name');
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.byUrl = this.activatedRoute.snapshot.paramMap.get('byUrl');
  }

  ngOnInit() {
  }

  updateStatus(){
    let data = {
      close_comment: this.description,
      id: this.ptw_id,
      type: this.type
    }
    this.restApi.updatePTWStatus(data).then((success) => {
      localStorage.setItem("dataUpdatePTWDetails","1");
      this.updateData.dataChangeState.next(true);
      this.router.navigate(['ptw-details',{ptw_id:this.ptw_id,cat_id:this.cat_id,cat_name:this.cat_name,byUrl:this.byUrl}]);
    }, (error) => {
    });
  }

  goBack(){
    localStorage.setItem("dataUpdatePTWDetails","1");
    this.updateData.dataChangeState.next(true);
    this.router.navigate(['ptw-details',{ptw_id:this.ptw_id,cat_id:this.cat_id,cat_name:this.cat_name,byUrl:this.byUrl}]);
  }

}
