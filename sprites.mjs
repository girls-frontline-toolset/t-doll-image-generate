let col = 10;
let [min, max] = [1, 500];
let output = "./common/sprites";
let pageCount = 50;
let row = Math.ceil(pageCount / col);
let array = [], tDoll = [];

import Common from './modules/Common.mjs';
import {spritesTDollGirl, spritesTDollExGirl, spritesTDollDigiMindGirl} from  './modules/sprites-t-doll.mjs'
import path from 'path';
import imagemin from 'imagemin';
import webp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import fs from 'fs';

const common = new Common();
import Jimp from 'jimp';

/** @type {'tw'|'cn'|'ja'|'en'} */
const lang = "en";
/** @type {'general'|'ex'|'digiMind'} */
const tDollType = 'digiMind';

let spritesTDollObj ;
switch(tDollType){
    case "general":
        spritesTDollObj = new spritesTDollGirl(lang);
        break;
    case "ex":
        spritesTDollObj = new spritesTDollExGirl(lang);
        break;
    case "digiMind":
        spritesTDollObj = new spritesTDollDigiMindGirl(lang);
        break;
}

function readTDoll(num) {
    let imgPath = path.join(spritesTDollObj.sourceFolder, spritesTDollObj.sourceImgName(num));
    if (!fs.existsSync(imgPath)) {
        imgPath = './images/blank.png';
    }
    return Jimp.read(imgPath)
}

function createBackground() {
    return new Jimp(common.config.img.width * col, common.config.img.height * row, '#ffffff', (err, image) => {
        if (err) throw err
    });
}

function writeImg(img, count) {
    img.write(`./output/${spritesTDollObj.outputName(count)}.jpg`);
}

function createCss(x, y, num) {
    return `.${spritesTDollObj.outputName(num)}{background-position: -${x}px -${y}px; height: 429px;width: 240px;}`
}

for (let i = min; i <= max; i++) {
    array.push(readTDoll(i));
}

Promise.all(array).then(function (results) {
    let imgRow = -1, outputCount = 1;
    let image = createBackground();
    results.forEach(function (result, index) {


        console.log(index + min);
        if (index % col === 0) {
            imgRow++;
        }

        if (index !== 0 && index % pageCount === 0) {
            writeImg(image, outputCount)
            image = createBackground();
            imgRow = 0;
            outputCount++;
        }

        tDoll.push({
            no: index + min,
            outputImg: outputCount,
            x: (index % col) * common.config.img.width,
            y: imgRow * common.config.img.height
        })

        image.composite(result, (index % col) * common.config.img.width, imgRow * common.config.img.height);
    });
    writeImg(image, outputCount)

    let cssStr = "", cssBackground = {}, cssBackgroundStr = "";
    tDoll.forEach(tDollObj => {
        cssStr += createCss(tDollObj.x, tDollObj.y, tDollObj.no);

        if (!cssBackground[tDollObj.outputImg]) {
            cssBackground[tDollObj.outputImg] = [];
        }
        cssBackground[tDollObj.outputImg].push(tDollObj.no)
    })

    for (const outputImgNum in cssBackground) {
        cssBackground[outputImgNum].forEach((n, index) => {
            cssBackgroundStr += `.webp .${spritesTDollObj.outputName(n)}`;

            if (index !== cssBackground[outputImgNum].length - 1) {
                cssBackgroundStr += ",";
            }
        })

        cssBackgroundStr += `{ background-image: url("/common/sprites/${spritesTDollObj.outputName(outputImgNum)}.webp"); }`
    }

    for (const outputImgNum in cssBackground) {
        cssBackground[outputImgNum].forEach((n, index) => {
            cssBackgroundStr += `.no-webp .${spritesTDollObj.outputName(n)}`;

            if (index !== cssBackground[outputImgNum].length - 1) {
                cssBackgroundStr += ",";
            }
        })

        cssBackgroundStr += `{ background-image: url("/common/sprites/${spritesTDollObj.outputName(outputImgNum)}.jpg"); }`
    }

    fs.writeFileSync(output + "/" + spritesTDollObj.cssName, cssBackgroundStr + cssStr);

    imagemin([`./output/${spritesTDollObj.outputName()}*.{jpg,png}`], {
        destination: output,
        plugins: [webp({quality: 70})],
    }).then(v => {
        console.log(v);
    }).catch(err => {
        console.log(err);
    });

    imagemin([`./output/${spritesTDollObj.outputName()}*.{jpg,png}`], {
        destination: output,
        plugins: [imageminMozjpeg({quality: 70})],
    }).then(v => {
        console.log(v);
    }).catch(err => {
        console.log(err);
    });

});

