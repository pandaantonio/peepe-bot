"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TextDisplayBuilder {
    textDisplay;
    constructor() {
        this.textDisplay.type = 10;
    }
    setContent(content) {
        this.textDisplay.content = content;
        return this;
    }
    build() {
        return this.textDisplay;
    }
}
exports.default = TextDisplayBuilder;
;
