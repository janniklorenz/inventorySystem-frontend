import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-autoselect-tag',
  templateUrl: './autoselect-tag.component.html',
  styleUrls: ['./autoselect-tag.component.scss']
})
export class AutoselectTagComponent implements OnInit {

  @Input()
  set tag(tag: Tag) {
    this.autoselectControl.setValue(tag);
  }

  @Output() tagChange = new EventEmitter<Tag>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.loadTags();
  }

  autoselectControl = new FormControl();
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];

  loadTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags
      this.filteredTags = this.autoselectControl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterTags(state) : this.tags.slice())
      );
    });
  }

  private _filterTags(value: string | Tag): Tag[] {
    if (typeof value !== "string") return this.tags;
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag =>
      this.displayWithLabel(tag).toLowerCase().indexOf(filterValue) !== -1
    );
  }

  displayWithLabel(tag: Tag): string {
    if (tag == null) return "";
    return tag.name;
  }

  onChange(event) {
    this.tagChange.emit(event.option.value);
  }

}
