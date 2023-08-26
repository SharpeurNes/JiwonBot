const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member){
        const {user, guild} = member;
        const welcomeChannel = member.guild.channels.cache.get('1144193269539020821');
        const welcomeMessage = `Welcome <@${member.id}> to the official JiwonBot server !`;
        const memberRole = '1144979597339918397';

        const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New member!**")
        .setDescription(welcomeMessage)
        .setColor(0x037821)
        .addFields({name:'Total members', value: `${guild.memberCount}`})
        .setTimestamp();

        welcomeChannel.send({embeds: [welcomeEmbed]});
        member.roles.add(memberRole);
    }
}