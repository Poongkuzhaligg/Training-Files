import { Component, VERSION } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(private _bottomSheet: MatBottomSheet){

  }
  openBottomSheet(): void {
    this._bottomSheet.open(RequirementSheet);
  }
}


@Component({
  selector: 'requirement-sheet',
  templateUrl: 'functionality-requirements.html',
})
export class RequirementSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<RequirementSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
