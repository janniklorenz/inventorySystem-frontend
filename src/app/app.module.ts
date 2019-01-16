import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatChipsModule} from "@angular/material/chips";

import { MccColorPickerModule } from 'material-community-components';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxMdModule } from 'ngx-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TagsComponent } from './tags/tags.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { TagSpanComponent } from './tag-span/tag-span.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

import { AutoselectUserComponent } from './autoselect/user/autoselect-user.component';
import { AutoselectTagComponent } from './autoselect/tag/autoselect-tag.component';
import { AutoselectLocationComponent } from './autoselect/location/autoselect-location.component';
import { AutoselectDeviceComponent } from './autoselect/device/autoselect-device.component';
import { AutoselectStatusComponent } from './autoselect/status/autoselect-status.component';
import { TagsSelectComponent } from './tags-select/tags-select.component';
import { UsersSelectComponent } from './users-select/users-select.component';

import { RequestCacheService } from './request-cache.service';
import { CachingInterceptorService } from './caching-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    TagDetailComponent,
    DevicesComponent,
    DeviceDetailComponent,
    DashboardComponent,
    UsersComponent,
    UserDetailComponent,
    LocationsComponent,
    LocationDetailComponent,
    InventoryComponent,
    InventoryDetailComponent,
    ColorPickerComponent,
    AutoselectUserComponent,
    AutoselectTagComponent,
    TagSpanComponent,
    JobsComponent,
    JobDetailComponent,
    AutoselectLocationComponent,
    AutoselectDeviceComponent,
    AutoselectStatusComponent,
    TagsSelectComponent,
    UsersSelectComponent
  ],
  imports: [
    NgbModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,

    HttpClientModule,
    BrowserAnimationsModule, /*NoopAnimationsModule*/

    MatButtonModule, MatCheckboxModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatMenuModule, MatToolbarModule,
    MatFormFieldModule, MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatNativeDateModule,
    MatExpansionModule, MatListModule, MatCardModule,
    FlexLayoutModule, MatIconModule, MatTabsModule, MatChipsModule,

    MccColorPickerModule,
    QRCodeModule,
    NgxMdModule.forRoot(),
  ],
  providers: [
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
