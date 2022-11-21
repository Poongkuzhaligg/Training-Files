import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpModalComponent } from '../help-modal/help-modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async openHelp() {
    const modal = await this.modalCtrl.create({
      component: HelpModalComponent,
    });
    modal.present();
  }

}
