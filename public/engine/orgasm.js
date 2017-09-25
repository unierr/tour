const DECOR = require('./decor')
const readline = require('readline');
const fs = require('fs');

var rl;
var orgasm = {};
var json = {
    story: {
        scenes: []
    },
    actions: []
};
const ui = require('./ui')
var path = 'F:\\Unier\\tour\\public\\images\\scenes';
orgasm.setReadLine = function (input) {
    rl = input
}
function pussy(){
    ui.header('PUSSY MODE');
    ui.p('in PUSSY MODE you are able to just fuck files without losing virginity and jerk off your json manually  by MMD.')

    console.log(DECOR.fg.black, DECOR.bright)
    rl.question('Choose path of pussy folder to cum there(attention: multi fucking is not supported yet):  ' + DECOR.fg.yellow, (answer) => {
        console.log(DECOR.reset)
        var index = 0;
        
            var f = [];
            fs
                .readdirSync(path)
                .forEach(file => {
                    console.log(file);
                    var iName = ("00000" + index).slice(-5);
                    var newpath = path + '\\' + iName + '.jpg';
                    fs.rename(path + '\\' + file, newpath, function (err) {
                        console.log(err);
                    });
                    f.push(file);
                    index++;
                })     
          ui.p('OK now jerk off yourself')        
    });
    // rl.write(path)
}
orgasm.startup = function () {
    // const rl = readline.createInterface({input: process.stdin, output:
    // process.stdout});
    ui.header('ORGASM MODE');
    ui.p('in ORGASM MODE you are able to create scenes and actions with one single command' +
            '. (hotspots not supported yet)')
    console.log(DECOR.fg.black, DECOR.bright)
    // var q=ui.question('Choose path of pussy folder to cum there: ');
    rl.question('Choose path of pussy folder to cum there  or send a {|} pussy to open PUSSY MODE' + DECOR.fg.yellow, (answer) => {
        console.log(DECOR.reset)
        console.log(answer)
        if (answer == '{|}') {
pussy();
        } else {
            path = answer;
            scrape(path);
        }

    })
    // rl.write(path)
}
scenesOf = (files, pre, callback) => {
    // var json = {     story: {         scenes: []     },     actions: [] };
    console.log('hoy')
    var index = 0;
    var info = {
        name: 'ناشناخته',
        slug: 'unknown',
        description: 'توضیح خالی'
    }

    console.log(files.length)
    fs.readFile(files[0].path, function (err, data) {
        if (!err) {
            info = data
        }
        var async = require('async')
        async.eachSeries(files, function iterator(file, callback) {
            console.log(file)
            if (file.type == 'directory') {
                var newpre;
                if (pre == '') {
                    newpre = file.name
                } else {
                    newpre = pre + '-' + file.name
                }
                console.log(newpre)
                scenesOf(file.children, newpre, function (data) {
                    console.log('folder')
                    callback()
                });
                // json.story.scenes = json     .story     .scenes
                // .concat(childrenScenes.story.scenes); json.actions = json     .actions
                // .concat(childrenScenes.actions);

            } else {

                // file.path=newpath;

                var scene = {
                    "uid": 'scene-' + pre + '-' + index,
                    "name": info.name + index,
                    "slug": info.slug + index,
                    "description": info.description + index,
                    "media": {
                        "uid": "media-" + pre + '-' + index,
                        "type": "image",
                        "source": {
                            "format": "equi",
                            "url": "images/scenes/" + file
                                .path
                                .replace('\\', '/')
                                .replace('//', '/')
                        }
                    }
                }
                var action = {
                    "uid": "action-" + pre + '-' + index,
                    "target": "viewer.story",
                    "method": {
                        "name": "loadScene",
                        "args": ["scene-" + pre + '-' + index]
                    }
                }

                json
                    .story
                    .scenes
                    .push(scene)
                json
                    .actions
                    .push(action)

                index++;
                callback()
            }
        }, function done() {
            //...
            fs
                .readFile('config.json', function (err, j) {
                    j = JSON.parse(j);
                    console.log('j is ', j)
                    j
                        .story
                        .scenes
                        .push(json.story.scenes)
                    j
                        .actions
                        .push(json.actions)
                    console.log(j)
                    // j = j.concat(json.story.scenes);

                    fs.writeFile('config.json', JSON.stringify(j), function (err, dd) {
                        callback(json)
                    })

                })
        });
        // for (var i = 0; i < files.length; i++) { }
        console.log('config')
    })
    // fs.readFile('scenes.json', function (err,j) {     j = JSON.parse(j);
    // console.log(j)     j = j         .concat(json.story.scenes);
    // fs.writeFile('scenes.json', JSON.stringify(j)) }) fs.readFile('actions.json',
    // function (err,j) {     j = JSON.parse(j);     console.log(j)     j = j
    // .concat(json.actions);     fs.writeFile('actions.json', JSON.stringify(j))
    // callback(json) }) config.story.scenes=config.story.scenes.concat(
    // json.story.scenes); config.story.scenes=config.story.scenes.concat(
    // json.actions);

}
function scrape(path) {
    console.log(path)
    var dirToJson = require('dir-to-json');
    var async = require('async')
    var index = 0;

    var f = [];
    fs
        .readdirSync(path)
        .forEach(file => {
            console.log(file);
            var iName = ("00000" + index).slice(-5);
            var newpath = path + '\\' + iName + '.jpg';
            fs.rename(path + '\\' + file, newpath, function (err) {
                console.log(err);
            });
            f.push(file);
            index++;
        })
    doAPieceOfShit(f)
    // dirToJson(path, {     sortType: true }, function (err, dirTree) {     if
    // (err) {         throw err;         console.log(err)     } else {         //
    // rl.question('save? (1:yes,0: no) ',(answer)=>{     if(answer==1){         //
    // fs.writeFile('config.json',JSON.stringify(config))     } })         //
    // async.eachSeries(files, function iterator(file, callback) {     var iName =
    //   // ("00000" + index).slice(-5);     var newpath = file.parent + '\\' +
    // iName +         // '.jpg';     fs.rename(path + '\\' + file.path, path + '\\'
    // + newpath,         // function (err) {         callback();     }); },
    // function done() {         scenesOf(dirTree.children, '', function (d) {
    // console.log('hey', JSON.stringify(json))         })         //  }) ui.p(json)
    //     } });

}
orgasm.setPath = function () {
    // ui.header('ORGASM MODE');

}

function doAPieceOfShit(files) {
    for (var index = 0; index < files.length; index++) {
        var info = {
            name: 'ناشناخته',
            slug: 'unknown',
            description: 'توضیح خالی'
        }
        pre = "olumpayeh"
        var file = files[index]
        var hotspots = [];
        if (index != files.length - 1) {
            hotspots.push({
                "uid": "hotspot-default-" + pre + '-' + index,
                "material": {
                    "image": "images/icons/foot.png"
                },
                "geometry": {
                    "type": "plane",
                    "options": {
                        "width": 50,
                        "height": 50
                    }
                },
                "facingCenter": true,
                "transform": {
                    "position": {
                        "radius": 200,
                        "theta": 150,
                        "phi": -5
                    },
                    "rotation": {
                        "x": 80,
                        "y": 0
                    }
                },
                "events": {
                    "onClick": ["action-" + pre + '-' + (index + 1)]
                }
            })
        }
        if (index != 0) {
            hotspots.push({
                "uid": "hotspot-default-" + pre + '-' + index + '-back',
                "material": {
                    "image": "images/icons/foot.png"
                },
                "geometry": {
                    "type": "plane",
                    "options": {
                        "width": 50,
                        "height": 50
                    }
                },
                "facingCenter": true,
                "transform": {
                    "position": {
                        "radius": 200,
                        "theta": -150,
                        "phi": -5
                    },
                    "rotation": {
                        "x": 80,
                        "y": 0
                    }
                },
                "events": {
                    "onClick": ["action-" + pre + '-' + (index - 1)]
                }
            })
        }
        var scene = {
            "uid": 'scene-' + pre + '-' + index,
            "name": info.name + index,
            "slug": info.slug + index,
            "description": info.description + index,
            "media": {
                "uid": "media-" + pre + '-' + index,
                "type": "image",
                "source": {
                    "format": "equi",
                    "url": "images/scenes/" + file
                        .replace('\\', '/')
                        .replace('//', '/')
                }
            },
            "hotspots": hotspots

        }
        var action = {
            "uid": "action-" + pre + '-' + index,
            "target": "viewer.story",
            "method": {
                "name": "loadScene",
                "args": ["scene-" + pre + '-' + index]
            }
        }

        json
            .story
            .scenes
            .push(scene)
        json
            .actions
            .push(action)

    }

    fs
        .readFile('config.json', function (err, j) {
            j = JSON.parse(j);
            console.log('j is ', j)
            j
                .story
                .scenes
                .push(json.story.scenes)
            j
                .actions
                .push(json.actions)
            console.log(j)
            // j = j.concat(json.story.scenes);

            fs.writeFile('config.json', JSON.stringify(j), function (err, dd) {
                // callback(json)
            })

        })
}

module.exports = orgasm;