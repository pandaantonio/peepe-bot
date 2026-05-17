import Command from "../../app/command";
import SayContext from "../../context/create-embed/SayContext";
import EphemeralOption from "../../options/EphemeralOption";
import { adminDb } from "../../database/firebaseAdmin";
import { SelectOption } from "oceanic.js";

export default new Command()
    .addName('config embed')

    .setRun(async function ({ app, author, interaction }) {
        const options: SelectOption[] = [{
            emoji: await app.getButoji("add"),
            label: `Adicionar mensagem`,
            value: "add.message",
        }];
        const messagesRef = adminDb.ref(`messages/${author.id}`);
        const snapshot = await messagesRef.once("value");
        const data = snapshot.val();

        if(data){
            for(const [key, value]of Object.entries(data)){
                options.push({
                    //@ts-ignore
                    label: `${value?.name ?? value?.id}`,
                    value: `${key}`,
                    emoji: await app.getButoji("point"),
                });
            }
        }

        interaction.createFollowup({
            components: [{
                type: 1,
                components: [{
                    type: 3,
                    options,
                    customID: "config-embed",
                }],
            }]
        });
    })

    .setSubCommand({
        type: 1,
        name: "embed",
        nameLocalizations: {
            "pt-BR": "incorporação"
        },
        description: "Create embedded messages.",
        descriptionLocalizations: {
            "pt-BR": "Crie mensagens incorporadas."
        },
    });