import { Device } from "./device"
import { User } from "./user"
import { Instance } from "./instance"

export class Inventory {
  id: number;
  name: string = "";
  deviceID: number;
  device: Device;
  owners: User[] = [];
  instances: Instance[] = [];
  parentID: number;
  parent: Inventory;
  children: Inventory[] = [];

  // Readonly
  instances_count: number;
}
