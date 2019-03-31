import {Component} from '@angular/core';
import {RgpdService} from './rgpd.service';
import {Rgpd} from './rgpd.model';


@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html'
})
export class RGPDComponent {
  static URL = 'rgpd';
  title = 'RGPD management';

  acceptedRgpd: boolean;
  showFileUpload: boolean;
  agreementType: string;
  documentResult;
  rgpd: Rgpd;

  constructor(private rgpdService: RgpdService) {
    this.rgpdService.getUserAgreement().subscribe(data => {
      console.log('Valor ' + data.accepted);
      this.acceptedRgpd = data.accepted;
      this.rgpd = data;
    });
    this.agreementType = '1';
    this.showFileUpload = false;
    console.log('Constructor Executed!');
  }

  onAgreementSelected(event: Event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.documentResult = reader.result;
      this.documentResult = window.btoa(this.documentResult);
      this.rgpd.printableAgreement = this.documentResult;
      this.rgpd.agreementType = this.agreementType;
      this.rgpdService.createUserAgreement(this.rgpd).subscribe(data => {
        console.log('Created agreement: ' + this.agreementType + ' and agreement ' + this.documentResult);
        console.log('Devuelve: ' + data.accepted);
        this.acceptedRgpd = data.accepted;
        this.agreementType = data.agreementType;
        this.rgpd = data;
      }, (error => {
        console.log(error);
      }));
    };
    reader.readAsBinaryString((<HTMLInputElement>input).files[0]);

  }

  printAgreement() {
    this.rgpd = {agreementType: this.agreementType};
    this.rgpdService.createPrintableAgreement(this.rgpd).subscribe(data => {
      const byteCharacters = window.atob(data.printableAgreement);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
      this.showFileUpload = true;
    });
    console.log('Create service to call API Rest with: ' + this.agreementType + ' and get Agreement to sign.');
  }

  showUserAgreement() {
    const byteCharacters = window.atob(this.rgpd.printableAgreement);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }

  revokeUserAgreement() {
    this.rgpdService.deleteUserAgreement().subscribe(() => {
      this.acceptedRgpd = false;
      this.showFileUpload = false;
      this.agreementType = '1';
    });
  }
}
