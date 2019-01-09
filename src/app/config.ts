import { environment } from '../environments/environment';

var Config = {
  api_url: "",
}

// Overwrite for dev
if(environment.production == false) {
  Config.api_url = "http://127.0.0.1:63828";
}

export { Config }
