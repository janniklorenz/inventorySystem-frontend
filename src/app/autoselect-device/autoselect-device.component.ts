import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Device } from '../device';
import { DeviceService } from '../device.service';

import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

@Component({
  selector: 'app-autoselect-device',
  templateUrl: './autoselect-device.component.html',
  styleUrls: ['./autoselect-device.component.scss']
})
export class AutoselectDeviceComponent implements OnInit {

  @Input()
  set device(device: Device) {
    this.autoselectControl.setValue(device);
  }

  @Output() deviceChange = new EventEmitter<Device>();

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.loadDevices();
  }

  autoselectControl = new FormControl();
  filteredDevices: Observable<Device[]>;
  devices: Device[] = [];

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices
      this.filteredDevices = this.autoselectControl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterDevices(state) : this.devices.slice())
      );
    });
  }

  private _filterDevices(value: string | Device): Device[] {
    if (typeof value !== "string") return this.devices;
    const filterValue = value.toLowerCase();

    var options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: false,
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'title', 'vendor', 'tags.name', 'description']
    } as FuseOptions<Device>;
    var fuse = new Fuse(this.devices, options)

    return fuse.search(filterValue);
  }

  displayWithLabel(device: Device): string {
    if (device == null) return "";
    return device.title + " (" + device.vendor + " " + device.name + ")";
  }

  onChange(event) {
    this.deviceChange.emit(event.option.value);
  }

}
