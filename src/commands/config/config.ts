import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "config",
    description: "Configurações do servidor",
    dmPermission: false,
    defaultMemberPermissions: "32",
    options: [
        {
            type: 1,
            name: "anti-invite",
            description: "Configure o bloqueio de convites",
            options: [
                {
                    type: 5, // Boolean
                    name: "enabled",
                    description: "Ativar ou desativar o sistema",
                    required: true
                }
            ]
        }
    ]
});