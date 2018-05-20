import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoactivePage } from './whoactive';

@NgModule({
  declarations: [
    WhoactivePage,
  ],
  imports: [
    IonicPageModule.forChild(WhoactivePage),
  ],
})
export class WhoactivePageModule {}
