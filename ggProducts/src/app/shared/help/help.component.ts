import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { APP_PAGE_TITLE } from 'src/app/config/constants';
import { CONTACT_DETAILS } from 'src/app/config/storage-key';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  pageTitle = APP_PAGE_TITLE;
  helpDetails = CONTACT_DETAILS;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
