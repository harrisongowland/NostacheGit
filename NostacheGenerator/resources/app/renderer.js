document.getElementById('process-screen').style.display = "none";

var fileUpload = document.getElementById('fileUpload');
var directorySelect = document.getElementById('directorySelect')
var imagePreview = document.getElementById('output')
var fileDiv = document.getElementById('file');
var processDiv = document.getElementById('process-screen');

var fileName = document.getElementById('fileName')
var directoryName = document.getElementById('saveDirectory');

var savedFileName = "";
var targetPath = "";

fileUpload.addEventListener("change", (event) => {
    const fileList = event.target.files;
    console.log(fileList);
    imagePreview.src = event.target.files[0].path;
});

directorySelect.addEventListener("click", (event) => {
    window.electron.getDirectory();
})

function receivePath(path) {
    targetPath = path;
    directoryName.innerHTML = path;
}

var process = document.getElementById('process')

process.addEventListener("click", async (event) => {
    if (imagePreview.src != "" && fileName.value != "" && targetPath != "") {
        await window.electron.process(imagePreview.src, fileName.value, targetPath);
        savedFileName = fileName.value;
        await console.log("processing");
        document.getElementById('file').style.display = "none";
        document.getElementById('process-screen').style.display = "block";
    }
})

window.electron.storeData('store-data', (event, data) => {
    if (data < 100) {
        document.getElementById('progress').innerHTML = "Rendering video: " + data.toString().split(".")[0] + "%";
    }
});

window.electron.storeData('store-frame', (event, data) => {
    document.getElementById('status').innerHTML = "Processing frame " + data + "/1224";
});

window.electron.storeData('receivepath', (event, data) => {
    console.log("received path");
    console.log(data);
    receivePath(data[0]);
})

window.electron.storeData('complete', (event) => {
    document.getElementById('file').style.display = "block";
    document.getElementById('process-screen').style.display = "none";
    imagePreview.src = null;
    fileName.value = null;
    var NOTIFICATION_TITLE = 'Render complete'
    var NOTIFICATION_BODY = 'Processing complete. Exported video to /' + savedFileName + ".mp4.";
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY });
    document.getElementById('progress').innerHTML = "Rendering video: 0%"
    document.getElementById('status').innerHTML = "Processing frame 0/1224";
    directoryName = "Choose a directory";
    targetPath = "";
})

