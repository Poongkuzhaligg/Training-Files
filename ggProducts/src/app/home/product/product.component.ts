import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() openProduct;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  close() {
    this.modalCtrl.dismiss();
  }

}
