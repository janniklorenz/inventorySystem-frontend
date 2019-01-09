import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  users: MatTableDataSource<User>
  displayedColumns: string[] = ['firstName', "lastName", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  navigate(user){
    this.router.navigate(['/user', user.id]);
  }

  navigateNew(){
    this.router.navigate(['/user/new']);
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = new MatTableDataSource(users);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
      });
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (!firstName || !lastName) { return; }
    this.userService.addUser({ firstName, lastName } as User)
      .subscribe(user => this.getUsers());
  }

  delete(user: User): void {
    this.userService.deleteUser(user).subscribe(user => { this.getUsers(); });
    event.stopPropagation();
  }

}
