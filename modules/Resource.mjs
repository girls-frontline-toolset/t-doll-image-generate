/** @typedef {'6','5','4','3','2'} DollStar */
/** @typedef {'HG'|'SMG'|'RF'|'AR'|'MG'|'SG'} DollType */

/** @typedef  {Array} t-doll
 * @property {string} name
 * @property {string} cn_name
 * @property {string} ja_name
 * @property {string} en_name
 * @property {number} no
 * @property {DollType} type
 * @property {DollStar} star
 * @property {string} src
 * @property {string} heavy
 * @property {DollStar} isUpdate
 * */

/**
 * @typedef {Array} ex-t-Doll
 * @property {number} no
 * @property {string} name
 * @property {string} cn_name
 * @property {string} ja_name
 * @property {string} en_name
 * @property {DollType} type
 * @property {string} src
 */
import request from  'sync-request';
import tDoll from './t-doll.json';
import exTDoll from './ex-t-doll.json';

// const hostName = 'https://www.ntw-20.com/';
const hostName = 'http://127.0.0.1/';
const isAPI = false;

/** @type {t-doll[]} */
let tDollList = null;
/** @type {ex-t-Doll[]} */
let exTDollList = null;

if (isAPI) {
    tDollList = JSON.parse(request('GET', hostName + '/api/inquiry/allGirl').getBody('utf8')).data;
    exTDollList = JSON.parse(request('GET', hostName + '/api/inquiry/allExGirl').getBody('utf8')).data;
} else {
    tDollList = tDoll;
    exTDollList = exTDoll;
}

export {tDollList, exTDollList};

