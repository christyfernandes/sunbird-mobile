import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResourcesPage } from './resources';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../component/components.module';
import { DirectivesModule} from '../../directives/directives.module';

@NgModule({
  declarations: [
    ResourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(ResourcesPage),
    TranslateModule.forChild(),
    ComponentsModule,
    DirectivesModule
  ],
  exports: [
    ResourcesPage
  ],
  entryComponents: [
  ]
})
export class ResourcesPageModule { }
