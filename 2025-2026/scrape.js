import fetch from "node-fetch";
import fs from "fs";

const folder = "telenor-images";

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
} else {
  const files = fs.readdirSync(folder);
  for (const file of files) {
    fs.unlinkSync(`${folder}/${file}`);
  }
}

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

  for (let i = 0; i < data.length; i++) {
    const img = data[i];
    const imageRes = await fetch(img.url);
    const buffer = await imageRes.arrayBuffer();
    const filename = `${i}.jpg`; // just 0.jpg, 1.jpg, 2.jpg...
    fs.writeFileSync("telenor-images/" + filename, Buffer.from(buffer));
    console.log("Saved", filename);
  }
  const tempRes = await fetch(
    "https://api.tilsig.com/v1/dataseries/by-dataseries-id/11810",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const tempData = await tempRes.json();
  console.log(tempData.length);
  fs.writeFileSync(
    "2025-2026/tempdata.json",
    JSON.stringify(tempData, null, 2),
  );
}

main();
