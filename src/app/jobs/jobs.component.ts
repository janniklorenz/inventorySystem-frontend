import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: MatTableDataSource<Job>

  displayedColumns: string[] = ['name', "location", "actions"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private jobService: JobService,
  ) { }

  ngOnInit() {
    this.getJobs();
  }

  navigate(job){
    this.router.navigate(['/job', job.id]);
  }

  navigateNew(){
    this.router.navigate(['/job/new']);
  }

  applyFilter(filterValue: string) {
    this.jobs.filter = filterValue.trim().toLowerCase();
  }

  getJobs(): void {
    this.jobService.getJobs()
      .subscribe(jobs => {
        this.jobs = new MatTableDataSource(jobs);
        this.jobs.paginator = this.paginator;
        this.jobs.sort = this.sort;
      });
  }

  delete(job: Job): void {
    this.jobService.deleteJob(job).subscribe(_ => this.getJobs());
    event.stopPropagation();
  }

}
