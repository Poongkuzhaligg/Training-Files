import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';
import { HelpModalComponent } from 'src/app/shared/help-modal/help-modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private sharedServ: SharedService) { }

  ngOnInit() { }

  openHelp() {
    this.sharedServ.openModal(HelpModalComponent);
  }
}
