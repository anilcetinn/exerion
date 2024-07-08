export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b2aa5a152mshb8767d005eeea32p1cd2c3jsn98b987723fee",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};
