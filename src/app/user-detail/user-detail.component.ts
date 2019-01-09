import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService }  from '../user.service';
import { User } from '../user';
import { DetailMode } from '../detailMode';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  user: User;
  mode: DetailMode;
  DetailMode = DetailMode;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.user = new User();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.userService.getUser(id)
        .subscribe(user => this.user = user);
    }
  }

  goBack(): void {
    this.router.navigate(['/user']);
  }
  save(callback: () => void): void {
    switch (this.mode) {
    case DetailMode.Edit:
      this.userService.updateUser(this.user)
        .subscribe(() => callback());
      break;
    case DetailMode.New:
      this.userService.addUser(this.user)
        .subscribe(() => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/user/new']).then(() => this.getUser());
    });
  }

  delete(): void {
    this.userService.deleteUser(this.user).subscribe(_ => this.goBack());
  }
}
