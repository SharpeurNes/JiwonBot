const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../../Models/userProfile');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Create your account, for new player only!"),

    async execute(interaction, client){

        try{
            await interaction.deferReply()
            
            let userProfile = await UserProfile.findOne({
                userId: interaction.member.id,
            });

            if(userProfile){
                interaction.editReply("You already have an account !");
                return;
            } else {
                userProfile = new UserProfile({
                    userId: interaction.member.id,
                });
            }

            await userProfile.save();

            interaction.editReply(`Welcome **${interaction.member.displayName}** to the game ! Try the command /help for more information.`);

        } catch(error){
            console.log(`Error handling /register: ${error}`)
        }

    }
}