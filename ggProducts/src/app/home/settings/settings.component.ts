import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AccountService } from 'src/app/services/account.service';
import { SharedService } from 'src/app/services/shared.service';
import { HelpModalComponent } from 'src/app/shared/help-modal/help-modal.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HelpComponent } from './help/help.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentProfile: User;
  mapper = {
    helpComponent: HelpComponent,
    changePasswordComponent: ChangePasswordComponent,
    editProfileComponent: EditProfileComponent
  };

  constructor(private accountServ: AccountService,
    private sharedServ: SharedService
  ) { }

  ngOnInit() {
    this.accountServ.currrentProfile.subscribe(data => this.currentProfile = data);
  }

  openModal(componentName) {
    const component = this.mapper[componentName];
    this.sharedServ.openModal(component);
  }

  openEditProfileModal() {
    this.sharedServ.openModal(ChangePasswordComponent);
  }

  openchangePassModal() {
    this.sharedServ.openModal(ChangePasswordComponent);
  }

  openHelpModal() {
    this.sharedServ.openModal(ChangePasswordComponent);
  }

  logout() {
    this.accountServ.logout();
  }

}
