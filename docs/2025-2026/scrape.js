const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    console.log(`Fetched from network: ${url}`);
    return data;
  } catch (error) {
    console.error("Error fetching the HTML:", error);
    throw error;
  }
}

function extractImages(html) {
  const $ = cheerio.load(html);
  const images = [];

  $("img").each((index, element) => {
    const src = $(element).attr("src");
    if (src) images.push(src);
  });

  return images;
}

const jsonFilePath = path.join(__dirname, "bilder.json");

function saveToJSON(data) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2)); //
  console.log(`Data saved to products.json`);
}

(async () => {
  const baseURL =
    "http://sandkasse-bucket.s3-website-eu-west-1.amazonaws.com/SFHS/";

  try {
    const html = await fetchHTML(baseURL);
    const images = extractImages(html);
    saveToJSON(images);
  } catch (error) {
    console.error("Failed to scrape images:", error);
  }
})();
