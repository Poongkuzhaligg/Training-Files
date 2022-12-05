import { Injectable } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { ALERT_MESSAGE } from '../config/storage-key';

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

  async showWarning() {
    const header = ALERT_MESSAGE.header;
    const message = ALERT_MESSAGE.messageWarn;
    const buttons = [
      {
        text: ALERT_MESSAGE.buttonCancel,
        role: ALERT_MESSAGE.roleCancel,
      },
      {
        text: ALERT_MESSAGE.buttonOk,
        role: ALERT_MESSAGE.roleConfirm,
        handler: () => {
          this.modalController.dismiss();
        },
      },
    ];
    this.presentAlert(header, message, buttons);
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

  async openSite(link: string) {
    await Browser.open({ url: link });
  }

}
