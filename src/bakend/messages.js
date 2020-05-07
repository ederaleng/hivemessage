import { Ajax as ApiQueued } from "../services/ajax.service";

const endpoint = `${process.env.VUE_APP_APISERVER}/messages`;

class Messages extends ApiQueued {
  constructor() {
    super(endpoint);
  }
}

export let messages = new Messages();
