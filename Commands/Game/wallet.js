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
                userId: interaction.member.id,
            });

            if(!userProfile){
                interaction.editReply("You need to create an account with `/register`");
                return;
            }

            const embedWallet = new EmbedBuilder()
            .setColor("Purple")
            .setAuthor({name: `${interaction.member.displayName} wallet`, iconURL: interaction.member.displayAvatarURL()})
            .addFields({name: "Money", value: `${userProfile.balance} $`})

            interaction.editReply({embeds: [embedWallet]});


        } catch(error){
            console.log(`Error handling /wallet: ${error}`)
        }
    }
}