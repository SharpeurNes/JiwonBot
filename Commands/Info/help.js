const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('This is the help command!'),

    async execute(interaction, client){
        const embedHelp = new EmbedBuilder()
        .setColor("Blue")
        .setAuthor({name: "Jiwon Help Center", iconURL: client.user.displayAvatarURL()})
        .addFields({name: "Game Commands 🎮", value: "> `register` `drop` `gacha` `inventory` `collection`"})
        .addFields({name: "Community Commands 💞", value: "> `profile` `setflag` `inventory` `collection`"})
        .addFields({name: "Utils Commands ✔️", value: "> `help` `support` `rules` `vote`"})

        // const embedGame = new EmbedBuilder()
        // .setColor("Blue")
        // .setTitle("Game Commands")
        // .addFields({name: "/drop", value: "Drop something"})
        // .addFields({name: "/sell", value: "Sell your card"})

        // const embedCommunity = new EmbedBuilder()
        // .setColor("Blue")
        // .setTitle("Community Commands")
        // .addFields({name: "`/jprofile`", value: "Showing your profile or someone else"})
        // .addFields({name: "/setflag", value: "Set your flag"})

        // const embedUtils = new EmbedBuilder()
        // .setColor("Blue")
        // .setTitle("Utils Commands")
        // .addFields({name: "/help", value: "Showing all commands"})

        const button = new ActionRowBuilder()
        .addComponents(
            // new ButtonBuilder()
            // .setCustomId('page-1')
            // .setLabel('Page 1')
            // .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setLabel('Official Discord')
            .setURL('https://discord.gg/JstqQtDnym')
            .setStyle('Link'),

            new ButtonBuilder()
            .setLabel('Invite!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1143438811519528980&permissions=689409739776&scope=applications.commands%20bot')
            .setStyle('Link'),
        )

        interaction.reply({embeds: [embedHelp], components: [button]});

        

        // const message = await interaction.reply({ embeds: [embedHelp], components: [button]});
        // const collector = await message.createMessageComponentCollector({time: 30000});

        // collector.on('collect', async i => {
        //     if(i.customId === "page-1"){
        //         if(i.user.id !== interaction.user.id){
        //             return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true});
        //         }
        //         await i.update({ embeds: [embedGame], components: [button]});
        //     }

        //     if(i.customId === "page-2"){
        //         if(i.user.id !== interaction.user.id){
        //             return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true});
        //         }
        //         await i.update({ embeds: [embedCommunity], components: [button]});
        //     }

        //     if(i.customId === "page-3"){
        //         if(i.user.id !== interaction.user.id){
        //             return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true});
        //         }
        //         await i.update({ embeds: [embedUtils], components: [button]});
        //     }
        // })

        // collector.on('end', async i => {
        //     await i.update({ embeds: [embedUtils], components: [button]});
        // })
    }
}