const fs = require("fs");
const getDriveData = require("./drive");

async function scan() {

    const data = await getDriveData();
    console.log("Drive Data:");
    console.log(JSON.stringify(data, null, 2));
    console.log(data);

    const folders = data.folders;
    const subtitles = data.subtitles;

    const folderMap = {};

    // Simpan Folder ID -> Nama Folder
    for (const folder of folders) {
        folderMap[folder.id] = folder.name;
    }

    const cache = {};

    for (const file of subtitles) {

        if (!file.parents || file.parents.length === 0)
            continue;

        const folderId = file.parents[0];

        const imdb = folderMap[folderId];

        if (!imdb)
            continue;

        if (!cache[imdb])
            cache[imdb] = {};

        // Movie
        if (file.name.toLowerCase() === "movie.srt") {

            cache[imdb]["movie"] = file.id;

            continue;
        }

        // Series
        const match = file.name.match(/S(\d+)E(\d+)/i);

        if (match) {

            const key =
                "S" +
                match[1].padStart(2, "0") +
                "E" +
                match[2].padStart(2, "0");

            cache[imdb][key] = file.id;
        }

    }

    fs.writeFileSync(
        "cache.json",
        JSON.stringify(cache, null, 2)
    );

    console.log("Cache updated.");

}

module.exports = scan;
