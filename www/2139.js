"use strict";(self.webpackChunkhsc_mobile=self.webpackChunkhsc_mobile||[]).push([[2139],{2139:(b,l,i)=>{i.r(l),i.d(l,{GetStartedPageModule:()=>v});var c=i(8583),m=i(665),o=i(7823),s=i(649),t=i(639),h=i(3037),u=i(5857),g=i(4714);const p=[{path:"",component:(()=>{class e{constructor(n,a,d,S){this.router=n,this.appConstant=a,this.authService=d,this.restApi=S,this.showDetails=[],this.finalURL="/admin/tabs/profile",this.loadUserAccessDefault()}ngOnInit(){}loadHomePage(){this.authService.authenticationState.next(!0),"user"==this.appConstant.getRoleById(localStorage.getItem(this.appConstant.TAG_IS_USER_ROLE))?this.router.navigateByUrl(1==this.showDetails.issue_selected?"/users/tabs/home":1==this.showDetails.checklist_selected?"/users/tabs/inspections":1==this.showDetails.sd_selected?"/users/tabs/self-d-home":"/users/tabs/profile"):this.router.navigateByUrl(this.finalURL)}loadUserAccessDefault(){if(!this.appConstant.isInternet)return null;this.restApi.getNodeUserAccess({}).then(a=>{this.showDetails=a.data[0],this.finalURL=1==this.showDetails.issue_selected||1==this.showDetails.sd_selected||1==this.showDetails.checklist_selected||1==this.showDetails.work_permit_selected?"/admin/tabs/action":"/admin/tabs/profile"},a=>{this.appConstant.handleApiError(a)})}}return e.\u0275fac=function(n){return new(n||e)(t.\u0275\u0275directiveInject(s.F0),t.\u0275\u0275directiveInject(h.Z),t.\u0275\u0275directiveInject(u.s),t.\u0275\u0275directiveInject(g.e))},e.\u0275cmp=t.\u0275\u0275defineComponent({type:e,selectors:[["app-get-started"]],decls:24,vars:0,consts:[[1,"container"],[1,"center","padding24"],[1,"div-center",2,"height","20% !important"],["src","/assets/imgs/logo.png"],[1,"div-center",2,"height","40% !important"],["src","/assets/imgs/get-started.png",2,"max-width","90% !important"],[1,"div-center",2,"height","25% !important"],[1,"center-align","tabButtonFont","font-size-e-large","text-color-primary"],[1,"center-align","tabButtonFont","font-size-content","text-color-primary","mt-10"],[1,"div-center",2,"height","15% !important"],["id","outer"],["id","inner"],["lines","none","detail","false"],["shape","round","fill","outline",1,"btn-getstarted","tabButtonFont","font-size-button",3,"click"],["lines","none","detail","false",1,"itemBG"],[1,"tabButtonFont","btn-label"],["name","arrow-forward-outline","slot","end",2,"font-size","16px !important","color","#E9CD00 !important"]],template:function(n,a){1&n&&(t.\u0275\u0275elementStart(0,"ion-content"),t.\u0275\u0275elementStart(1,"div",0),t.\u0275\u0275elementStart(2,"div",1),t.\u0275\u0275elementStart(3,"div",2),t.\u0275\u0275elementStart(4,"div"),t.\u0275\u0275element(5,"img",3),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(6,"div",4),t.\u0275\u0275element(7,"img",5),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(8,"div",6),t.\u0275\u0275elementStart(9,"div",7),t.\u0275\u0275text(10,"Let's Get Started "),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(11,"div",8),t.\u0275\u0275text(12,"MISafe is safety management system "),t.\u0275\u0275element(13,"br"),t.\u0275\u0275text(14,"which helps in conducting paperless safety reporting."),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementStart(15,"div",9),t.\u0275\u0275elementStart(16,"div",10),t.\u0275\u0275elementStart(17,"div",11),t.\u0275\u0275elementStart(18,"ion-item",12),t.\u0275\u0275elementStart(19,"ion-button",13),t.\u0275\u0275listener("click",function(){return a.loadHomePage()}),t.\u0275\u0275elementStart(20,"ion-item",14),t.\u0275\u0275elementStart(21,"ion-label",15),t.\u0275\u0275text(22," Continue "),t.\u0275\u0275elementEnd(),t.\u0275\u0275element(23,"ion-icon",16),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd(),t.\u0275\u0275elementEnd())},directives:[o.IonContent,o.IonItem,o.IonButton,o.IonLabel,o.IonIcon],styles:[".center[_ngcontent-%COMP%]{width:100%!important;height:100%!important;text-align:center!important;margin:0}.div-center[_ngcontent-%COMP%]{align-items:center;display:flex;flex-direction:column;justify-content:center;overflow-y:auto}ion-content[_ngcontent-%COMP%]{background-size:cover}.btn-label[_ngcontent-%COMP%]{text-align:start!important;color:#e9cd00!important}#inner[_ngcontent-%COMP%]{display:table;margin:0 auto;width:80%!important}#outer[_ngcontent-%COMP%]{width:100%}.btn-getstarted[_ngcontent-%COMP%]{width:100%!important;height:44px!important;--background: #f5f3e2 !important;--box-shadow: none !important;font-weight:500;font-stretch:normal;font-style:normal;line-height:.77;letter-spacing:.52px;text-align:center;color:#e9cd00!important;--border-radius: 25px !important;--border-color: #E9CD00 !important;--border-width: 1px !important}.itemBG[_ngcontent-%COMP%]{--background: transparent !important;width:100%!important}"]}),e})()}];let f=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.\u0275\u0275defineNgModule({type:e}),e.\u0275inj=t.\u0275\u0275defineInjector({imports:[[s.Bz.forChild(p)],s.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.\u0275\u0275defineNgModule({type:e}),e.\u0275inj=t.\u0275\u0275defineInjector({imports:[[c.CommonModule,m.FormsModule,o.IonicModule,f]]}),e})()}}]);