import { Component, Input } from '@angular/core';

import { Tag } from '../tag';

@Component({
  selector: 'app-tag-span',
  templateUrl: './tag-span.component.html',
  styleUrls: ['./tag-span.component.scss']
})
export class TagSpanComponent {

  @Input() tag: Tag;

  constructor() { }
}
