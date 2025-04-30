import 'dotenv/config';
import express from 'express';
import {
    InteractionResponseFlags,
    InteractionResponseType,
    InteractionType,
    MessageComponentTypes,
    verifyKeyMiddleware,
  } from 'discord-interactions';

const packgod = express();

const PORT = process.env.PORT || 8080;

packgod.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
    const { id, type, data } = req.body;

    if (type === InteractionType.PING) {
        return res.send({
            type: InteractionResponseType.PONG,
        });
    }

    if (type === InteractionType.APPLICATION_COMMAND){
        const { name } = data

        if(name === "pack"){
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Pick a random packgod line`,
                },
            });
        }

        console.error(`unknown command: ${name}`);
        return res.status(400).json({ error: 'unknown command' });
    }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });

    
})

packgod.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });