const toJson = async (res) => {
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

export const getLatlng = async (address) => {
  const resp = await fetch(
    `https://geocording-spi.herokuapp.com/search?address=${address}`,
    {
      method: "GET",
      credentials: "same-origin",
    }
  );
  const json = await toJson(resp);
  return json.location;
  // return await toJson(resp);
};
