import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

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

  async openPrivacyPolicy() {
    await Browser.open({ url: 'https://greatergoods.com/legal/privacy-policy' });
  }

}
