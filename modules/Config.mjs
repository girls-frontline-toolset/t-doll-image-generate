'use strict';

/** @typedef  {Object} imgType
 * @property {number} width
 * @property {number} height
 * */

/**
 *  @typedef  {Object} folderResource
 *  @property {string} ex
 *  @property {string} digiMind
 *  @property {string} general
 *  @property {string} output
 *  @property {string} background
 *  @property {string} frame
 *  @property {string} type
 */

import tDollList from "./Resource";
import config from "./config.json"

export default class Config {
    constructor() {
        /**
         * @private
         * @type {imgType}
         */
        this._img = config.img; //726, 1296

        /**
         * @type {folderResource}
         * @private
         */
        this._folder = {
            ex: config["T-doll-ex-folder"],
            digiMind: config["T-doll-digital-Mind-folder"],
            general: config["T-doll-general-folder"],
            output: config["output-folder"],
            background:config["background-folder"],
            frame:config["frame-folder"],
            type:config["type-folder"],
        };
        /** @type {string}
         * @private */
        this._defaultImage = config["default-image"];
        /** @type {string}
         * @private */
        this._namePrefix = config["file-name-prefix"];
        /** @type {string}
         * @private */
        this._namePrefixDigi = config["file-name-prefix-digi"];
        /** @type {number}
         * @private */
        this._quality = config.quality;
    }

    /**
     * @public
     * @return {imgType}
     */
    get img(){
        return this._img;
    }

    /**
     * @public
     * @return {t-doll[]}
     */
    static get tDoll(){
        return tDollList;
    }

    /**
     * @public
     * @return {folderResource}
     */
    get folder(){
        return this._folder;
    }

    /**
     * @public
     * @return {string}
     */
    get defaultImage(){
        return this._defaultImage;
    }

    /**
     * @public
     * @return {string}
     */
    get namePrefix(){
        return this._namePrefix;
    }

    /**
     * @public
     * @return {string}
     */
    get namePrefixDigi(){
        return this._namePrefixDigi;
    }

    /**
     * @public
     * @return {number}
     */
    get quality(){
        return this._quality;
    }

}
