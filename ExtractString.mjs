import tDollList from './modules/Resource'
import fs from "fs";

let string = "";

/** @type {'tw'|'cn'|'ja'|'en'} */
let lang = "ja";

for (let i = 0; i < tDollList.length; i++) {
    let data = tDollList[i];
    let name = "name";

    switch (lang) {
        case "cn":
            name = "cn_name";
            break;
        case "en":
            name = "en_name";
            break;
        case "ja":
            name = "ja_name";
            break;
    }


    for (let j = 0; j < data[name].length ; j++) {
        if (!string.includes(data[name][j])) {
            string += data[name][j];
        }
    }
}
fs.writeFileSync("string.txt", string);
console.log(string);

