const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lookup")
    .setDescription("Show character Information.")
    .addStringOption(option =>
        option.setName('name-id')
        .setDescription('Id or character name')
        .setRequired(true)),

    async execute(interaction, client){
        await interaction.deferReply()

        try{
            let nameOrId = interaction.options.getString('name-id');
            let characterData = null
            if(!isNaN(nameOrId)){
                //Ici c'est bien un ID qu'on a
                characterData = await CharacterData.findOne({
                    charId: nameOrId,
                });
            } else {
                //Pas un nombre mais un String
                characterData = await CharacterData.findOne({
                    name: nameOrId,
                });
            }

            if(!characterData){
                interaction.editReply(`Id or Name incorrect we can't found something with **${nameOrId}**`)
                return;
            }
            
            let type = null
            if(characterData.type == "A"){
                type = "Anime"
            } else {
                type = "Kpop"
            }

            const file = new AttachmentBuilder(`./Img/${characterData.charId}.png`);
            const embedCharacter = new EmbedBuilder()
            .setColor("Purple")
            .setTitle('Character Lookup')
            .setDescription(`\nCharacter · **${characterData.name}**
            Serie · **${characterData.serie}**
            Type · **${type}**
            
            Total generated · **${characterData.generated}**
            Total in circulation · **${characterData.owned}**
            Total burned · **${characterData.burned}**`)
            .setThumbnail(`attachment://${characterData.charId}.png`);

            interaction.editReply({embeds: [embedCharacter], files: [file]});


        } catch(error){
            console.log(`Error handling /lookup: ${error}`)
        }
    }
}