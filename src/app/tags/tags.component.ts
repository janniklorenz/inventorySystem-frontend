import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Tag } from '../tag';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  // tags: Tag[];
  tags: MatTableDataSource<Tag>
  displayedColumns: string[] = ['name', "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  navigate(tag){
    this.router.navigate(['/tag', tag.id]);
  }

  navigateNew(){
    this.router.navigate(['/tag/new']);
  }

  applyFilter(filterValue: string) {
    this.tags.filter = filterValue.trim().toLowerCase();
  }

  getTags(): void {
    this.tagService.getTags()
      .subscribe(tags => {
        this.tags = new MatTableDataSource(tags);
        this.tags.paginator = this.paginator;
        this.tags.sort = this.sort;
      });
  }

  delete(tag: Tag): void {
    this.tagService.deleteTag(tag).subscribe(tag => this.getTags());
    event.stopPropagation();
  }

}
