import { Device } from "./device"
import { User } from "./user"
import { Instance } from "./instance"

export class Inventory {
  id: number;
  deviceID: number;
  device: Device;
  owners: User[] = [];
  instances: Instance[] = [];

  // Readonly
  instances_count: number;
}
