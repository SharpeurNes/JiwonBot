const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../../Models/userProfile');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("preference")
    .setDescription("Show your drop preference (default: Anime and Kpop)"),

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

            let pref = ""
            switch(userProfile.preference){
                case "AK":
                    pref = "Anime and Kpop";break;
                case "A":
                    pref = "Anime";break;
                case "K":
                    pref = "Kpop";break;
            }

            const embedWallet = new EmbedBuilder()
            .setColor("Purple")
            .setAuthor({name: `${interaction.member.displayName} Drop Preference`, iconURL: interaction.member.displayAvatarURL()})
            .setDescription(`Your drops preferences are set to **${pref}**.`);

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel("Anime")
                .setStyle(ButtonStyle.Success)
                .setCustomId("A"),

                new ButtonBuilder()
                .setLabel("Kpop")
                .setStyle(ButtonStyle.Success)
                .setCustomId("K"),

                new ButtonBuilder()
                .setLabel("Anime & Kpop")
                .setStyle(ButtonStyle.Success)
                .setCustomId("AK")
            );

            

            const message = await interaction.editReply({embeds: [embedWallet], components: [button]});
            const collector = await message.createMessageComponentCollector({time: 30000});

            collector.on('collect', async i => {
                if(i.user.id !== interaction.user.id){
                    return await i.reply({ content: `Only ${interaction.user.globalName} can use these buttons!`, ephemeral: true});
                } else {
                    if(i.customId === "A"){
                        await i.update({content: `**${interaction.user.globalName}** drop preference changed to **Anime**`, embeds: [], components: []})
                        userProfile.preference = i.customId;
                        collector.stop();
                    }
    
                    if(i.customId === "K"){
                        await i.update({content: `**${interaction.user.globalName}** drop preference changed to **Kpop**`, embeds: [], components: []})
                        userProfile.preference = i.customId;
                        collector.stop()
                    }
    
                    if(i.customId === "AK"){
                        await i.update({content: `**${interaction.user.globalName}** drop preference changed to **Anime & Kpop**`, embeds: [], components: []})
                        userProfile.preference = i.customId;
                        collector.stop()
                    }
                }
            })

            collector.on('end', async i => {
                userProfile.save();
                return;
            })


        } catch(error){
            console.log(`Error handling /preference: ${error}`)
        }
    }
}