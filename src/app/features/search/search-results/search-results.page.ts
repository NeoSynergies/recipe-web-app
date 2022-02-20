import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/common/services/search/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  filteredResults = {
    ingredients: [],
    recipes: []
  };
  searchTerm: string;
  loading: boolean = false;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.searchTerm = params.searchTerm;
        this.onSearch(params.searchTerm);
      });
  }

  // typically you would
  onSearch(event) {
    this.loading = true;
    const term = event.replace(/[^A-Za-z0-9\s!?]/g,'').toLowerCase();

    return this.searchService.globalSearch(term)
      .pipe(delay(500))
      .subscribe(result => {
        // FILTERING BASIC FUNCTION
        // regex the element text -> check if text have the term
        this.filteredResults = {
          ingredients: result.ingredients.filter(element => this.regexString(element.label).includes(term)),
          recipes: result.recipes.filter(element => this.regexString(element.title).includes(term))
        };

        this.loading = false;
      });
  }
  
  // this function delete commas, dots, and set all the characters to lower case
  private regexString(text: string): string {
    return text.replace(/[^A-Za-z0-9\s!?]/g,'').toLowerCase();
  }

}
