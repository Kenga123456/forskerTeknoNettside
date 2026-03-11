import fetch from "node-fetch";
import fs from "fs";

async function login() {
  const res = await fetch(
    "https://api.tilsig.com/v1/authentication/authenticate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.TILSIG_USER,
        password: process.env.TILSIG_PASS,
      }),
    },
  );

  const data = await res.json();
  return data.token;
}

async function main() {
  const token = await login();
  const res = await fetch(
    "https://api.tilsig.com/api/v1/media/image/by-sensor-id/11813?sensorId=11813",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await res.json();

  for (const img of data) {
    const imageRes = await fetch(img.url);
    const buffer = await imageRes.arrayBuffer();
    const filename = img.timestamp.replace(/[:]/g, "-") + ".jpg";
    fs.writeFileSync("telenor/images/" + filename, Buffer.from(buffer));
    console.log("Saved", filename);
  }
}

main();
