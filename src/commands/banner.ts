import EphemeralOption from "@/options/EphemeralOption";
import UserOption from "@/options/UserOption";
import Command from "@/struct/command";
import { ApplicationCommandTypes, ApplicationIntegrationTypes, InteractionContextTypes, MediaGalleryItem, MessageActionRowComponent, MessageFlags } from "oceanic.js";

export default new Command()
    .setRun(async function({ app, guild, author, interaction }){
        const option = interaction.data.options.getUser('user', false) ?? author;
        const user = await app.rest.users.get(option.id);
        const member = guild ? await guild.getMember(option.id).catch(() => undefined) : undefined;
        const url = user.bannerURL();
        const url2 = member?.bannerURL();

        if(!url){
            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este usuário não possue estandarte!`
                }],
            });
            
            return;
        }

        const items: MediaGalleryItem[] = [{
            media: {
                url,
            },
            description: "Estandarte Global",
        }];
        const components: MessageActionRowComponent[] = [{
            url,
            type: 2,
            style: 5,
            label: "Estandarte Global",
            emoji: await app.getButoji("download"),
        }];

        if(url2){
            items.push({
                media: {
                    url: url2,
                },
                description: "Estandarte Local",
            });
            components.push({
                url: url2,
                type: 2,
                style: 5,
                label: "Estandarte Local",
                emoji: await app.getButoji("download"),
            });
        }

        interaction.createFollowup({
            flags: MessageFlags.IS_COMPONENTS_V2,
            components: [{
                type: 17,
                components: [{
                    type: 10,
                    content: `**${member?.nick ?? user.globalName ?? user.username}**`,
                }, {
                    items,
                    type: 12,
                }],
            }, {
                type: 1,
                components,
            }],
        });
    })

    .setCommand({
        name: "banner",
        nameLocalizations: {
            "pt-BR": "estandarte"
        },
        description: "See a user banner.",
        descriptionLocalizations: {
            "pt-BR": "Veja o estandarte do usuário."
        },
        options: [UserOption(false), EphemeralOption(false)],
        integrationTypes: [
            ApplicationIntegrationTypes.GUILD_INSTALL,
            ApplicationIntegrationTypes.USER_INSTALL,
        ],
        contexts: [
            InteractionContextTypes.BOT_DM,
            InteractionContextTypes.GUILD,
            InteractionContextTypes.PRIVATE_CHANNEL,
        ],
        type: ApplicationCommandTypes.CHAT_INPUT,
    })