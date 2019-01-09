import { Tag } from "./tag";

export class Device {
  id: number;
  name: string;
  title: string = "";
  vendor: string = "";
  description: string = "";
  tags: Tag[] = [];

  // Readonly
  all_instances_count: number;
}
