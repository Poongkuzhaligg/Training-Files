import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'message-modal',
	templateUrl: './message-modal.component.html',
	styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
	@Input() title: string;
	@Input() subtitle: string;
	@Input() content: string = '';

	constructor(private modal: ModalController) { }

	dismiss() {
		this.modal.dismiss();
	}

}
