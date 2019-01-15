import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Device } from '../device';
import { DeviceService } from '../device.service';
import { Tag } from '../tag';
import { FuseSearchDataSource } from '../fuseSearchDataSource';



class DevicesDataSource extends FuseSearchDataSource<Device> {
  searchKeys = ['name', 'title', 'vendor', 'tags.name', 'description'];

  constructor(data: Device[]) {
    super(data);
    this.loadFromSession();
  }

  _filteredTags: Tag[];
  set filteredTags(tags: Tag[]) {
    this._filteredTags = tags;
    this.filter = this.filter; // Trigger reload
    this.saveToSession();
  }
  get filteredTags() {
    return this._filteredTags;
  }

  _filterData(data: Device[]): Device[] {
    this.filteredData = this._filteredTags == null ? data : data.filter(device => Tag.filter(device.tags, this._filteredTags));
    super._filterData(this.filteredData);
    return this.filteredData;
  }

  saveToSession() {
    sessionStorage.filter_tags = JSON.stringify(this._filteredTags);
  }
  loadFromSession() {
    try {
      this._filteredTags = JSON.parse(sessionStorage.filter_tags);
    }
    catch(e) { }
  }
}



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: DevicesDataSource;

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

  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(devices => {
        this.devices = new DevicesDataSource(devices);
        this.devices.paginator = this.paginator;
        this.devices.sort = this.sort;
      });
  }

  delete(device: Device): void {
    this.deviceService.deleteDevice(device).subscribe(_ => this.getDevices());
    event.stopPropagation();
  }

}
