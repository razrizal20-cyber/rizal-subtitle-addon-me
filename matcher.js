const fs = require("fs");

function findSubtitle(id, season, episode) {

    if (!fs.existsSync("cache.json"))
        return null;

    const cache = JSON.parse(
        fs.readFileSync("cache.json", "utf8")
    );

    // Jika Stremio hantar format tt1234567:1:1
    if (id.includes(":")) {

        const parts = id.split(":");

        id = parts[0];
        season = Number(parts[1]);
        episode = Number(parts[2]);
    }

    // Movie
    if (season === undefined || episode === undefined) {
        return cache[id]?.movie || null;
    }

    // Series
    const key =
        "S" +
        String(season).padStart(2, "0") +
        "E" +
        String(episode).padStart(2, "0");

    return cache[id]?.[key] || null;
}

module.exports = findSubtitle;
