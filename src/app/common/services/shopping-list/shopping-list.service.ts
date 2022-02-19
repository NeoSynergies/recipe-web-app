import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListElements: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(
    private http: HttpClient
  ) { }

  addValueToShoppingList(values: any, category: string): Observable<any> {
    // we assign the id if the element have it and if not we generate one
    let valueId: any = values.id ? values.id : this.generateId();
    return this.http.put('http://localhost:3000/' + category + '/' + valueId, {
      [valueId]: values
    })
      .pipe(
        tap(
          (values) => this.shoppingListElements.next({...this.shoppingListElements.getValue(), [valueId]: values[valueId]}),
          (err) => {
            console.log('El error');
            console.log(err);
            // ERROR HANDLING
          }
        )
      );
  }

  /*updateShoppingListProducts(): Observable<string> {

  }*/


  // id generator function, if we would need this in more places, we should create a public service
  private generateId(): string {
    return Math.random().toString(36).substr(2, 16); 
  }
}
