import { Client } from "@hivechain/dhive";

const NODOS = [
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network"
];

export let client = new Client(NODOS);
