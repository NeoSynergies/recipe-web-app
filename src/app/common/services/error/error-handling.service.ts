import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private alertCtrl: AlertController
  ) { }
 
  returnErrorAndShowModal(message?: string): Observable<any> { 
    this.showErrorModal(message);
    return of([]); // we return an observable because we use it in pipes of another observables
  }

  private async showErrorModal(message?: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error happened',
      message: message ? message : 'Try to reload the web',
      buttons: ['OK']
    });
    alert.present();
  }
}
