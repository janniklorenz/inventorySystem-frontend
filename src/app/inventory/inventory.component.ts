import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { Tag } from '../tag';
import { User } from '../user';
import { FuseSearchDataSource } from '../fuseSearchDataSource';



class InventoryDataSource extends FuseSearchDataSource<Inventory> {
  searchKeys = [
    'description',
    'device.name', 'device.title', 'device.vendor', 'device.tags.name', 'device.description',
    'owners.firstName', 'owners.lastName'
  ];

  _filteredTags: Tag[] = [];
  set filteredTags(tags: Tag[]) {
    this._filteredTags = tags;
    this.filter = this.filter; // Trigger reload
  }

  _filteredUsers: User[] = [];
  set filteredUsers(users: User[]) {
    this._filteredUsers = users;
    this.filter = this.filter; // Trigger reload
  }

  _filterData(data: Inventory[]): Inventory[] {
    this.filteredData = data;
    this.filteredData = this._filteredTags == null ? this.filteredData : this.filteredData.filter(item => Tag.filter(item.device.tags, this._filteredTags));
    this.filteredData = this._filteredUsers == null ? this.filteredData : this.filteredData.filter(item => User.filter(item.owners, this._filteredUsers));
    super._filterData(this.filteredData);
    return this.filteredData;
  }
}



@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: InventoryDataSource;

  displayedColumns: string[] = ['shortDescription', 'name', 'vendor', "count", "owners", "tags", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private inventoryService: InventoryService
  ) { }

  ngOnInit() {
    this.getInventory();
  }

  navigate(item){
    this.router.navigate(['/inventory', item.id]);
  }
  navigateNew(){
    this.router.navigate(['/inventory/new']);
  }

  getInventory(): void {
    this.inventoryService.getInventory()
      .subscribe(inventory => {
        this.inventory = new InventoryDataSource(inventory);
        this.inventory.paginator = this.paginator;
        this.inventory.sort = this.sort;
      });
  }

  delete(item: Inventory): void {
    this.inventoryService.deleteItem(item).subscribe(_ => this.getInventory());
    event.stopPropagation();
  }

}
