import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location as BrowserLocation } from '@angular/common';

import { LocationService }  from '../location.service';
import { Location } from '../location';
import { DetailMode } from '../detailMode';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.sass']
})
export class LocationDetailComponent implements OnInit {

  location: Location;
  mode: DetailMode;
  DetailMode = DetailMode;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private browserLocation: BrowserLocation
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.location = new Location();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.locationService.getLocation(id)
        .subscribe(location => this.location = location);
    }
  }

  goBack(): void {
    this.router.navigate(['/location']);
  }
  save(callback: () => void): void {
    switch (this.mode) {
    case DetailMode.Edit:
      this.locationService.updateLocation(this.location)
        .subscribe(() => callback());
      break;
    case DetailMode.New:
      this.locationService.addLocation(this.location)
        .subscribe(() => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/location/new']).then(() => this.getLocation());
    });
  }
  delete(): void {
    this.locationService.deleteLocation(this.location).subscribe(_ => this.goBack());
  }
}
