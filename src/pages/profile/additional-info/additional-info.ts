import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'lodash';

import { UserProfileService } from 'sunbird';
import { ProfilePage } from './../profile';

/* Interface for the Toast Object */
export interface toastOptions {
  message: string,
  duration: number,
  position: string
};

@Component({
  selector: 'additional-info',
  templateUrl: 'additional-info.html'
})

/* This contains form for the User's Additional Information where user can edit previous one */
export class AdditionalInfoComponent {
  tabBarElement: any;
  isNewForm: boolean = true;
  additionalInfoForm: FormGroup;
  userId: string;
  profile: any = {};

  /* @todo Fetch languageList, SubjectList and gradeList from the framework */
  languageList: Array<String> = ["Assamese", "Bengali", "English", "Gujarati", "Hindi", "Kannada", "Marathi", "Punjabi", "Tamil", "Telugu"];
  subjectList: Array<String> = ["Assamese", "Bengali", "English", "Gujarati", "Hindi", "Kannada", "Marathi", "Punjabi", "Tamil", "Telugu"];
  gradeList: Array<String> = [
    "Kindergarten", 
    "Grade 1", 
    "Grade 2",
    "Grade 3",
    "Grade 4", 
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12"
  ];

  options: toastOptions = {
    message: '',
    duration: 3000,
    position: 'bottom'
  };

  constructor(public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams,
    public userProfileService: UserProfileService,
    private toastCtrl: ToastController
  ) {
    /* Returns a html element for tab bar*/
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

    /* Receive data from other component */
    this.userId =  this.navParams.get('userId');
    this.profile =  this.navParams.get('profile');

    /* Initialize form with default values */
    this.additionalInfoForm = this.fb.group({
      firstName: [this.profile.firstName || '', Validators.required],
      lastName: [this.profile.lastName || ''],
      language: [this.profile.language || [], Validators.required],
      email: [this.profile.email || ''],
      phone: [this.profile.phone || '', [Validators.required, Validators.minLength(8)]],
      profileSummary: [this.profile.profileSummary || ''],
      subject: [this.profile.subject || []],
      gender: [this.profile.gender || ''],
      dob: [this.profile.dob || ''],
      grade: [this.profile.grade || []],
      location: [this.profile.location || ''],
      facebookLink: [''],
      twitterLink: [''],
      linkedInLink: [''],
      blogLink: ['']
    });

    /* Patch social Webpages links */
    if(this.profile.webPages.length) {
      this.profile.webPages.forEach(element => {
        if(element.type === 'fb') {
          this.additionalInfoForm.patchValue({
            facebookLink: element.url
          })
        } else if(element.type === "twitter") {
          this.additionalInfoForm.patchValue({
            twitterLink: element.url
          })
        } else if(element.type === "in") {
          this.additionalInfoForm.patchValue({
            linkedInLink: element.url
          })
        } else {
          this.additionalInfoForm.patchValue({
            blogLink: element.url
          })
        }
      });
    }
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  /* This will call on click of `SAVE` button
  * @param {object} event - Form event
  */
  onSubmit(event): void {
    let formVal = this.additionalInfoForm.value;
     let currentValues: any = {
      userId: this.userId,
      firstName: formVal.firstName,
      language: formVal.language,
      phone: formVal.phone,
      lastName: formVal.lastName,
      profileSummary: formVal.profileSummary,
      subject: formVal.subject,
      gender: formVal.gender,
      dob: formVal.dob,
      grade: formVal.grade,
      location: formVal.location,
      webPages: []
    }

    if(formVal.facebookLink !== '') {
      currentValues.webPages.push({
        type: 'fb',
        url: formVal.facebookLink
      });
    }
    if(formVal.twitterLink !== '') {
      currentValues.webPages.push({
        type: 'twitter',
        url: formVal.twitterLink
      });
    }
    if(formVal.linkedInLink !== '') {
      currentValues.webPages.push({
        type: 'in',
        url: formVal.linkedInLink
      });
    }
    if(formVal.blogLink !== '') {
      currentValues.webPages.push({
        type: 'blog',
        url: formVal.blogLink
      });
    }

    let modifiedFields = this.checkDifference(currentValues, this.profile);
    let req: any = {
      userId: this.userId,
      firstName: formVal.firstName,
      language: formVal.language,
      phone: formVal.phone
    }

    modifiedFields.forEach(element => {
      req[element] = currentValues[element]
    });

    this.updateInfo(req);
  }

  /* This will call Update User's Info API
  * @param {object} req - Request object for the User profile Service
  */
  updateInfo(req: any): void {
    this.userProfileService.updateUserInfo(req,
      res => {
        this.getToast(JSON.parse(res).message).present();
        setTimeout(() => {
          this.navCtrl.setRoot(ProfilePage);
        }, 2000);
      },
      err => {
        console.log("Error", err);
      });
  }

  /* This compares two objects and returns the variant fields
  * @param {object} currentValues
  * @param {object} profileObj
  * @returns {Array<string>}
  */
  checkDifference(currentValues, profileObj): Array<string> {
    return _.reduce(currentValues, (result, value, key) => _.isEqual(value, profileObj[key]) ? result : result.concat(key), [])
  }

  /* It will returns Toast Object
  * @param {message} string - Message for the Toast to show
  * @returns {object} - toast Object
  */
  getToast(message: string = ''): any {
    this.options.message = message;
    if(message.length) return this.toastCtrl.create(this.options);
  }
}