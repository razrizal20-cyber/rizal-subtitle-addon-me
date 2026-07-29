const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const getFiles = require("./drive");
const findSubtitle = require("./matcher");


const builder = new addonBuilder({

    id: "rizal.ultra.subtitle",

    version: "1.0.0",

    name: "Rizal Ultra Subtitle",

    description: "Malay subtitle addon for Stremio",

    resources: [
        "subtitles"
    ],

    types: [
        "movie",
        "series"
    ],

    catalogs: []

});


builder.defineSubtitlesHandler(async ({ id, extra }) => {


    const files = await getFiles();


    const subtitle = findSubtitle(files, id);



    if (!subtitle) {

        return {
            subtitles: []
        };

    }



    return {

        subtitles: [

            {
                id: "malay",
                lang: "ms",
                url:
                `https://drive.google.com/uc?export=download&id=${subtitle}`
            }

        ]

    };


});



serveHTTP(
    builder.getInterface(),
    {
        port: 10000
    }
);