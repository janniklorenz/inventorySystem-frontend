import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { GroupService }  from '../group.service';
import { Group } from '../group';
import { DetailMode } from '../detailMode';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group;
  mode: DetailMode;
  DetailMode = DetailMode;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGroup();
  }

  getGroup(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.group = new Group();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.groupService.getGroup(id)
        .subscribe(group => this.group = group);
    }
  }

  goBack(): void {
    this.router.navigate(['/group']);
  }
  save(callback: () => void): void {
    switch (this.mode) {
      case DetailMode.Edit:
      this.groupService.updateGroup(this.group).subscribe(() => callback());
      break;
      case DetailMode.New:
      this.groupService.addGroup(this.group).subscribe(() => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/group/new']).then(() => this.getGroup());
    });
  }

  delete(): void {
    this.groupService.deleteGroup(this.group).subscribe(_ => this.goBack());
  }
}
