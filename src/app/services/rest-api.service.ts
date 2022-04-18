import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AppConstantService } from './app-constant.service';
import { environment as ENV } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private appConstatnt: AppConstantService, public httpClient: HttpClient, public inject: Injector, public alertController: AlertController) {
  }

  // public userLoginApi(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.LOGIN_API, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // } 


  // public getAllIncidentUsers(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.INC_LIST_API, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public getAreaListByPlant(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_AREA_LIST_PLANT, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }


  // public getPlantList(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_PLANT_LIST, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public storePlayerID(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.APIADD_PLAYER_ID, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  // public loadUserDetails(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_USER_ALL_DETAILS, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  // public getDashboard(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_DASHBOARD, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  public uploadDocument(dataObj,apiTag) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://139.59.87.18/api/' + apiTag,dataObj, {
        headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // public getMasterDetails() {
  //   let httpHeaders = this.appConstatnt.getRequestHeader();
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.get(ENV.BASE_URL+this.appConstatnt.API_MASTER_DETAILS, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public sendOTPApi(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_SEND_OTP, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }


  // public createIncident(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.INC_ADD_API, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public updateUserProfile(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_USER_PROFILE, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

    // public getOrgList(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_ORG_LIST, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public updateUserPassword(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_UPDATE_PASSWORD, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  // public syncIssue(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_INC_SYNC, JSON.stringify(dataObject), {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }


    // public getIncidentByPlant(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.INC_LIST_BY_PLANT_API, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // public getAllAreaList(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.AREA_LIST_API, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }
  
  // public checkForceUpdate(dataObject) {
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL+this.appConstatnt.API_CHK_FORCE_UPDATE, JSON.stringify(dataObject), {
  //       headers: new HttpHeaders(this.appConstatnt.getRequestHeader()),
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }


  // public getIncResponse(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_INC_RESPONSE, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  // public getNotificationCount(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_NOTI_COUNT, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  // public getNotificationList(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.BASE_URL + this.appConstatnt.API_NOTI_LIST, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }


//***************************** Node api started *************************


public getCatListByOrg(dataObject) {
  return new Promise((resolve, reject) => {
    this.httpClient.post(ENV.NODE_URL+this.appConstatnt.API_N_CAT_LIST, JSON.stringify(dataObject), {
      headers: new HttpHeaders(this.appConstatnt.getNodeRequestHeader()),
    })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

public nodeUserLogin(dataObject) {
  let httpHeaders = {}//new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
  return new Promise((resolve, reject) => {
    this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_USER_LOGIN, dataObject, {
      headers: httpHeaders
    })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}  

public nodeStorePlayerID(dataObject) {
  let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
  return new Promise((resolve, reject) => {
    this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_ADD_PLAYER_ID, dataObject, {
      headers: httpHeaders
    })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}

public loadUserDetails(dataObject) {
  let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
  return new Promise((resolve, reject) => {
    this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EMP_PROFILE, dataObject, {
      headers: httpHeaders
    })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  })
}  



  public getCheckList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHECK_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCheckListCat(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHECK_CAT, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public saveQuestionAnswer(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_SAVE_ANSWER, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getAnswerByID(dataObject,strURL) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(strURL, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getQuestionByID(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_ANS_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCHKAnsByID(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHECKLIST_ANS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCHKAnsByList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_S_ANS_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCheckListStatus(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_CHK_ANSWER, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCheckListAnswerDetails(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_CHK_ANSWER_R, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public saveUserAnswerImage(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_ANSWER_IMAGE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  } 

  public getSDReportedUser(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_SD_USERS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  } 

  public getChecklistScore(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_SD_SCORE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getLastIncDays(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_LAST_DAYS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeUserAccess(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_USER_ACCESS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeCHKAns(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHECKLIST_ANS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeCHKSingleAns(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_Q_ANS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  

  public getNodeNCount(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_NOTI_COUNT, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeNotification(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_NOTIFICATION, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }


  public saveINCStatus(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_UPDATE_STATUS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public closeIssue(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CLOSE_STATUS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeEMPList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EMP_LIST, JSON.stringify(dataObject), {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public saveNEditAPoints(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EDIT_AP, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public changeActionStatus(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_UCHK_VALUE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public uploadINCRImagesIP(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_IP_IMAGE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public uploadINCRImagesCL(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_CL_IMAGE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  // Checklist dashboard apis

  public getChkCatList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_CAT_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkListByCatP(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_P_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkScore(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_SCORE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getCheckListData(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkListDetail(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_DETAIL_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkCatListAssigned(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_ASSIGNED_LIST_CAT, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkListAssignedList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_ASSIGNED_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getAreaChartData(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_AREA_CHART, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getChkProgress(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CHK_PROGRESS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWCategory(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_CATEGORY, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWDetails(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_DETAILS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWQuestion(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_Q_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public savePTWQ_answer(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_Q_SAVE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public savePTW(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_SAVE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public updatePTWStatus(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_STATUS_CHANGE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWStats(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_STATS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }


  public getPTWDashboard(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_DASHBOARD, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWCatDashboard(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_CAT_BOARD, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPTWTOpen(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_T_OPEN, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public ptwVCount(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_V_COUNT, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  


  public loadPTWQAnswer(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_Q_ANS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }


  public savePTWComment(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_COMMENT_SAVE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  

  public getORGShifts(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_ORG_SHIFTS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }


  public getIssueListByFilter(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_ISSUE_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public saveIncidentByNode(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_SAVE_INC, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetIncDetails(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_DETAILS, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetIncImages(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_IMAGES, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetOrgCat(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_CAT_LIST_ORG, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetForceUpdate() {
    let httpHeaders = this.appConstatnt.getNodeRequestHeader();
    return new Promise((resolve, reject) => {
      this.httpClient.get(ENV.NODE_URL + this.appConstatnt.API_N_FORCE_UPDATE, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

    public nodeGetPlantByOrgId(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PLANT_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetAreabyPlant(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_AREA_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetAllArea(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_ALL_AREA_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

 

  public nodeUpdateEmpDetails(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EMP_UPDATE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeUpdateEmpPWD(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EMP_UPDATE_PWD, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public nodeGetOrgList(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_ORG_LIST, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  //Dashboard Api calls
  public nodeGetUAUCDashboard(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_DASHBOARD, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }


  // public getNodeDashboard(dataObject) {
  //   let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_INC_DASHBOARD, dataObject, {
  //       headers: httpHeaders
  //     })
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   })
  // }

  public getStatsByArea(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_STATS_BY_AREA, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getPreviousDetails(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_PTW_PRI, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  public getNodeImageAPI(dataObject) {
    let httpHeaders = new HttpHeaders(this.appConstatnt.getNodeRequestHeader());
    return new Promise((resolve, reject) => {
      this.httpClient.post(ENV.NODE_URL + this.appConstatnt.API_N_EMP_IMAGE, dataObject, {
        headers: httpHeaders
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  


}