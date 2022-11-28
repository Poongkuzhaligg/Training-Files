import { Component, OnInit } from '@angular/core';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  version = environment.version;

  constructor(private sharedServ: SharedService) { }

  ngOnInit() { }

  openHelp() {
    this.sharedServ.openModal(HelpComponent);
  }

  async openSite() {
    await this.sharedServ.openPrivacyPolicy();
  };
}
