import { TextDisplayComponent } from "oceanic.js";

export default class TextDisplayBuilder {
    textDisplay: TextDisplayComponent;

    constructor(){
        this.textDisplay.type = 10;
    }

    setContent(content: string){
        this.textDisplay.content = content;

        return this;
    }

    build(){
        return this.textDisplay;
    }
};