const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');
const CollectionData = require('../../Models/collection');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

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

            //Emoji border
            var emoji = null
            if(collChar.border == "silver") {emoji = "<:silver:1149574334919229480>"}
            if(collChar.border == "gold"){emoji ="<:gold:1149574333166010378>"}
            if(collChar.border == "diamond"){emoji ="<:diamond:1149574511864320020>"}

            //generation image avec border
            var canvas = Canvas.createCanvas(472, 720);
            ctx = canvas.getContext('2d');

            var border = await Canvas.loadImage(`./Img/${collChar.border}.png`);
            var charImg = await Canvas.loadImage(`./Img/${dataChar.charId}.png`);
            
            ctx.drawImage(charImg, 35, 132, 402, 557);
            ctx.drawImage(border, 0, 0, 472, 720);
            
            ctx.font = "30px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";

            ctx.fillText(dataChar.name, 234, 127);

            var attach = new AttachmentBuilder(canvas.toBuffer(), {name: `random.png`});

            const viewEmbed = new EmbedBuilder()
            .setColor("Purple")
            .setDescription("["+emoji+"] **"+dataChar.name+"** `"+viewId+"`\nSerie: *"+dataChar.serie+"*\nID: *#"+dataChar.charId+"*")
            .setImage(`attachment://random.png`)
            .setFooter({text: `Owned by ${collChar.owner}`})
            
            interaction.editReply({embeds: [viewEmbed], files: [attach]});


        } catch(error){
            console.log(`Error handling /view: ${error}`)
        }
    }
}
