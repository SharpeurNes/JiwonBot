const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');
const CollectionData = require('../../Models/collection');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("gacha")
    .setDescription("Drop a new character every 15min."),

    async execute(interaction, client){
        await interaction.deferReply()

        try{

            var random = [];
            while(random.length < 3){
                var r = Math.floor(Math.random() * 4) + 1;
                if(random.indexOf(r) === -1) random.push(r);
            }

            let dropChar = await CharacterData.find({
                charId: random,
            });

            //généré 3 personnages, généré une image avec 2 affichés, 1 mystère et boutton 1 2 3 pour choisir
            //La personne choisis puis le collector se ferme
            //15min délais
            // /reset utilise 1 tickets pour reset son temps de /gacha
            //trouver npm plugin pour générer des images
            // https://cdn.discordapp.com/attachments/648044573536550922/1146543251801788447/card.webp


            //Génération image des 3 personnages
            var canvas = Canvas.createCanvas(1008, 524);
            ctx = canvas.getContext("2d");

            var char1img = await Canvas.loadImage(`./Img/${dropChar[0].charId}.png`);
            ctx.drawImage(char1img, 33, 97, 276, 381);

            var char2img = await Canvas.loadImage(`./Img/${dropChar[1].charId}.png`);
            ctx.drawImage(char2img, 377, 97, 276, 381);

            var background = await Canvas.loadImage("./Img/gacha.png");
            ctx.drawImage(background, 0, 0, 1008, 524);

            ctx.font = "25px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(dropChar[0].name, 168, 98)
            ctx.fillText(dropChar[1].name, 514, 98)

            ctx.fillText("#"+dropChar[0].charId, 59, 478)
            ctx.fillText("#"+dropChar[1].charId, 404, 478)


            var attach = new AttachmentBuilder(canvas.toBuffer(), {name: "gacha.png"});

            //bouton de choix
            const choseButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('g1')
                    .setLabel('1️⃣')
                    .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                    .setCustomId('g2')
                    .setLabel('2️⃣')
                    .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                    .setCustomId('g3')
                    .setLabel('3️⃣')
                    .setStyle(ButtonStyle.Secondary)
                )


            const message = await interaction.editReply({components: [choseButton], files: [attach]});

            const collector = await message.createMessageComponentCollector({time: 30000});

            collector.on('collect', async i => {
                if(i.user.id !== interaction.user.id){
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true});
                }

                if(i.customId === 'g1'){
                    let idRandom = generateString(5);
                    await i.update({content:`You successfully claim ${dropChar[0].name} uid: ||${idRandom}||`, embeds: [], components: [], files: []})
                    gachaCollected(idRandom, dropChar[0], interaction.user.id, 2, interaction.user.globalName);
                    collector.stop();
                }

                if(i.customId === 'g2'){
                    let idRandom = generateString(5);
                    await i.update({content:`You successfully claim ${dropChar[1].name} uid: ||${idRandom}||`, embeds: [], components: [], files: []})
                    gachaCollected(idRandom, dropChar[1], interaction.user.id, 2, interaction.user.globalName);
                    collector.stop();
                }

                if(i.customId === 'g3'){
                    let idRandom = generateString(5);
                    await i.update({content:`You successfully claim ${dropChar[2].name} uid: ||${idRandom}||`, embeds: [], components: [], files: []})
                    gachaCollected(idRandom, dropChar[2], interaction.user.id, 2, interaction.user.globalName);
                    collector.stop();
                }
            })

            collector.on('end', async i => {
                return;
            })

        } catch(error){
            console.log(`Error handling /gacha: ${error}`)
        }
    }
}




//generate id
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


async function gachaCollected(uid, char, idUser, rar, username){
    gachaed = new CollectionData({
        userId: idUser,
        owner: username,
        charId: char.charId,
        uniqueId: uid,
        border: "silver",
    })

    let charData = await CharacterData.findOne({charId: char.charId,});
    charData.generated++;charData.owned++;charData.save();
    gachaed.save();
}