import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'code',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss'],
})
export class CodeComponent {
	@Input() code: FoodCode;
	@Output() favoriteEmitter: EventEmitter<FavoriteStateChange> = new EventEmitter();

	toggleFavorite() {
		if (!this.code.favorite) {
			this.favoriteEmitter.emit({
				code: this.code.code,
				isFavorite: true
			});
		} else {
			this.favoriteEmitter.emit({
				code: this.code.code,
				isFavorite: false
			});
		}
	}
}
