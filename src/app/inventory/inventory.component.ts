import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import * as Fuse from 'fuse.js'
import FuseOptions = Fuse.FuseOptions;

import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventory: MatTableDataSource<Inventory>;

  displayedColumns: string[] = ['shortDescription', 'name', 'vendor', "count", "owners", "actions"];

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

  applyFilter(filterValue: string) {
    this.inventory.filter = filterValue.trim().toLowerCase();
  }

  getInventory(): void {
    this.inventoryService.getInventory()
      .subscribe(inventory => {
        this.inventory = new MatTableDataSource(inventory);
        this.inventory.paginator = this.paginator;
        this.inventory.sort = this.sort;


        this.inventory.filterPredicate =
          (inventory: Inventory, filter: string) => {
            var options = {
              shouldSort: false,
              tokenize: true,
              matchAllTokens: true,
              findAllMatches: false,
              threshold: 0.3,
              location: 0,
              distance: 4,
              maxPatternLength: 32,
              minMatchCharLength: 1,
              keys: [
                'description',
                'device.name', 'device.title', 'device.vendor', 'device.tags.name', 'device.description',
                'owners.firstName', 'owners.lastName'
              ]
            } as unknown as FuseOptions<Inventory>;
            var fuse = new Fuse([inventory], options)
            return fuse.search(filter).length != 0;
          };
        });
  }

  delete(item: Inventory): void {
    this.inventoryService.deleteItem(item).subscribe(_ => this.getInventory());
    event.stopPropagation();
  }

}
