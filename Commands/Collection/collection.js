const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');
const CollectionData = require('../../Models/collection');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("collection")
    .setDescription("Inventory of your character collected."),

    async execute(interaction, client){
        await interaction.deferReply()

        try{

            let charCollection = await CollectionData.find({
                userId: interaction.user.id,
            })

            let allId = charCollection.map(function(i){
                return i.charId
            })

            let charData = await CharacterData.find({
                charId: allId,
            })

            let stringFinal = ""
            charCollection.forEach((c) => {
                let charInfo = charData.find(e => e.charId == c.charId)
                stringFinal+= '`'+c.uniqueId+'` - `#'+c.charId+'` - **'+charInfo.name+'** (*'+charInfo.serie+'*)\n';
            })
            
            const embedCollection = new EmbedBuilder()
            .setColor("Purple")
            .setAuthor({name: `${interaction.user.tag}'s collection`, iconURL: interaction.user.displayAvatarURL()})
            .addFields({name: "\u200b", value: stringFinal})

            interaction.editReply({embeds: [embedCollection]})

        } catch(error){
            console.log(`Error handling /collection: ${error}`)
        }
    }
}
