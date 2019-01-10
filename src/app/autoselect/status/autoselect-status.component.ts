import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autoselect-status',
  templateUrl: './autoselect-status.component.html',
  styleUrls: []
})
export class AutoselectStatusComponent {

  @Input()
  set status(status: String) {
    this.autoselectControl.setValue(status);
  }

  @Output() statusChange = new EventEmitter<string>();

  constructor() {
    this.filteredOptions = this.autoselectControl.valueChanges.pipe(
      startWith(''),
      map(state => state ? this._filterTags(state) : this.options.slice())
    );
  }


  autoselectControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] = ["OK", "Defekt", "Privat in Gebrauch"];

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      return option.toLowerCase().indexOf(filterValue) !== -1
    });
  }

  onChange(event) {
    this.statusChange.emit(event.option.value);
  }
}
