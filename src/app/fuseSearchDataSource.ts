import { MatTableDataSource } from '@angular/material';

import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

export class FuseSearchDataSource<T> extends MatTableDataSource<T> {

  public searchKeys: string[] = [];

  _filterData(data: T[]): T[] {
    var options = {
      shouldSort: false,
      tokenize: true,
      matchAllTokens: true,
      findAllMatches: false,
      threshold: 0.3,
      location: 0,
      distance: 4,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: this.searchKeys,
    } as FuseOptions<T>;
    var fuse = new Fuse(data, options)

    this.filteredData = !this.filter ? data : fuse.search(this.filter.trim().toLowerCase())
    if (this.paginator) { this._updatePaginator(this.filteredData.length); }
    return this.filteredData;
  }
}
