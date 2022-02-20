import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { SearchService } from 'src/app/common/services/search/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  @Output() search: EventEmitter<any> = new EventEmitter();
  @ViewChild('searchbar') searchbar: IonSearchbar; 
  constructor() { }

  onSearch(term) {
    this.searchbar.value = "";
    this.search.emit(term);
  }


}
