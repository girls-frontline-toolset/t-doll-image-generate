/** @typedef {'5','4','3','2'} DollStar */
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

import request from  'sync-request'
// const hostName = 'https://www.ntw-20.com/';
const hostName = 'http://127.0.0.1/';

/**
 * @type {t-doll[]}
 */
let tDollList = JSON.parse(request('GET', hostName + '/api/inquiry/allGirl').getBody('utf8')).data;

export default tDollList;

