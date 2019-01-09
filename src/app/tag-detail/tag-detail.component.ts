import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TagService }  from '../tag.service';
import { Tag } from '../tag';
import { DetailMode } from '../detailMode';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {

  tag: Tag;
  mode: DetailMode;
  DetailMode = DetailMode;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tagService: TagService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getTag();
  }

  getTag(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.tag = new Tag();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.tagService.getTag(id)
        .subscribe(tag => this.tag = tag);
    }
  }

  goBack(): void {
    this.router.navigate(['/tag']);
  }
  save(callback: () => void): void {
    switch (this.mode) {
      case DetailMode.Edit:
      this.tagService.updateTag(this.tag).subscribe(() => callback());
      break;
      case DetailMode.New:
      this.tagService.addTag(this.tag).subscribe(() => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/tag/new']).then(() => this.getTag());
    });
  }

  delete(): void {
    this.tagService.deleteTag(this.tag).subscribe(_ => this.goBack());
  }
}
