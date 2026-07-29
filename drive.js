const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
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
    const folders = await drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder'",
        fields: "files(id,name,parents)"
    });

    // Ambil semua fail SRT
    const subtitles = await drive.files.list({
        q: "name contains '.srt'",
        fields: "files(id,name,parents)"
    });

    return {
        folders: folders.data.files,
        subtitles: subtitles.data.files
    };

}

module.exports = getDriveData;
