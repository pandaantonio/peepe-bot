"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Command {
    names;
    run;
    command;
    subcommand;
    addName(...names) {
        if (!this.names)
            this.names = [];
        this.names.push(...names);
        return this;
    }
    setRun(run) {
        this.run = run;
        return this;
    }
    setCommand(command) {
        this.command = command;
        return this;
    }
    setSubCommand(subcommand) {
        this.subcommand = subcommand;
        return this;
    }
}
exports.default = Command;
;
