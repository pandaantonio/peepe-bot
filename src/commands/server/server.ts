import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "server",
    nameLocalizations: {
        "pt-BR": "servidor"
    },
    description: "Manage and view server information",
    descriptionLocalizations: {
        "pt-BR": "Gerencie e visualize informações do servidor"
    },
    dmPermission: false,
    options: [{
        type: 1,
        name: "icon",
        nameLocalizations: {
            "pt-BR": "ícone"
        },
        description: "View the server icon",
        descriptionLocalizations: {
            "pt-BR": "Visualize o ícone do servidor"
        },
    }, {
        type: 1,
        name: "banner",
        nameLocalizations: {
            "pt-BR": "estandarte"
        },
        description: "View the server banner",
        descriptionLocalizations: {
            "pt-BR": "Visualize o estandarte do servidor"
        },
    }, {
        type: 1,
        name: "splash",
        nameLocalizations: {
            "pt-BR": "fundo-de-convite"
        },
        description: "View the server invite splash image",
        descriptionLocalizations: {
            "pt-BR": "Visualize a imagem de fundo do convite do servidor"
        },
    }, {
        type: 1,
        name: "info",
        description: "View detailed server information",
        descriptionLocalizations: {
            "pt-BR": "Visualize informações detalhadas do servidor"
        },
    }, {
        type: 1,
        name: "vanity",
        nameLocalizations: {
            "pt-BR": "url-personalizada"
        },
        description: "View the server's vanity URL",
        descriptionLocalizations: {
            "pt-BR": "Visualize a URL personalizada do servidor"
        },
    }, {
        type: 1,
        name: "discovery",
        nameLocalizations: {
            "pt-BR": "fundo-do-discovery"
        },
        description: "View the server discovery splash image",
        descriptionLocalizations: {
            "pt-BR": "Visualize a imagem de fundo do discovery do servidor"
        },
    }]
});