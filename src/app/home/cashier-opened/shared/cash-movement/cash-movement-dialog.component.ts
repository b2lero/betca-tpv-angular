import {Component} from '@angular/core';
import {CashMovement} from './cash-movement.model';
import {CashMovementOptionsModel} from './cash-movement-options.model';
import {OptionType} from './cash-movement-option-type.model';

@Component({
  templateUrl: 'cash-movement-dialog.component.html',
  styleUrls: ['cash-movement-dialog.component.css']
})
export class CashMovementDialogComponent {

  cashMovement: CashMovement = {cash: undefined, comment: undefined};
  cashMovementOptions: CashMovementOptionsModel[] = [
    {value: OptionType.DEPOSIT, viewValue: OptionType.DEPOSIT},
    {value: OptionType.WITHDRAWAL, viewValue: OptionType.WITHDRAWAL}
  ];
  fieldsDisabled: boolean;
  selectedValue: string;

  constructor() {
    this.fieldsDisabled = true;
  }

  invalid() {
    return (!this.cashMovement.cash || this.cashMovement.cash <= 0
      || !this.cashMovement.comment
      || this.fieldsDisabled
    );
  }

  onChange($event: string) {
    this.fieldsDisabled = false;
    this.selectedValue = $event;
  }

  save() {
  }
}
