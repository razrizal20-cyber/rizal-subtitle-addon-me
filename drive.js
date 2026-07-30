const { google } = require("googleapis");

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
        "https://www.googleapis.com/auth/drive.readonly"
    ]
});

async function getDriveData() {

    const drive = google.drive({
        version: "v3",
        auth
    });

    // Ambil semua folder
    const folderResult = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder'",
        fields: "files(id,name,parents)"
    });

    // Ambil semua subtitle
    const subtitleResult = await drive.files.list({
        q: "name contains '.srt'",
        fields: "files(id,name,parents)"
    });

    return {
        folders: folderResult.data.files || [],
        subtitles: subtitleResult.data.files || []
    };

}

module.exports = getDriveData;
