import { NgModule } from '@angular/core';
import { EmojipickerComponent } from './emojipicker/emojipicker';
import {IonicModule, IonicPageModule} from "ionic-angular";
import { ExpressComponent } from './express/express';
@NgModule({
	declarations: [EmojipickerComponent,
    ExpressComponent],
	imports: [IonicPageModule.forChild(EmojipickerComponent)],
	exports: [EmojipickerComponent,
    ExpressComponent]
})
export class ComponentsModule {}
