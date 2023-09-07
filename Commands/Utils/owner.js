const { SlashCommandBuilder } = require('@discordjs/builders');
const CharacterData = require('../../Models/characterData');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("owner")
    .setDescription("owner command only")
    .addStringOption(option =>
        option.setName('command')
            .setDescription('Owner Command')
            .setRequired(true)
            .addChoices(
                {name: 'AddCharacter', value: 'add_char'},
                {name: 'test2', value: 'test2'},
            ))
    .addStringOption(option =>
        option.setName('input')
            .setDescription('Input')
            .setRequired(true)),

    async execute(interaction, client){

        try{
            await interaction.deferReply()
            
            if(interaction.user.id == "865640339083624479"){
                let command = interaction.options.getString('command');
                let input = interaction.options.getString('input');
                input = input.split(':');
                if(command == "add_char"){
                    //ici c'est pour ajouter un character
                    let numberChar = await CharacterData.count();
                    if(input[2] == null){
                        interaction.editReply('Input form should be name:serie:type')
                    } else{
                        let newChar = new CharacterData({
                            charId: numberChar+1,
                            name: input[0],
                            serie: input[1],
                            type: input[2],
                        });
                        newChar.save();
                        interaction.editReply(`New character added: Id[**${newChar.uniqueId}**], Name[**${newChar.name}**], Serie[**${newChar.serie}**] and Type[**${newChar.type}**]`);
                    }
                } else if(command == "test2"){
                    //command test
                    interaction.editReply("Test !");
                }
            } else {
                interaction.editReply('Ur not the owner');
            }

        } catch(error){
            console.log(`Error handling /owner: ${error}`)
        }

    }
}