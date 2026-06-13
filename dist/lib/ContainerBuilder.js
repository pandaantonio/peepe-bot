"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContainerBuilder {
    container;
    constructor() {
        this.container = {
            type: 17,
            components: [],
        };
    }
    setColor(color) {
        this.container.accentColor = color;
        return this;
    }
    addTextDisplay(content) {
        this.container.components.push({
            type: 10,
            content,
        });
        return this;
    }
    addMediaGallery(mediaGallery) {
        this.container.components.push(mediaGallery.build());
        return this;
    }
    build() {
        return this.container;
    }
}
exports.default = ContainerBuilder;
;
