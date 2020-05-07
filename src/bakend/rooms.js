import { Ajax as ApiQueued } from "../services/ajax.service";

const endpoint = `${process.env.VUE_APP_APISERVER}/rooms`;

class Rooms extends ApiQueued {
  constructor() {
    super(endpoint);
  }
}

export let rooms = new Rooms();
