import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { DeviceService }  from '../device.service';
import { Device } from '../device';
import { DetailMode } from '../detailMode';
import { Tag } from '../tag';
import { Inventory } from '../inventory';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {

  device: Device;
  mode: DetailMode;
  DetailMode = DetailMode;

  selectedNewTag: Tag;
  addTag() {
    if (this.selectedNewTag != null) {
      this.device.tags.push(this.selectedNewTag);
      this.selectedNewTag = null;
    }
  }
  removeTag(tag: Tag) {
    const index = this.device.tags.indexOf(tag, 0);
    if (index > -1) {
       this.device.tags.splice(index, 1);
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getDevice();
  }

  getDevice(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.device = new Device();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.deviceService.getDevice(id)
        .subscribe(device => this.device = device);
    }
  }

  goBack(): void {
    this.router.navigate(['/device']);
  }

  navigateInventory(inventory: Inventory) {
    this.router.navigate(['/inventory', inventory.id]);
  }


  save(callback: (device: Device) => void): void {
    this.addTag();
    switch (this.mode) {
    case DetailMode.Edit:
      this.deviceService.updateDevice(this.device).subscribe(device => callback(device));
      break;
    case DetailMode.New:
      this.deviceService.addDevice(this.device).subscribe(device => callback(device));
      break;
    }
  }
  saveAndExit(): void {
    this.save((_) => this.goBack());
  }
  saveAndNew(): void {
    this.save((_) => {
      this.router.navigate(['/device/new']).then(() => this.getDevice());
    });
  }
  saveAndInventory(): void {
    this.save((device) => {
      this.router.navigate(['/inventory/new'], {queryParams: {device: JSON.stringify(device)}})
    });
  }

  delete(): void {
    this.deviceService.deleteDevice(this.device).subscribe(_ => this.goBack());
  }
}
