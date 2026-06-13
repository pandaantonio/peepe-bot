import { ContainerComponent } from "oceanic.js";
import MediaGalleryBuilder from "./MediaGalleryBuilder";

export default class ContainerBuilder {
    container: ContainerComponent;

    constructor(){
        this.container = {
            type: 17,
            components: [],
        };
    }

    setColor(color: number){
        this.container.accentColor = color;
        return this;
    }

    addTextDisplay(content: string){
        this.container.components.push({
            type: 10,
            content,
        });
        return this;
    }

    addMediaGallery(mediaGallery: MediaGalleryBuilder){
        this.container.components.push(mediaGallery.build());
        return this;
    }

    build(): ContainerComponent {
        return this.container;
    }
};