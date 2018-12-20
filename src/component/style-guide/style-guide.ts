import { Component } from '@angular/core';
import { App, MenuController } from 'ionic-angular';

@Component({
  selector: 'style-guide',
  templateUrl: 'style-guide.html'
})
export class StyleGuideComponent {

  text: string;

  constructor(app: App, menu: MenuController) {
    menu.enable(true);
  }

}
