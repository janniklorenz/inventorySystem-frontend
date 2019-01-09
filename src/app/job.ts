import { Event } from './event';

export class Job {
  id: number;
  name: string;
  events: Event[] = [];
  description: string = "";
}
