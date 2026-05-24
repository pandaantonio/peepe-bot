import Event from "@/struct/event";

export default new Event("on", "interactionCreate", async (app, interaction) => {
    const author = interaction.member?.user ?? interaction.user;
    const guild = interaction.guildID ? app.guilds.get(interaction.guildID) : undefined;

    if(interaction.isComponentInteraction()){
        const component = app.components.get(interaction.data.customID);

        if(component){
            await component.run({
                app,
                author,
                interaction,
            });
        }
    }

    if(interaction.isModalSubmitInteraction()){
        const modal = app.modals.get(interaction.data.customID);

        if(modal){
            await modal.run({
                app,
                author,
                interaction,
            });
        }
    }

    if (interaction.isCommandInteraction()) {
        let name = interaction.data.name;

        const subcommands = interaction.data.options.getSubCommand(false);
        const user = interaction.data.options.getUser("user", false);
        let ephemeral = interaction.data.options.getBoolean("ephemeral", false) ?? true;

        if (subcommands?.length) {
            name += subcommands.map((s) => ` ${s}`).join("");
        }

        if(name === "play ttt" && user) ephemeral = false;

        await interaction.defer(ephemeral ? 64 : 0).catch(console.log);

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