import { ActionRowBase, MessageActionRowComponent, NullablePartialEmoji } from "oceanic.js";

export default class ActionRowBuilder {
    actionRow: ActionRowBase<MessageActionRowComponent>;

    constructor(){
        this.actionRow = {
            type: 1,
            components: [],
        };
    }

    addLinkButton(url: string, label?: string, emoji?: NullablePartialEmoji){
        this.actionRow.components.push({
            url,
            label,
            emoji,
            type: 2,
            style: 5,
        });
        return this;
    }

    build(){
        return this.actionRow;
    }
};