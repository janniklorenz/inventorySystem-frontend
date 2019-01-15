import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-select',
  templateUrl: './users-select.component.html',
  styleUrls: ['./users-select.component.scss']
})
export class UsersSelectComponent implements OnInit {

  users: User[];
  _selectedUsers: User[] = [];

  @Input()
  set selectedUsers(users: User[]) {
    this._selectedUsers = users;
  }
  @Output() selectedUsersChange = new EventEmitter<User[]>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this._selectedUsers = users.slice(0);;
        this.selectedUsersChange.emit(this._selectedUsers);
      });
  }

  onChange(event, user: User) {
    if (event.checked == false) {
      const index = this._selectedUsers.indexOf(user);
      this._selectedUsers.splice(index, 1);
    }
    else {
      this._selectedUsers.push(user);
    }
    this.selectedUsersChange.emit(this._selectedUsers);
  }

  selectAll() {
    this._selectedUsers = this.users.slice(0);
    this.selectedUsersChange.emit(this._selectedUsers);
  }

  deselectAll() {
    this._selectedUsers = [];
    this.selectedUsersChange.emit(this._selectedUsers);
  }

}
