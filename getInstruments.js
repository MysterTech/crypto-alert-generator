require("dotenv").config();
const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");

const { JSDOM } = jsdom;
const INSTRUMENT_URL = process.env.INSTRUMENT_URL;
const INSTRUMENTS_FILENAME = process.env.INSTRUMENTS_FILENAME;
var instruments = [];

module.exports.getJson = async () => {
  try {
    const response = await axios.get(INSTRUMENT_URL);
    const { document } = new JSDOM(response.data).window;
    const parent = document.querySelectorAll(".text-primary");
    parent.forEach((element) => {
      let href = element.getAttribute("href");
      let name = element.innerHTML;

      let address = href.split("/")[2];
      let symbol = name.includes("(") ? name.split("(")[1].split(")")[0] : name;
      let instrument = {
        symbol: symbol,
        address: address,
      };
      instruments.push(instrument);
    });
    fs.writeFile(INSTRUMENTS_FILENAME, JSON.stringify(instruments), (err) => {
      if (err) {
        throw err;
      }
      console.log("instruments list created");
    });
    return instruments;
  } catch (error) {
    console.log(error);
  }
};
