import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss']
})
export class TagsSelectComponent implements OnInit {

  tags: Tag[];
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
      .subscribe(tags => {
        tags.push(Tag.noTag);
        this.tags = tags;
        this._selectedTags = tags.slice(0);;
        this.selectedTagsChange.emit(this._selectedTags);
      });
  }

  onChange(event, tag: Tag) {
    if (event.checked == false) {
      const index = this._selectedTags.indexOf(tag);
      this._selectedTags.splice(index, 1);
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
