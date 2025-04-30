import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
  {
    name: 'pack',
    description: 'Get a random packgod line',
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash command...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Slash command registered successfully!');
  } catch (error) {
    console.error('Error registering command:', error);
  }
})();