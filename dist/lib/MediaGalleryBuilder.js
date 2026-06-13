"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class MediaGalleryBuilder {
    mediaGallery;
    constructor() {
        this.mediaGallery = {
            type: 12,
            items: [],
        };
    }
    addItem(url, description) {
        this.mediaGallery.items.push({
            media: { url },
            description,
        });
        return this;
    }
    build() {
        return this.mediaGallery;
    }
}
exports.default = MediaGalleryBuilder;
;
