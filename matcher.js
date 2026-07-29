const fs = require("fs");

function findSubtitle(id, season, episode) {

    if (!fs.existsSync("cache.json"))
        return null;

    const cache = JSON.parse(
        fs.readFileSync("cache.json")
    );

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
