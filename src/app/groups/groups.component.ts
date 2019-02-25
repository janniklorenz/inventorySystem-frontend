import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Group } from '../group';
import { GroupService } from '../group.service';
// import { Inventory } from '../inventory';



/** Flat node with expandable and level information */
// interface GroupNode {
//   expandable: boolean;
//   inventory: Inventory;
//   level: number;
// }





@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {








  // private transformer = (item: Inventory, level: number) => {
  //   return {
  //     expandable: !!item.children && item.children.length > 0,
  //     inventory: item,
  //     level: level,
  //   };
  // }
  //
  // treeControl = new FlatTreeControl<InventoryNode>(
  //     node => node.level, node => node.expandable);
  //
  // treeFlattener = new MatTreeFlattener(
  //     this.transformer, node => node.level, node => node.expandable, node => node.children);
  //
  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  //
  // hasChild = (_: number, node: InventoryNode) => node.expandable;


  // this.dataSource.data = inventory




  groups: MatTableDataSource<Group>
  displayedColumns: string[] = ['name', "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.getGroups();
  }

  navigate(group){
    this.router.navigate(['/group', group.id]);
  }

  navigateNew(){
    this.router.navigate(['/group/new']);
  }

  applyFilter(filterValue: string) {
    this.groups.filter = filterValue.trim().toLowerCase();
  }

  getGroups(): void {
    this.groupService.getGroups()
      .subscribe(groups => {
        this.groups = new MatTableDataSource(groups);
        this.groups.paginator = this.paginator;
        this.groups.sort = this.sort;
      });
  }

  delete(group: Group): void {
    this.groupService.deleteGroup(group).subscribe(group => this.getGroups());
    event.stopPropagation();
  }

}
