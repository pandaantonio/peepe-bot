import Command from "../../app/command";
import EphemeralOption from "../../options/EphemeralOption";
import UserOption from "../../options/UserOption";

export default new Command()
.addName("user avatar")

.setRun(async ({ app, author, interaction }) => {
    const option = interaction.data.options.getUser("user", false);
    const user = await app.rest.users.get(`${option?.id ?? author.id}`);
    const url = user.avatarURL();

    interaction.createFollowup({
        embeds: [{
            image: { url },
            title: user.globalName ?? user.username,
            color: user.accentColor ?? undefined,
        }],
        components: [{
            type: 1,
            components: [{
                url,
                type: 2,
                style: 5,
                label: "Download",
                emoji: await app.getButoji("download"),
            }],
        }],
    });
})

.setSubCommand({
    type: 1,
    name: "avatar",
    description: "See a user avatar.",
    descriptionLocalizations: {
        "pt-BR": "Veja o avatar do usuário"
    },
    options: [UserOption(false), EphemeralOption(false)],
});