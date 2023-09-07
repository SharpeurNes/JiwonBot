const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../../Models/userProfile');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("wallet")
    .setDescription("Show your currencies"),

    async execute(interaction, client){
        await interaction.deferReply()

        try{
            let userProfile = await UserProfile.findOne({
                userId: interaction.user.id,
            });

            if(!userProfile){
                interaction.editReply("You need to create an account with `/register`");
                return;
            }

            const embedWallet = new EmbedBuilder()
            .setColor("Purple")
            .setAuthor({name: `${interaction.user.displayName} wallet`, iconURL: interaction.user.displayAvatarURL()})
            .addFields({name: "Money", value: `${userProfile.gold} $`})

            interaction.editReply({embeds: [embedWallet]});


        } catch(error){
            console.log(`Error handling /wallet: ${error}`)
        }
    }
}