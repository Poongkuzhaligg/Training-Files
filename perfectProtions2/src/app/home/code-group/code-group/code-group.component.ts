import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'code-group',
	templateUrl: './code-group.component.html',
	styleUrls: ['./code-group.component.scss'],
})
export class CodeGroupComponent {
	@Input() name: string;
	@Input() foodCodes: FoodCode;
	@Input() showCodesOnly: boolean = false;
	@Output() favoriteEmitter: EventEmitter<FavoriteStateChange> = new EventEmitter();
	categoryOpen: boolean = false;

	addToFavorite(favoriteObject: FavoriteStateChange) {
		this.favoriteEmitter.emit(favoriteObject);
	}

	openCategory() {
		this.categoryOpen = !this.categoryOpen;
	}
}
