const {Client, ActivityType} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '');

        if(mongoose.connect){
            console.log('MongoDB connection successful.');
        }

        console.log(`${client.user.username} is now online.`)

        const numberGuilds = client.guilds.cache.size;
        //discord presence
        client.user.setPresence({
            activities: [{name: `Best Gacha Bot | ${numberGuilds} servers`, type: ActivityType.Custom}],
            status: 'dnd',
        });
    }
}