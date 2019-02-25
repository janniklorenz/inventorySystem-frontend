import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Group } from '../../group';
import { GroupService } from '../../group.service';

import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

@Component({
  selector: 'app-autoselect-group',
  templateUrl: './autoselect-group.component.html',
  styleUrls: []
})
export class AutoselectGroupComponent implements OnInit {

  @Input()
  set group(group: Group) {
    this.autoselectControl.setValue(group);
  }

  @Output() groupChange = new EventEmitter<Group>();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.loadGroups();
  }

  autoselectControl = new FormControl();
  filteredGroups: Observable<Group[]>;
  groups: Group[] = [];

  loadGroups(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups
      this.filteredGroups = this.autoselectControl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterGroups(state) : this.groups.slice())
      );
    });
  }

  private _filterGroups(value: string | Group): Group[] {
    if (typeof value !== "string") return this.groups;
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
      keys: ['name']
    } as FuseOptions<Group>;
    var fuse = new Fuse(this.groups, options)

    return fuse.search(filterValue);
  }

  displayWithLabel(item: Group): string {
    return item.name;
  }

  onChange(event) {
    this.groupChange.emit(event.option.value);
  }

}
