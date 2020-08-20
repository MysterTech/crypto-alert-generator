const axios = require("axios");
const jsdom = require("jsdom");

const INSTRUMENT_URL = process.env.INSTRUMENT_URL;


try {
  const response = async () =>
    await axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
  const dom = jsdom.
} catch (error) {
  console.log(error);
}
