import Command from "@/struct/command";

export default new Command()
    .addName("config anti-link")
    
    .setRun(async function({ app, guild, interaction }){
        if(!guild) return;

        const { adminDb } = (await import("@/lib/firebaseAdmin"));
        const enabled = interaction.data.options.getBoolean("enabled", true);
        const antinviteRef = adminDb.ref(`guilds/${guild.id}/anti-link`);

        await antinviteRef.set({
            enable: enabled,
        });

        interaction.createFollowup({
            content: `${await app.getMenoji(enabled ? "enable" : "disable")} Anti links \`\`${enabled ? "Ativado" : "Desativado"}\`\` som sucesso!`
        });
    });