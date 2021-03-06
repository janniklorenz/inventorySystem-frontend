import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-select',
  templateUrl: './users-select.component.html',
  styleUrls: ['./users-select.component.scss']
})
export class UsersSelectComponent implements OnInit {

  users: User[] = [];
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
      .subscribe(data => {
        var users = data.slice(0);
        users.push(User.noOwners());
        this.users = users;
        if (this._selectedUsers == null) {
          this._selectedUsers = users.slice(0);
          this.selectedUsersChange.emit(this._selectedUsers);
        }
      });
  }

  isChecked(user: User) {
    return this._selectedUsers.filter(u => u.id == user.id).length > 0;
  }

  onChange(event, user: User) {
    if (event.checked == false) {
      const toRemove = this._selectedUsers.filter(u => u.id == user.id);
      toRemove.forEach(user => {
        const index = this._selectedUsers.indexOf(user);
        if (index != -1) {
          this._selectedUsers.splice(index, 1);
        }
      });
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
