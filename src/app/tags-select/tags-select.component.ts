import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Tag } from '../tag';
import { TagService } from '../tag.service';



@Component({
  selector: 'app-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss']
})
export class TagsSelectComponent implements OnInit {

  tags: Tag[] = [];
  _selectedTags: Tag[] = [];

  @Input()
  set selectedTags(tags: Tag[]) {
    this._selectedTags = tags;
  }
  @Output() selectedTagsChange = new EventEmitter<Tag[]>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getTags()
      .subscribe(data => {
        var tags = data.slice(0);
        tags.push(Tag.noTag());
        this.tags = tags;
        if (this._selectedTags == null) {
          this._selectedTags = tags.slice(0);
          this.selectedTagsChange.emit(this._selectedTags);
        }
      });
  }

  isChecked(tag: Tag) {
    return this._selectedTags.filter(t => t.id == tag.id).length > 0;
  }

  onChange(event, tag: Tag) {
    if (event.checked == false) {
      const toRemove = this._selectedTags.filter(t => t.id == tag.id);
      toRemove.forEach(tag => {
        const index = this._selectedTags.indexOf(tag);
        if (index != -1) {
          this._selectedTags.splice(index, 1);
        }
      });
    }
    else {
      this._selectedTags.push(tag);
    }
    this.selectedTagsChange.emit(this._selectedTags);
  }

  selectAll() {
    this._selectedTags = this.tags.slice(0);
    this.selectedTagsChange.emit(this._selectedTags);
  }

  deselectAll() {
    this._selectedTags = [];
    this.selectedTagsChange.emit(this._selectedTags);
  }

}
