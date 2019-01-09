import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-autoselect-user',
  templateUrl: './autoselect-user.component.html',
  styleUrls: ['./autoselect-user.component.scss']
})
export class AutoselectUserComponent implements OnInit {

  @Input()
  set user(user: User) {
    this.autoselectControl.setValue(user);
  }

  @Output() userChange = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  autoselectControl = new FormControl();
  filteredUsers: Observable<User[]>;
  users: User[] = [];

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users
      this.filteredUsers = this.autoselectControl.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterUsers(state) : this.users.slice())
      );
    });
  }

  private _filterUsers(value: string | User): User[] {
    if (typeof value !== "string") return this.users;
    const filterValue = value.toLowerCase();
    return this.users.filter(user => {
      return this.displayWithLabel(user).toLowerCase().indexOf(filterValue) !== -1
    });
  }

  displayWithLabel(user: User): string {
    if (user == null) return "";
    return user.firstName + " " + user.lastName;
  }

  onChange(event) {
    this.userChange.emit(event.option.value);
  }
}
