import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../core/container/tabs/tabs';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OAuthService } from '../../core/services/auth/oauth.service';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {

  slides: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private auth: OAuthService) {

    this.slides = [
      {
        'title': 'ONBOARD_SLIDE_TITLE_1',
        'imageUri': 'assets/imgs/logo.png',
        'desc': 'ONBOARD_SLIDE_DESC_1'
      },
      {
        'title': 'ONBOARD_SLIDE_TITLE_2',
        'imageUri': 'assets/imgs/logo.png',
        'desc': 'ONBOARD_SLIDE_DESC_2'
      },
      {
        'title': 'ONBOARD_SLIDE_TITLE_3',
        'imageUri': 'assets/imgs/logo.png',
        'desc': 'ONBOARD_SLIDE_DESC_3'
      },
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }

  singin() {
    let that = this;

    that.auth.doOAuthStepOne()
    .then(token => {
      return that.auth.doOAuthStepTwo(token);
    })
    .then(() => {
      return that.navCtrl.push(TabsPage, { loginMode: 'signin' });
    })
    .then(() => {
      // first we find the index of the current view controller:
      const index = that.viewCtrl.index;
      // then we remove it from the navigation stack
      that.navCtrl.remove(index);
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  browseAsGuest() {
    this.navCtrl.push(TabsPage, { loginMode: 'guest' })
      .then(() => {
        // first we find the index of the current view controller:
        const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        this.navCtrl.remove(index);
      });
  }

}