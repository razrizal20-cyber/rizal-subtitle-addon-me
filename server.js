const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const cron = require("node-cron");

const scan = require("./scanner");
const findSubtitle = require("./matcher");

const builder = new addonBuilder({

    id: "rizal.ultra.subtitle",

    version: "1.0.0",

    name: "Rizal Ultra Subtitle",

    description: "Malay Subtitle Addon",

    resources: [
        "subtitles"
    ],

    types: [
        "movie",
        "series"
    ],

    catalogs: []

});


// Scan sekali bila server hidup
scan();


// Scan setiap 1 minit
cron.schedule("* * * * *", async () => {

    console.log("Scanning Google Drive...");

    await scan();

});


builder.defineSubtitlesHandler(async ({ id, extra }) => {

    let subtitleId;

    // Movie
    if (!extra || extra.season === undefined) {

        subtitleId = findSubtitle(id);

    }

    // Series
    else {

        subtitleId = findSubtitle(

            id,

            extra.season,

            extra.episode

        );

    }

    if (!subtitleId) {

        return {

            subtitles: []

        };

    }

    return {

        subtitles: [

            {

                id: subtitleId,

                lang: "ms",

                url:
                `https://drive.google.com/uc?export=download&id=${subtitleId}`

            }

        ]

    };

});


serveHTTP(builder.getInterface(), {

    port: process.env.PORT || 10000

});
