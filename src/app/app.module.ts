import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicModule, IonicRouteStrategy ,ModalController} from '@ionic/angular';
 
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

//import { IonicStorageModule } from '@ionic/storage';,IonicStorageModule.forRoot()

import { Camera } from '@ionic-native/camera/ngx';
import { CommonModule } from '@angular/common';
import { UsersPageRoutingModule } from './pages/users/users-routing.module';
import { TabsPageRoutingModule } from './pages/tabs/tabs-routing.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import * as Sentry from "sentry-cordova";
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { FileUploadComponent } from './Component/file-upload/file-upload.component';
//import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';


// Module
import { CalendarModule } from 'ion2-calendar';

Sentry.init({
  dsn: 'https://a0f208b73b304715ae1877446b9eb201@o975793.ingest.sentry.io/5932096'
});

@NgModule({
  declarations: [AppComponent,FileUploadComponent],
  entryComponents: [],
  imports: [
    CommonModule, IonicModule,
    Ionic4DatepickerModule,
    IonicSelectableModule,
    BrowserModule, 
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'ios'
    }), 
    AppRoutingModule,
    UsersPageRoutingModule,
    TabsPageRoutingModule,
    HttpClientModule,
    CalendarModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Badge,
    ModalController,
    PDFGenerator,
    CallNumber,
    File,
    PhotoViewer,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: ErrorHandler },
    OneSignal],
    schemas: [ 
      CUSTOM_ELEMENTS_SCHEMA,],
  bootstrap: [AppComponent],
})
export class AppModule {}
