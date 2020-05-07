import { Ajax as ApiQueued } from "../services/ajax.service";

const endpoint = `${process.env.VUE_APP_APISERVER}/directory`;

class Directory extends ApiQueued {
  constructor() {
    super(endpoint);
  }
}

export let directory = new Directory();
