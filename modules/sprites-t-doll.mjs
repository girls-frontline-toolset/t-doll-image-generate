class spritesTDoll {
    constructor(lang) {
        this.lang = lang;
    }

    getLang() {
        if (this.lang === 'tw') {
            return '';
        }
        return this.lang;
    }
}


class spritesTDollGirl extends spritesTDoll {
    constructor(lang) {
        super(lang);
    }

    get sourceFolder() {
        return `\\\\192.168.10.10\\web\\img.ump40.com\\gf\\common\\girl\\${this.getLang()}`;
    };

    sourceImgName(num) {
        return `girl_${num}.jpg`;
    }

    outputName(num) {
        if (!num) {
            return `t-doll-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}`;
        }

        return `t-doll-sprites-${(this.getLang() === '') ? '' : this.getLang() + '-'}${num}`;
    }

    get cssName() {
        return `t-doll-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}.css`;
    }

}

class spritesTDollExGirl extends spritesTDoll {
    constructor(lang) {
        super(lang);
    }

    get sourceFolder() {
        return `\\\\192.168.10.10\\web\\img.ump40.com\\gf\\common\\exGirl\\${this.getLang()}`;
    };

    sourceImgName(num) {
        return `exgirl_${num}.jpg`;
    }

    outputName(num) {
        if (!num) {
            return `t-doll-ex-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}`;
        }

        return `t-doll-ex-sprites-${(this.getLang() === '') ? '' : this.getLang() + '-'}${num}`;
    }

    get cssName() {
        return `t-doll-ex-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}.css`;
    }
}

class spritesTDollDigiMindGirl extends spritesTDoll {
    constructor(lang) {
        super(lang);
    }

    get sourceFolder() {
        return `\\\\192.168.10.10\\web\\img.ump40.com\\gf\\common\\digiMindGirl\\${this.getLang()}`;
    };

    sourceImgName(num) {
        return `digiMindGirl_${num}.jpg`;
    }

    outputName(num) {
        if (!num) {
            return `t-doll-digi-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}`;
        }

        return `t-doll-digi-sprites-${(this.getLang() === '') ? '' : this.getLang() + '-'}${num}`;
    }

    get cssName() {
        return `t-doll-digi-sprites${(this.getLang() === '') ? '' : '-' + this.getLang()}.css`;
    }
}

export {spritesTDoll, spritesTDollGirl, spritesTDollExGirl, spritesTDollDigiMindGirl}
