import Command from "../../app/command";
import EphemeralOption from "../../options/EphemeralOption";
import UserOption from "../../options/UserOption";

export default new Command()
.addName("user info")

.setRun(async ({ app, author, interaction }) => {
    const option = interaction.data.options.getUser("user", false);
    const user = await app.rest.users.get(`${option?.id ?? author.id}`);
    const createdAt = parseInt(`${user.createdAt.getDate() / 1000}`);
    const avatar = user.avatarURL();
    const banner = user.bannerURL();

    interaction.createFollowup({
        embeds: [{
            title: user.globalName ?? user.username,
            color: user.accentColor ?? undefined,
            fields: [{
                inline: true,
                name: `${await app.getMenoji("pomelo")} Nome`,
                value: `\`\`\`${user.username}\`\`\``,
            }, {
                inline: true,
                name: `${await app.getMenoji("id")} ID`,
                value: `\`\`\`${user.id}\`\`\``,
            }, {
                inline: true,
                name: `${await app.getMenoji("mention")} Menção`,
                value: `\`\`\`${user.mention}\`\`\``,
            }, {
                name: `${await app.getMenoji("calendar")} Conta criada`,
                value: `<t:${createdAt}:f> (<t:${createdAt}:R>)`,
            }],
        }],
    });
})

.setSubCommand({
    type: 1,
    name: "info",
    description: "User information.",
    descriptionLocalizations: {
        "pt-BR": "Informações de usuário"
    },
    options: [UserOption(false), EphemeralOption(false)],
});