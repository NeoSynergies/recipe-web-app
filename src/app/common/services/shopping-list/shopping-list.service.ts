import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListElements: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) {
    this.getShoppingListIngredients();
  }


  // get the ingredients and put them on the shopping list behavior subject
  getShoppingListIngredients(): void {
    this.http.get('http://localhost:3000/ingredients')
      .subscribe((ingredients) => this.shoppingListElements.next(ingredients));
  }

  addElementToShoppingList(values: any, category: string): Observable<any> {
    // we assign the id if the element have it and if not we generate one
    let valueId: any = values.id ? values.id : this.generateId();
    values.id = valueId;
    values.category = category;
    
    return this.http.put('http://localhost:3000/' + category + '/' + valueId, values)
      .pipe(
        tap(
          (values) => this.shoppingListElements.next([...this.shoppingListElements.getValue(), values]),
          (err) => {
            console.log('El error');
            console.log(err);
            // ERROR HANDLING
          }
        )
      );
  }

  deleteShoppingListElements(values: any): Observable<any> {
    return this.http.delete('http://localhost:3000/' + values.category + '/' + values.id)
      .pipe(
        tap(() => {
          let newleements = [...this.shoppingListElements.getValue()];
          let newBehaviorSubjectValues = newleements.filter(element => element.id !== values.id);
          this.shoppingListElements.next(newBehaviorSubjectValues);
        })
      );
  }

  // id generator function, if we would need this in more places, we should create a public service
  private generateId(): string {
    return Math.random().toString(36).substr(2, 16); 
  }
}
