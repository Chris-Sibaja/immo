import { MyApp                                      } from './app.component';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController   } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { HttpClient, HttpClientModule         } from '@angular/common/http';
import { HttpModule                           } from '@angular/http';
import { ErrorHandler, NgModule               } from '@angular/core';
import { BrowserModule                        } from '@angular/platform-browser';
import { IonicStorageModule                   } from '@ionic/storage';
import { TranslateLoader, TranslateModule     } from '@ngx-translate/core';
import { TranslateHttpLoader                  } from '@ngx-translate/http-loader';
import { FileTransfer, FileTransferObject     } from '@ionic-native/file-transfer';
import { DocumentViewer                       } from '@ionic-native/document-viewer';
import { InAppBrowser                         } from '@ionic-native/in-app-browser';
import { SocialSharing                        } from '@ionic-native/social-sharing';
import { Camera                               } from '@ionic-native/camera';
import { SplashScreen                         } from '@ionic-native/splash-screen';
import { StatusBar                            } from '@ionic-native/status-bar';
import { User, Properties, Api } from '../providers/';


import { File } from '@ionic-native/file';

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ControlProvider } from '../providers/control/control';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ionicGalleryModal.GalleryModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, { 
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api, 
    User, 
    Properties,
    Camera,
    SplashScreen,
    StatusBar,    
    InAppBrowser,
    FileTransfer,
    File,
    FileTransferObject,
    SocialSharing,
    DocumentViewer,
    ToastController,
    Geolocation,
    { provide: HAMMER_GESTURE_CONFIG,  useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ControlProvider
  ]
})
export class AppModule { }
