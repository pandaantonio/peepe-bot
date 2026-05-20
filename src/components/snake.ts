import { adminDb } from "@/database/firebaseAdmin";
import SnakeGame, { SaveSnake } from "@/games/Snake";
import Component from "@/struct/component";

export default new Component()
    .addName('snake_up', 'snake_down', 'snake_left', 'snake_right', 'snake_stop')

    .setRun(async ({ author, interaction }) => {
        if(interaction.data.componentType !== 2) return;

        if (author.id !== interaction.message.interactionMetadata?.user.id) {
            await interaction.defer(64).catch(console.log);

            interaction.createFollowup({
                content: `Este componente pertence á ${interaction.message.interactionMetadata?.user.mention}!`
            });
            return;
        }

        await interaction.deferUpdate().catch(console.log);

        const snapshot = await adminDb.ref(`games/snake/${interaction.message.id}`).once('value');
        const data: SaveSnake = snapshot.val();
        const game = new SnakeGame(data);
        const customID= interaction.data.customID.replace("snake_", "") as "up" | "down" | "left" | "right" | "stop";

        if (game.isGameOver() || customID === "stop") {
            interaction.editOriginal({
                embeds: [{
                    title: 'Snake',
                    color: 0xff3232,
                    image: { url: "attachment://gameboard.png" },
                    description: `Pontuação: ${game.getScore()}`,
                }],
                files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
                components: [],
            });

            await adminDb.ref(`games/snake/${interaction.message.id}`).remove();
        } else {
            game.setDirection(customID);
            await adminDb.ref(`games/snake/${interaction.message.id}`).update(game);

            interaction.editOriginal({
                embeds: [{
                    title: 'Snake',
                    color: 0xff3232,
                    image: { url: "attachment://gameboard.png" },
                    description: `Pontuação: ${game.getScore()}`,
                }],
                files: [{
                    name: "gameboard.png",
                    contents: await game.generate(),
                }],
            });
        }
    });