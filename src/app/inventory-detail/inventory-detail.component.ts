import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


import { DeviceService }  from '../device.service';
import { Device } from '../device';
import { InventoryService }  from '../inventory.service';
import { Inventory } from '../inventory';
import { User } from '../user';
import { DetailMode } from '../detailMode';
import { Instance } from '../instance';
import { Location } from '../location';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  item: Inventory;
  mode: DetailMode;
  DetailMode = DetailMode;

  numberOfNewInstances: number = 1;
  addInstances(count: number) {
    for (var i = 0; i < count; i++) {
      this.item.instances.push(new Instance());
    }
  }
  removeAllInstances() {
    this.item.instances = []
  }
  removeInstance(instance: Instance) {
    const index = this.item.instances.indexOf(instance, 0);
    if (index > -1) {
       this.item.instances.splice(index, 1);
    }
  }



  selectedNewOwner: User;
  addOwner() {
    if (this.selectedNewOwner != null) {
      this.item.owners.push(this.selectedNewOwner);
      this.selectedNewOwner = null;
    }
  }
  removeOwner(owner: User) {
    const index = this.item.owners.indexOf(owner, 0);
    if (index > -1) {
       this.item.owners.splice(index, 1);
    }
  }



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.getItem();
  }



  getItem(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.item = new Inventory();
      if (this.item.instances.length == 0) this.addInstances(1);
      this.mode = DetailMode.New;

      // Check if we have a device given as a parameter, if to, set it as selected
      const deviceJSON = this.route.snapshot.queryParams.device;
      if (deviceJSON != null) {
        this.item.device = JSON.parse(this.route.snapshot.queryParams.device);
      }
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.inventoryService.getItem(id)
        .subscribe(item => {
          if (item == null) return;
          this.item = item;
          this.mode = DetailMode.Edit;
        });
    }
  }



  goBack(): void {
    this.router.navigate(['/inventory']);
  }
  save(callback: () => void): void {
    this.addOwner();

    switch (this.mode) {
    case DetailMode.Edit:
      this.inventoryService.updateItem(this.item)
        .subscribe(() => callback());
      break;
    case DetailMode.New:
      const deviceID = this.item.device.id;
      this.inventoryService.addItem(this.item).subscribe(() => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/inventory/new']).then(() => this.getItem());
    });
  }

  delete(): void {
    this.inventoryService.deleteItem(this.item).subscribe(_ => this.goBack());
  }




  instancesSetStatus(status: string) {
    this.item.instances.forEach(instance => instance.status = status);
  }
  instancesSetLocation(location: Location) {
    this.item.instances.forEach(instance => instance.location = location);
  }
}
