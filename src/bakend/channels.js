import { Ajax as ApiQueued } from "../services/ajax.service";

const endpoint = `${process.env.VUE_APP_APISERVER}/channels`;

class Channels extends ApiQueued {
  constructor() {
    super(endpoint);
  }
}

export let channels = new Channels();
