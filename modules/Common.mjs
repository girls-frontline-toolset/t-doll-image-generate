'use strict';

import Config from './Config.mjs'

/**
 * Common
 * @class
 * @constructor
 * @public
 */
export default class Common{
    constructor() {
        /**
         * @type {Config}
         * @private
         */
        this._config = new Config();
    }

    /**
     * @public
     * @return {Config}
     */
      get config(){
          return this._config;
    }



}

