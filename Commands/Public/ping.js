const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), //only for admin users
    
    execute(interaction){
        interaction.reply({content: "Pong", ephemeral: false}) // ephemeral means only visible for yourself.
    },
};