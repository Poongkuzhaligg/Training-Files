import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from '../home/settings/help/help.component';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private modalCtrl: ModalController) { }

  async openModal(componentName) {
    const modal = await this.modalCtrl.create({
      component: componentName,
    });
    modal.present();
  }

}
