import { Component, OnInit } from '@angular/core';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { ACCOUNT_PAGE, AppTitle } from 'src/app/config/constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  version = environment.version;
  landingStrings = ACCOUNT_PAGE;
  appTitle = AppTitle;

  constructor(private sharedService: SharedService) { }

  ngOnInit() { }

  openHelp() {
    this.sharedService.openModal(HelpComponent);
  }

  async openPrivacyPolicySite() {
    await this.sharedService.openSite('https://greatergoods.com/legal/privacy-policy');
  };

}
