import { adminDb } from "@/database/firebaseAdmin";
import SnakeGame, { SaveSnake } from "@/games/Snake";
import Component from "@/struct/component";
import { ButtonStyles, ComponentTypes, MessageFlags } from "oceanic.js";

export default new Component()
    .addName('snake_up', 'snake_down', 'snake_left', 'snake_right', 'snake_stop')

    .setRun(async ({ app, author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        if (author.id !== interaction.message.interactionMetadata?.user.id) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [{
                    type: 10,
                    content: `${await app.getMenoji("no")} Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`,
                }],
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const snapshot = await adminDb.ref(`games/snake/${interaction.message.id}`).once('value');
        const data: SaveSnake = snapshot.val();
        const game = new SnakeGame(data);
        const customID = interaction.data.customID.replace("snake_", "") as "up" | "down" | "left" | "right" | "stop";

        if (game.isGameOver() || customID === "stop") {
            interaction.editOriginal({
                files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
                components: [{
                    type: 17,
                    components: [{
                        type: 10,
                        content: `# 🐍 Jogo da cobrinha\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                    }, {
                        type: 12,
                        items: [{
                            media: {
                                url: "attachment://gameboard.png",
                            },
                        }]
                    }]
                }],
            });

            await adminDb.ref(`games/snake/${interaction.message.id}`).remove();
        } else {
            game.setDirection(customID);
            await adminDb.ref(`games/snake/${interaction.message.id}`).update(game);

            interaction.editOriginal({
                files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
                components: [{
                    type: 17,
                    components: [{
                        type: 10,
                        content: `# 🐍 Jogo da cobrinha\n\n- **Pontuação**: \`\`${game.getScore()}\`\``,
                    }, {
                        type: 12,
                        items: [{
                            media: {
                                url: "attachment://gameboard.png",
                            },
                        }]
                    }]
                }, {
                    type: ComponentTypes.ACTION_ROW,
                    components: [{
                        customID: "snake_up",
                        emoji: {
                            name: "⬆️",
                        },
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_down",
                        emoji: {
                            name: "⬇️",
                        },
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_left",
                        emoji: {
                            name: "⬅️",
                        },
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_right",
                        emoji: {
                            name: "➡️",
                        },
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.SECONDARY,
                    }, {
                        customID: "snake_stop",
                        emoji: { name: "🏳" },
                        type: ComponentTypes.BUTTON,
                        style: ButtonStyles.DANGER,
                    }]
                }],
            });
        }
    });