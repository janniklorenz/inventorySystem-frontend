import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-autoselect-location',
  templateUrl: './autoselect-location.component.html',
  styleUrls: ['./autoselect-location.component.scss']
})
export class AutoselectLocationComponent implements OnInit {

  @Input()
  set location(location: Location) {
    this.autoselectControl.setValue(location);
  }

  @Output() locationChange = new EventEmitter<Location>();

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.loadLocations();
  }

  autoselectControl = new FormControl();
  filteredLocations: Observable<Location[]>;
  locations: Location[] = [];

  loadLocations(): void {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations
      this.filteredLocations = this.autoselectControl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterLocations(state) : this.locations.slice())
      );
    });
  }

  private _filterLocations(value: string | Location): Location[] {
    if (typeof value !== "string") return this.locations;
    const filterValue = value.toLowerCase();
    return this.locations.filter(location => {
      return this.displayWithLabel(location).toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  displayWithLabel(location: Location): string {
    if (location == null) return "";
    return location.name;
  }

  onChange(event) {
    this.locationChange.emit(event.option.value);
  }

}
