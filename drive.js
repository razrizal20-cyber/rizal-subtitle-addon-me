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

    // Ambil semua fail & folder
    const result = await drive.files.list({
        q: "trashed = false",
        fields: "files(id,name,parents,mimeType)"
    });

    const files = result.data.files || [];

    const folders = files.filter(
        f => f.mimeType === "application/vnd.google-apps.folder"
    );

    const subtitles = files.filter(
        f => f.name.toLowerCase().endsWith(".srt")
    );

    console.log("Folders:", folders.length);
    console.log("Subtitles:", subtitles.length);

    return {
        folders,
        subtitles
    };
}

module.exports = getDriveData;
