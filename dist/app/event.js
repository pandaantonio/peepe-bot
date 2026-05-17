"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Event {
    name;
    type;
    run;
    constructor(type, name, run) {
        this.type = type;
        this.name = name;
        this.run = run;
    }
}
exports.default = Event;
;
