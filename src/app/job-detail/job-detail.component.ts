import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { JobService }  from '../job.service';
import { Job } from '../job';
import { DetailMode } from '../detailMode';
import { Event } from '../event';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  job: Job;
  mode: DetailMode;
  DetailMode = DetailMode;

  selectedNewEventName: string;
  addEvent() {
    if (this.selectedNewEventName != null && this.selectedNewEventName != "") {
      const newEvent = {name: this.selectedNewEventName} as Event;
      this.job.events.push(newEvent);
      this.selectedNewEventName = null;
    }
  }
  removeEvent(event: Event) {
    const index = this.job.events.indexOf(event, 0);
    if (index > -1) {
       this.job.events.splice(index, 1);
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getJob();
  }

  getJob(): void {
    if (this.route.snapshot.paramMap.get('id') == "new") {
      this.job = new Job();
      this.mode = DetailMode.New;
    }
    else {
      const id = +this.route.snapshot.paramMap.get('id');
      this.mode = DetailMode.Edit;
      this.jobService.getJob(id)
        .subscribe(job => this.job = job);
    }
  }

  goBack(): void {
    this.router.navigate(['/job']);
  }

  save(callback: () => void): void {
    switch (this.mode) {
    case DetailMode.Edit:
      this.jobService.updateJob(this.job).subscribe(job => callback());
      break;
    case DetailMode.New:
      this.jobService.addJob(this.job).subscribe(job => callback());
      break;
    }
  }
  saveAndExit(): void {
    this.save(() => this.goBack());
  }
  saveAndNew(): void {
    this.save(() => {
      this.router.navigate(['/job/new']).then(() => this.getJob());
    });
  }

  delete(): void {
    this.jobService.deleteJob(this.job).subscribe(_ => this.goBack());
  }

}
