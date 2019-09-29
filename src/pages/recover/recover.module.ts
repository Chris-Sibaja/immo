import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RecoverPage } from './recover';

@NgModule({
    declarations: [
        RecoverPage,
    ],
    imports: [
        IonicPageModule.forChild(RecoverPage),
        TranslateModule.forChild()
    ],
    exports: [
        RecoverPage
    ]
})
export class RecoverPageModule { }
