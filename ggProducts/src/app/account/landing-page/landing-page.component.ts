import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor(private sharedServ: SharedService) { }

  ngOnInit() { }

  openHelp() {
    this.sharedServ.openModal(HelpComponent);
  }
}
