const water = document.querySelector(".water")
const p = document.querySelector(".level-readout")

const url = "https://wclmqkbxosoxgmcwpszl.supabase.co"
const key = "sb_publishable_TMQmjjABMIb76u75cBgOTg_1Se0UdOK"

const relativeTime = new Intl.RelativeTimeFormat("nb", { numeric: "auto" })

function formatTimeAgo(isoString) {
    const then = new Date(isoString).getTime()
    if (Number.isNaN(then)) return ""

    let seconds = Math.round((then - Date.now()) / 1000)
    const units = [
        ["year", 60 * 60 * 24 * 365],
        ["month", 60 * 60 * 24 * 30],
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60],
        ["second", 1],
    ]

    for (const [unit, unitSeconds] of units) {
        if (Math.abs(seconds) >= unitSeconds || unit === "second") {
            return relativeTime.format(Math.round(seconds / unitSeconds), unit)
        }
    }

    return relativeTime.format(0, "second")
}

function showLevel(volume, measuredAt) {
    water.style.height = volume / 10 + "%"

    let html = volume + " L / 1000 L"
    if (measuredAt) {
        const ago = formatTimeAgo(measuredAt)
        if (ago) {
            html += `<span class="level-readout-age">Målt ${ago}</span>`
        }
    }
    p.innerHTML = html
}

fetch(
    url +
        "/rest/v1/tank_measurements?select=volume,created_at&order=created_at.desc&limit=1",
    {
        headers: { apikey: key },
    },
)
    .then((response) => response.json())
    .then((data) => {
        if (data.length > 0 && data[0].volume != null) {
            showLevel(data[0].volume, data[0].created_at)
        }
    })
    .catch((error) => console.error(error))
