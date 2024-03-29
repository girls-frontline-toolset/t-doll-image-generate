import Common from './modules/Common.mjs';
import fs from "fs";
import config from './modules/Config.mjs';
import {exec} from 'child_process';

import Jimp from 'jimp';

const range = '0 - 100'; // '1 - 100' | '10,20'

/** @type {'tw'|'cn'|'ja'|'en'} */
const lang = "en";
const common = new Common();
/** @type {boolean} */
const isDigital = false;
/** @type {'general'|'ex'} */
const tDollType = "general";

const rangeArray = range.split(",");

function SaveDefaultImage(no, savePath) {
    if (isDigital) {
        return;
    }
    no = "" + no;
    Jimp.read("" + common.config.defaultImage, (err, defaultFile) => {
        Jimp.loadFont(`./fnt/number/font.fnt`).then(typeFont => {
            defaultFile
                .print(typeFont, (no.length === 3) ? 555 : (no.length === 2) ? 580 : 600, 1167, no)
                .resize(common.config.img.width, common.config.img.height).quality(common.config.quality)
                .write(savePath);

            console.log("no. " + no + " success");
        });
    }).catch(err => {console.log(err);});
}

/** @type {'cn','cn_name','en_name','ja_name','name'} */
let name = "name";
let typeY = 1150;

switch (lang) {
    case "cn":
        name = "cn_name";
        break;
    case "en":
        name = "en_name";
        typeY = 1150;
        break;
    case "ja":
        name = "ja_name";
        typeY = 1180;
        break;
}

    for (let i = 0; i < rangeArray.length; i++) {
        let spliceRange = rangeArray[i].split(" - ");

        let start = parseInt(spliceRange[0]);
        let end = (spliceRange[1] === undefined) ? start : parseInt(spliceRange[1]);


        for (let j = start; j <= end; j++) {
            let isTWName = false;

            let data;
            if (tDollType === "general") {
                /** @type {t-doll} */
                data = config.tDoll[j - 1];
            } else {
                /** @type {ex-t-Doll} */
                data = config.exTDollList[j - 1];
            }

            const savePath = common.config.folder.output + "/" + lang + "/"
                + ((isDigital) ? 'digiMindGirl/' : '')
                + ((tDollType === 'ex') ? 'ex/' : '')
                + ((isDigital) ? common.config.namePrefixDigi :
                    ((tDollType === 'ex') ? common.config.namePrefixEx :
                        common.config.namePrefix)) + j + ".jpg";

            const tDollPath = ((isDigital) ? common.config.folder.digiMind : ((tDollType === "general") ? common.config.folder.general : common.config.folder.ex)) + "/" + j + ".png";

            if (data === undefined) {
                SaveDefaultImage(j, savePath);
                continue;
            }

            if (tDollType === "ex") {
                data.star = 0;
            }

            if (lang !== 'tw' && data[name] === "") {
                isTWName = true;
                data[name] = data.name || "";
            }

            if (data[name] === "" || !fs.existsSync(tDollPath)) {
                SaveDefaultImage(j, savePath);
                continue;
            }

            if (isDigital) {
                switch (data.star) {
                    case "5":
                        data.star = '6';
                        break;
                    case "4":
                        data.star = '5';
                        break;
                    case "3":
                    case "2":
                        data.star = '4';
                        break;
                }
            }

            const backgroundPath = common.config.folder.background + "/" + data.star + ".png";
            const framePath = common.config.folder.frame + "/" + ((tDollType === 'ex') ? 'ex' : data.star) + ".png";
            const typePath = common.config.folder.type + "/" + data.star + "/" + data.type + ".png";

            const typeMap = {
                HG: {tw: "手槍", en: "HG", ja: "ハンドガン", cn: "手枪"}
                , SMG: {tw: "衝鋒槍", en: "SMG", ja: "サブマシン", cn: "冲锋枪"}
                , MG: {tw: "機槍", en: "MG", ja: "マシンガン", cn: "机枪"}
                , RF: {tw: "步槍", en: "RF", ja: "ライフル", cn: "步枪"}
                , AR: {tw: "突擊步槍", en: "AR", ja: "アサルトラ", cn: "突击步枪"}
                , SG: {tw: "霰彈槍", en: "SG", ja: "シヨツトガン", cn: "霰弹枪"}
            };

            Jimp.read(backgroundPath, (err, background) => {
                if (err) throw err;
                Jimp.read(tDollPath).then(tDoll => {
                    Jimp.read(framePath).then(frame => {
                        Jimp.read(typePath).then(type => {
                            Jimp.loadFont(`./fnt/${lang}/type/font.fnt`).then(typeFont => {
                                Jimp.loadFont(`./fnt/number/font.fnt`).then(numberFont => {
                                    let nameFont = getFnt(lang, j).nameFont || `./fnt/${lang}/font.fnt`;
                                    let nameY = getFnt(lang, j).nameY || 990;


                                    if (isTWName) {
                                        nameFont = getFnt('tw', j).nameFont || `./fnt/tw/font.fnt`;
                                        nameY = getFnt('tw', j).nameY || 990;
                                    }


                                    Jimp.loadFont(nameFont).then(font => {
                                        Jimp.read("./images/star.png").then(starImage => {

                                            background
                                                .composite(tDoll.resize(726 * 2, Jimp.AUTO), 0, 60)
                                                .composite(frame, 0, 0)
                                                .composite(type, 0, 0)
                                                .print(font, 5, nameY, data[name])
                                                .print(typeFont, 10, typeY, typeMap[data.type][lang])
                                                .print(numberFont, (data.no.length === 3) ? 555 : (data.no.length === 2) ? 580 : 600, 1167, data.no);

                                            if (tDollType === "ex") {
                                                background
                                                    .composite(starImage, 0, 0)
                                            }

                                            background
                                            // set JPEG quality
                                                .resize(common.config.img.width, common.config.img.height).quality(common.config.quality)
                                                .write(savePath); // save

                                            console.log("no. " + j + " success");
                                        });

                                    });
                                })
                            })
                        });

                    })
                });
            }).catch(err => {console.log(err);});

        }
    }


    function getFnt(lang, j) {
        let rs = {nameFont: "", nameY: ""};

        if (lang === 'tw' || lang === 'cn') {
            switch (j) {
                case 56:
                case 141:
                case 317:
                case 198:
                    rs.nameFont = `./fnt/${lang}/s90/font.fnt`;
                    rs.nameY = 1015;
                    break;
                case 156:
                case 197:
                    rs.nameFont = `./fnt/${lang}/s100/font.fnt`;
                    rs.nameY = 1000;
                    break;
            }

            if (j === 21 && tDollType === "ex") {
                rs.nameFont = `./fnt/${lang}/s100/font.fnt`;
                rs.nameY = 1015;
            }
        } else if (lang === 'en') {
            switch (j) {
                case 198:
                case 197:
                case 141:
                case 317:
                case 114:
                    rs.nameFont = `./fnt/en/s90/font.fnt`;
                    rs.nameY = 1025;
                    break;
                case 171:
                case 156:
                case 56:
                case 79:
                case 39:
                    rs.nameFont = `./fnt/en/s100/font.fnt`;
                    rs.nameY = 1025;
                    break;
                default:
                    rs.nameY = 1010;
                    break;
            }
        } else if (lang === 'ja') {
            switch (j) {
                case 27:
                case 39:
                case 79:
                case 56:
                case 34:
                case 139:
                case 92:
                case 203:
                    rs.nameFont = `./fnt/ja/s100/font.fnt`;
                    rs.nameY = 1025;
                    break;
                case 156:
                case 141:
                case 114:
                case 197:
                case 198:
                    rs.nameFont = `./fnt/ja/s80/font.fnt`;
                    rs.nameY = 1040;
                    break;
                case 50:
                case 36:
                    rs.nameFont = `./fnt/ja/s65/font.fnt`;
                    rs.nameY = 1040;
                    break;
                default:
                    rs.nameY = 990;
                    break;
            }
        }

    return rs;
}

exec('start "" "' + common.config.folder.output + '"');
