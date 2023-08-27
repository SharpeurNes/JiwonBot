const { SlashCommandBuilder } = require('@discordjs/builders');
const UserProfile = require('../../Models/userProfile');

const dailyAmount = 500;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Basic Daily Rewards"),

    async execute(interaction, client){

        if(!interaction.inGuild()){
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }

        try{
            await interaction.deferReply()

            let userProfile = await UserProfile.findOne({
                userId: interaction.member.id,
            });

            if(userProfile){
                const lastDailyDate = userProfile.lastDaily?.toDateString();
                const currentDate = new Date().toDateString();

                if(lastDailyDate === currentDate){
                    interaction.editReply("You have already collected your dailies today. Comeback tomorrow.");
                    return;
                }
            } else {
                interaction.editReply("You need to create an account with `/register`");
                return;
            }

            userProfile.balance += dailyAmount;
            userProfile.lastDaily = new Date();

            await userProfile.save();

            interaction.editReply(
                `${dailyAmount} was added to your balanced.\nNew balance: ${userProfile.balance}`
            );
        } catch(error){
            console.log(`Error handling /daily: ${error}`);
        }
    }
}