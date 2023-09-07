const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');
const CollectionData = require('../../Models/collection');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("view")
    .setDescription("View a character with an unique ID.")
    .addStringOption(option =>
        option.setName('uniqueid')
            .setDescription('Input')
            .setRequired(true)),

    async execute(interaction, client){
        try{
            await interaction.deferReply();
            let viewId = interaction.options.getString('uniqueid').toUpperCase();

            const collChar = await CollectionData.findOne({
                uniqueId: viewId,
            });

            if(!collChar){
                interaction.editReply('`'+viewId+"` isn't a valid unique ID or doesn't exist.")
                return;
            }

            const dataChar = await CharacterData.findOne({
                charId: collChar.charId,
            })

            const viewEmbed = new EmbedBuilder()
            .setColor("Purple")
            .setAuthor({name: dataChar.name + " `"+viewId+"`"})
            .addFields({name: "Serie", value: dataChar.serie})
            .addFields({name: "Owned by", value: collChar.owner})
            
            interaction.editReply({embeds: [viewEmbed]});


        } catch(error){
            console.log(`Error handling /view: ${error}`)
        }
    }
}
