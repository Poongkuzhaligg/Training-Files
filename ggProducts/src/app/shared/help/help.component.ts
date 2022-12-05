import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { APP_PAGE_TITLE } from 'src/app/config/constants';
import { CONTACT_DETAILS } from 'src/app/config/storage-key';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  pageTitle = APP_PAGE_TITLE;
  helpDetails = CONTACT_DETAILS;

  constructor(private modalCtrl: ModalController, private sharedService: SharedService) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async openCompanySite() {
    await this.sharedService.openSite('https://greatergoods.com/');
  };

  async openMailtoGG() {
    await this.sharedService.openSite('mailto:info@greatergoods.com');
  }

}
