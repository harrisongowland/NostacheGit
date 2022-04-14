// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
var dialog = require('electron').dialog; 
const path = require('path')
var sharp = require('sharp');
var fse = require('fs-extra');
var exec = require('child_process').exec

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');

console.log(ffmpegPath);

ffmpeg.setFfmpegPath(ffmpegPath);

var command = ffmpeg();

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 550,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: 'icon.png'
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    setup()
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

var frameInformation = null;

async function setup() {
    console.log("Running setup...");

    const frameFile = await fse.readFile("frame-information.json", function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            frameInformation = JSON.parse(data);
            console.log("Setup complete:");
            console.log(frameInformation);
            console.log(frameInformation["frames"]["frame0000.png"]["positions"]);
        }
    })
}

var filesProcessed = 0;

ipcMain.on('ping', async function (event, request) {
    return filesProcessed;
});

ipcMain.on('process', async function (event, filePath, fileName, targetPath) {
    //Process image
    var newPath = filePath.replace('file:///', '');
    console.log(__dirname);

    console.log("Path: " + newPath);

    await sharp(decodeURI(newPath)).resize(350, 200).toFile('result-image-350x200.jpg', async function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Generated large composite OK");
            await sharp(decodeURI(newPath)).resize(175, 100).toFile('result-image-175x100.jpg', async function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Generated small composite OK");
                    await sharp(decodeURI(newPath)).resize(75, 45).toFile('result-image-75x45.jpg', async function (err, info) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Generated tiny composite OK");
                            await sharp(decodeURI(newPath)).resize(500, 375).toFile('result-image-500x375.jpg', async function (err, info) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("Generated huge composite OK");
                                    await sharp(decodeURI(newPath)).resize(225, 150).toFile('result-image-425x275.jpg', async function (err, info) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log("Generated v large composite OK");
                                            await fse.readdir(__dirname + "/frames/", async function (err, files) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("Found the directory");
                                                    await processFrames(event, files, fileName, targetPath);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

ipcMain.on('getDirectory', async function (event) {
    await dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
        console.log(result.canceled);
        console.log(result);
        event.sender.send('receivepath', result.filePaths);
    }).catch(err => {
        console.log(err)
    })
})

async function processFrames(event, files, fileName, targetPath) {
    // we now have the image we need. Now we have to superimpose it over every individual frame.

    var promises = []

    for await (const file of files) {
        console.log("Return image of " + file);
        const promise = await returnImages(event, file);
        promises.push(promise);
    }

    Promise.all(promises).then(async (result) => {
        console.log("Promises resolved! Attempting to save to " + targetPath);

        await ffmpeg()
            .input(__dirname + '/composites/composite_frame%d.png')
            .inputFPS(23.967)
            .input(__dirname + '/audio.mp3')
            .output(targetPath +  "/" + fileName + ".mp4")
            .on('end', function () {
                console.log("Complete. Outputted to " + targetPath + "/" + fileName + ".mp4.");
                event.sender.send('complete');
            })
            .on('progress', function (progress) {
                console.log("Still working: " + progress.percent + "%");
                if (progress.percent != undefined) {
                    event.sender.send('store-data', progress.percent);
                }
            })
            .on('error', function (err) {
                console.log("Something went wrong. " + err);
            })
            .run();
    });
}

var currentFrame = 0; 

async function returnImages(event, file) {
    await console.log("processing " + file);
    try {
        if (frameInformation["frames"][file]["blockers"] === "0") {
            var sharped = await sharp(__dirname + "/frames/" + file);
            await console.log("Processing of " + file + " complete.");
            currentFrame += 1;
            await event.sender.send('store-frame', currentFrame);
            return sharped.toFile(__dirname + "/composites/composite_frame" + (parseInt(file.replace("frame", "").replace(".png", "")).toString()) + ".png")
        }
        else if (frameInformation["frames"][file]["blockers"] === "1") {
            var sharped = await sharp(__dirname + "/frames/" + file).composite([
                {
                    input: frameInformation["frames"][file]["positions"]["size1"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size1"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size1"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size1"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[1])
                }
            ]);
            await console.log("Processing of " + file + " complete.");
            currentFrame += 1;
            await event.sender.send('store-frame', currentFrame);
            return sharped.toFile(__dirname + "/composites/composite_frame" + (parseInt(file.replace("frame", "").replace(".png", "")).toString()) + ".png");
        }
        else if (frameInformation["frames"][file]["blockers"] === "2") {
            var sharped = await sharp(__dirname + "/frames/" + file).composite([
                {
                    input: frameInformation["frames"][file]["positions"]["size1"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size1"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size1"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size1"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size2"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size2"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size2"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size2"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[1])
                }
            ]);
            currentFrame += 1;
            await console.log("Processing of " + file + " complete.");
            await event.sender.send('store-frame', currentFrame);
            return sharped.toFile(__dirname + "/composites/composite_frame" + (parseInt(file.replace("frame", "").replace(".png", "")).toString()) + ".png");
        }
        else if (frameInformation["frames"][file]["blockers"] === "3") {
            var sharped = await sharp(__dirname + "/frames/" + file).composite([
                {
                    input: frameInformation["frames"][file]["positions"]["size1"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size1"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size1"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size1"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size2"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size2"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size2"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size2"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size3"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size3"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size3"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size3"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position3"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position3"].split(",")[1])
                }
            ]);
            currentFrame += 1;
            await console.log("Processing of " + file + " complete.");
            await event.sender.send('store-frame', currentFrame);
            return sharped.toFile(__dirname + "/composites/composite_frame" + (parseInt(file.replace("frame", "").replace(".png", "")).toString()) + ".png");
        }
        else {
            var sharped = await sharp(__dirname + "/frames/" + file).composite([
                {
                    input: frameInformation["frames"][file]["positions"]["size1"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size1"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size1"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size1"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position1"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size2"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size2"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size2"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size2"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position2"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size3"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size3"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size3"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size3"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position3"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position3"].split(",")[1])
                },
                {
                    input: frameInformation["frames"][file]["positions"]["size4"] === "large"
                        ? 'result-image-350x200.jpg'
                        : frameInformation["frames"][file]["positions"]["size4"] === "small"
                            ? 'result-image-175x100.jpg'
                            : frameInformation["frames"][file]["positions"]["size4"] === "tiny"
                                ? 'result-image-75x45.jpg'
                                : frameInformation["frames"][file]["positions"]["size4"] === "vlarge"
                                    ? 'result-image-425x275.jpg'
                                    : 'result-image-500x375.jpg',
                    top: parseInt(frameInformation["frames"][file]["positions"]["position4"].split(",")[0]),
                    left: parseInt(frameInformation["frames"][file]["positions"]["position4"].split(",")[1])
                }
            ]);
            currentFrame += 1;
            await console.log("Processing of " + file + " complete.");
            await event.sender.send('store-frame', currentFrame);
            return sharped.toFile(__dirname + "/composites/composite_frame" + (parseInt(file.replace("frame", "").replace(".png", "")).toString()) + ".png");
        }
    }
    catch (err) {
        console.log(err);
        return 80
    }
}
