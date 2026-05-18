"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("../app/event"));
exports.default = new event_1.default("on", "interactionCreate", async (app, interaction) => {
    const author = interaction.member?.user ?? interaction.user;
    const guild = interaction.guildID ? app.guilds.get(interaction.guildID) : undefined;
    if (interaction.isComponentInteraction()) {
        const component = app.components.get(interaction.data.customID.split(".")[0]);
        if (component) {
            await component.run({
                app,
                author,
                interaction,
            });
        }
    }
    if (interaction.isModalSubmitInteraction()) {
        const modal = app.modals.get(interaction.data.customID);
        if (modal) {
            await modal.run({
                app,
                author,
                interaction,
            });
        }
    }
    if (interaction.isCommandInteraction()) {
        let name = interaction.data.name;
        const subcommands = interaction.data.options.getSubCommand(false), ephemeral = interaction.data.options.getBoolean("ephemeral", false) ?? true;
        await interaction.defer(ephemeral ? 64 : 0);
        if (subcommands?.length) {
            name += subcommands.map((s) => ` ${s}`).join("");
        }
        const command = app.commands.get(name);
        if (command && command.run) {
            await command.run({
                app,
                guild,
                author,
                interaction,
            });
        }
    }
});
