import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,) { }

  async openModal(componentName) {
    const modal = await this.modalController.create({
      component: componentName,
    });
    modal.present();
  }

  async presentAlert(header, message, buttons, subHeader?) {
    const alert = await this.alertController.create({
      header,
      message,
      subHeader,
      buttons,
    });
    return alert.present();
  }

  async presentToast(toastMsg, toastColor) {
    const toast = await this.toastController.create({
      message: toastMsg,
      duration: 1500,
      position: 'top',
      color: toastColor
    });
    await toast.present();
  }

  async openPrivacyPolicy() {
    await Browser.open({ url: 'https://greatergoods.com/legal/privacy-policy' });
  }

}
