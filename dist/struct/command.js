"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Command {
    names = [];
    run;
    command;
    subcommand;
    addName(...names) {
        this.names.push(...names);
        return this;
    }
    setRun(run) {
        this.run = run;
        return this;
    }
    setCommand(command) {
        this.command = command;
        this.addName(command.name);
        return this;
    }
    setSubCommand(subcommand) {
        this.subcommand = subcommand;
        return this;
    }
}
exports.default = Command;
;
