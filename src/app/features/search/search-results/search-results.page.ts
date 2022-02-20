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
  filteredResults;
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

    // if there are no items for that search it will open the error alert but that won't happen with a real backend
    return this.searchService.globalSearch(term)
      .pipe(delay(500))
      .subscribe(result => {
        this.filteredResults = result;
        this.loading = false;
      });
  }


}
