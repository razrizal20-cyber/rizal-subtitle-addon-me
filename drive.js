const {google} = require("googleapis");


const auth = new google.auth.GoogleAuth({

    credentials: JSON.parse(
        process.env.GOOGLE_CREDENTIALS
    ),

    scopes:[
        "https://www.googleapis.com/auth/drive.readonly"
    ]

});


async function getFiles(){

    const drive = google.drive({

        version:"v3",
        auth

    });


    const result = await drive.files.list({

        q:"name contains '.srt'",

        fields:"files(id,name)"

    });


    return result.data.files;

}


module.exports = getFiles;