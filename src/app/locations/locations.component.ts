import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Location } from '../location';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.sass']
})
export class LocationsComponent implements OnInit {

  locations: MatTableDataSource<Location>;
  displayedColumns: string[] = ['name', "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.getLocations();
  }

  navigate(location){
    this.router.navigate(['/location', location.id]);
  }

  navigateNew(){
    this.router.navigate(['/location/new']);
  }

  applyFilter(filterValue: string) {
    this.locations.filter = filterValue.trim().toLowerCase();
  }

  getLocations(): void {
    this.locationService.getLocations()
      .subscribe(locations => {
        this.locations = new MatTableDataSource(locations);
        this.locations.paginator = this.paginator;
        this.locations.sort = this.sort;
      });
  }

  delete(location: Location): void {
    this.locationService.deleteLocation(location).subscribe(location => this.getLocations());
    event.stopPropagation();
  }

}
