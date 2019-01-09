import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: MatTableDataSource<Device>;

  displayedColumns: string[] = ['shortDescription', 'name', "vendor", "count", "tags", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.getDevices();
  }

  navigate(device){
    this.router.navigate(['/device', device.id]);
  }

  navigateNew(){
    this.router.navigate(['/device/new']);
  }

  applyFilter(filterValue: string) {
    this.devices.filter = filterValue.trim().toLowerCase();
  }

  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => {
        this.devices = new MatTableDataSource(devices);
        this.devices.paginator = this.paginator;
        this.devices.sort = this.sort;
        this.devices.filterPredicate =
          (device: Device, filter: string) => {
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
              keys: ['name', 'title', 'vendor', 'tags.name', 'description']
            } as FuseOptions<Device>;
            var fuse = new Fuse([device], options)
            return fuse.search(filter).length != 0;
          };
        });
  }

  delete(device: Device): void {
    this.deviceService.deleteDevice(device).subscribe(_ => this.getDevices());
    event.stopPropagation();
  }

}
