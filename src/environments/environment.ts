// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // BASE_URL : 'http://139.59.87.18/api/',
  // IMG_BASE_URL : 'http://139.59.87.18/',
  //Node API
    // NODE_URL :  'https://adminmisafe.in:3004/', //https
    // IMG_BASE_N_URL : 'https://adminmisafe.in:3004/',
  //Node Dev
  NODE_URL : 'https://devmisafeadmin.in:3004/',
  IMG_BASE_N_URL : 'https://devmisafeadmin.in:3004/',

  ONESIGNAL_APPID: 'f38a59f0-8ba3-4321-9da8-76798d4e338a',
  FIREBASE_CONFIG: {
    messagingSenderId: "625160820680"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
