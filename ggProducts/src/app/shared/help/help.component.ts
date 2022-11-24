import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();

  }

}
