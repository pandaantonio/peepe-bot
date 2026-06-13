import { MediaGalleryComponent } from "oceanic.js";

interface Item {
    url: string;
    description?: string;
};

export default class MediaGalleryBuilder {
    mediaGallery: MediaGalleryComponent;

    constructor() {
        this.mediaGallery = {
            type: 12,
            items: [],
        };
    }

    addItem(url: string, description?: string) {
        this.mediaGallery.items.push({
            media: { url },
            description,
        });

        return this;
    }

    build() {
        return this.mediaGallery;
    }
};