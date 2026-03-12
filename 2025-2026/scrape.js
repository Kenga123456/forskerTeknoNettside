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

  const SENSOR_ID = 11810;

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

  const from = sevenDaysAgo.toISOString();
  const to = now.toISOString();

  const tempRes = await fetch(
    `https://api.tilsig.com/GET v1/measurement/raw?sensorId=${SENSOR_ID}&from=${from}&to=${to}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!tempRes.ok) {
    const errorText = await tempRes.text();
    throw new Error(
      `Failed to fetch temp data: ${tempRes.status} ${tempRes.statusText}\n${errorText}`,
    );
  }

  const tempData = await tempRes.json();
  console.log(tempData.length);
  fs.writeFileSync(
    "2025-2026/tempdata.json",
    JSON.stringify(tempData, null, 2),
  );
}

main();
