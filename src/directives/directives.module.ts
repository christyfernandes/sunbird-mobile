import { NgModule } from '@angular/core';
import { ReadMoreDirective } from './read-more/read-more';
import { HideHeaderDirective} from './hide-header/hide-header';
@NgModule({
  declarations: [ReadMoreDirective, HideHeaderDirective],
  imports: [],
  exports: [ReadMoreDirective, HideHeaderDirective]
})
export class DirectivesModule {}
