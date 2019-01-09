import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }      from './dashboard/dashboard.component';
import { TagsComponent }      from './tags/tags.component';
import { TagDetailComponent }      from './tag-detail/tag-detail.component';
import { DevicesComponent }      from './devices/devices.component';
import { DeviceDetailComponent }      from './device-detail/device-detail.component';
import { UsersComponent }      from './users/users.component';
import { UserDetailComponent }      from './user-detail/user-detail.component';
import { LocationsComponent }      from './locations/locations.component';
import { LocationDetailComponent }      from './location-detail/location-detail.component';
import { InventoryComponent }      from './inventory/inventory.component';
import { InventoryDetailComponent }      from './inventory-detail/inventory-detail.component';
import { JobsComponent }      from './jobs/jobs.component';
import { JobDetailComponent }      from './job-detail/job-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'device', component: DevicesComponent },
  { path: 'device/:id', component: DeviceDetailComponent },
  { path: 'tag', component: TagsComponent },
  { path: 'tag/:id', component: TagDetailComponent },
  { path: 'user', component: UsersComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'location', component: LocationsComponent },
  { path: 'location/:id', component: LocationDetailComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'inventory/:id', component: InventoryDetailComponent },
  { path: 'job', component: JobsComponent },
  { path: 'job/:id', component: JobDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
