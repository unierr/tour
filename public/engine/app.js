const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const orgasm = require('./orgasm')
require('babel-register')
orgasm.setReadLine(rl)

const DECOR = require('./decor')

function save(json) {
    json = JSON.stringify(json)
    fs.writeFile('config.json', json, 'utf8', function (err) {
        console.log(DECOR.fg.green, '.:SAVED:.', DECOR.reset)

        startup();
    })
}
function open(callback) {
    fs
        .readFile('config.json', function (err, json) {

            callback(JSON.parse(json))
        })
}
var config;
function showScene(index) {
    var scene = config.story.scenes[index];
    delete scene.hotspots;
    console.log(DECOR.fg.cyan, DECOR.reverse, 'SCENES > ' + scene.uid, DECOR.reset);
    console.log(DECOR.fg.cyan, scene);

    console.log(DECOR.fg.black, DECOR.bright)
    rl.question('Input key to edit or -1 to delete  ' + DECOR.fg.yellow, (answer) => {
        console.log(DECOR.reset)
        if (answer == -1) {
            var existingScenes = [];
            delete config.story.scenes[index]
            for (var i = 0; i < config.story.scenes.length; i++) {
                if (config.story.scenes[i] != null) {
                    existingScenes.push(config.story.scenes[i])
                }
            }
            config.story.scenes = existingScenes;
            // config.story.scenes.splice(0,1);
            save(config)
        } else {
            editKey('scenes', index, answer)
        }
    })

}
function editKey(type, index, key) {
    const def = config.story[type][index][key];
    console.log(DECOR.fg.black, DECOR.bright)
    rl.question('Type new value of ' + key + ' ' + DECOR.fg.yellow, (answer) => {
        console.log(DECOR.reset)
        if (answer) {
            config.story[type][index][key] = answer;
            save(config)
        }

    })
    rl.write(def)


}
// function newHotspot(uid){
//     console.log(DECOR.fg.cyan, DECOR.reverse, 'SCENES > New', DECOR.reset);
//     rl.question(uid+' ==> ' + DECOR.fg.yellow, (answer) => {
//         console.log(DECOR.reset)

//     })
//     rl.write()
// }
function newScene() {
    const keys = [
        'uid',
        'name',
        'slug',
        'description',
        'media.uid',
        'type',
        'source'
    ]
    var last = config.story.scenes.length - 1;
    var scenes;
    var lastScene = config.story.scenes[last];
    if(lastScene){
    delete lastScene.hotspots;
}
    var scene = lastScene;
    var media = scene.media;
    media.source = {
        format: 'equi',
        url: 'images/scenes/'
    }

    console.log(DECOR.fg.cyan, DECOR.reverse, 'SCENES > New', DECOR.reset);
    rl.question('• uid ' + DECOR.fg.yellow, (answer) => {
        console.log(DECOR.reset)
        scene.uid = answer;
        rl.question('• name: ' + DECOR.fg.yellow, (answer) => {
            console.log(DECOR.reset)
            scene.name = answer;

            rl.question('• slug: ' + DECOR.fg.yellow, (answer) => {
                console.log(DECOR.reset)
                scene.slug = answer;
                rl.question('• description: ' + DECOR.fg.yellow, (answer) => {
                    console.log(DECOR.reset)
                    scene.description = answer;
                    rl.question('• media>uid: ' + DECOR.fg.yellow, (answer) => {
                        console.log(DECOR.reset)
                        media.uid = answer;
                        rl.question('• media>type: ' + DECOR.fg.yellow, (answer) => {
                            console.log(DECOR.reset)
                            media.type = answer;
                            rl.question('• media>source>format: ' + DECOR.fg.yellow, (answer) => {
                                console.log(DECOR.reset)
                                media.source.format = answer;
                                rl.question('• media>source>url: ' + DECOR.fg.yellow, (answer) => {
                                    console.log(DECOR.reset)
                                    media.source.url = answer;
                                    scene.media = media;
                                    config
                                        .story
                                        .scenes
                                        .push(scene)
                                    var uid = scene
                                        .uid
                                        .substring(scene.uid.indexOf('scene-') + 6)
                                    var action = {
                                        "uid": "action-" + uid,
                                        "target": "viewer.story",

                                        "method": {
                                            "name": "loadScene",
                                            "args": [scene.uid]
                                        }
                                    }
                                    config
                                        .actions
                                        .push(action);
                                    save(config)
                                })
                                rl.write(media.source.url)
                            })
                            rl.write(media.source.format)
                        })
                        rl.write(media.type)
                    })
                    rl.write(media.uid)
                })
                rl.write(scene.description)
            })
            rl.write(scene.slug)
        })
        rl.write(scene.name)
    })
    rl.write(scene.uid)

}
function startup() {

    open(function (data) {
        config = data;

        console.log('\x1b[36m', DECOR.reverse, 'WELCOME TO FORGEJS JSON CREATOR', DECOR.reset, DECOR.fg.cyan)
        console.log('\t+ New Scene')
        console.log('\t8==o Orgasm Mode')
        for (var i = 0; i < config.story.scenes.length; i++) {
            console.log('\t' + i + '.' + config.story.scenes[i].uid)
        }
        console.log(DECOR.fg.black, DECOR.bright)
        rl.question('Choose ' + DECOR.fg.yellow, (answer) => {
            console.log(DECOR.reset)
            if (answer == '+') {
                newScene();
            } else if (answer=='8==o') {
                orgasm.startup();
            } else {
                showScene(answer)
            }
        })
    })

}
startup();