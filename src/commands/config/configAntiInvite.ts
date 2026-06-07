import Command from "@/struct/command";
import { adminDb } from "@/lib/firebaseAdmin";

export default new Command()
    .addName("config anti-invite")
    
    .setRun(async function({ app, guild, interaction }){
        if(!guild) return;

        const enabled = interaction.data.options.getBoolean("enabled", true);
        const antinviteRef = adminDb.ref(`guilds/${guild.id}/anti-invite`);

        await antinviteRef.set({
            enable: enabled,
        });

        interaction.createFollowup({
            content: `${await app.getMenoji(enabled ? "enable" : "disable")} Anti convites \`\`${enabled ? "Ativado" : "Desativado"}\`\` som sucesso!`
        });
    });