export let tryParse = json => {
  console.log("json:",json)
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log("Error trying to parse JSON: " + json);
    return null;
  }
};
