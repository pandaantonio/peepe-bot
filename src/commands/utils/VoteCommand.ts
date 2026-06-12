import Command from "@/struct/command";

export default new Command()
    .setRun(async function({ interaction }){
        interaction.createFollowup({
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 5,
                    label: "DBL",
                    url: "https://discordbotlist.com/bots/peepe",
                }, {
                    type: 2,
                    style: 5,
                    label: "Top.gg",
                    url: "https://top.gg/discord/bots/1400971977795047516",
                }],
            }],
        });
    })

    .setCommand({
        type: 1,
        name: "vote",
        description: "Vote for me!",
        descriptionLocalizations: {
            "pt-BR": "Vote em mim!"
        },
    });