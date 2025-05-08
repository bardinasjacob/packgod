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
                    content: `${pickRoast()}`,
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

function pickRoast(){
    const packgodRoasts = [
        "look like shane dawson, you made your cat twirk!",
        "Buzz lightyear, yeah, your chin thick as shit!",
        "Like I'm Shane Dawson, get an animal to drink my danimal!",
        "OH MY GOD BITCH YOU BETTER GET YO GODDAMN DOMAIN EXPANSION THE DEVIL'S DOOTYHOLE LOOKING ASS THE FUCK BACK BITCH!",
        "'You' [Dream] built like a girl with some lil' thighs!",
        "TELL ME WHY I CAUGHT YOU IN THE TIKTOK RIZZ PARTY throwing it back on TURKISH QUANDALE DLNGLE FOR 15 ROBUX WITH YOUR OhoHOhoHOhoH",
        "bitch I'm about to circumcise you out of this fucking school like you're some foreskin!",
        "You tried to roast me but your mic lagged out!",
        "Your hairline playing hide-and-seek with your eyebrows!",
        "if you got that beat with your God damn moreidly obese Harley Quinn body built like a bowling pin double cheeseburger butt chin!",
        "You built like the loading screen of a Roblox obby!",
        "Boy. you got a goddamn tidal sequence on yo' head!",
        "If you don't get your Im at Burger King, with my Burger Queen, can I please get a large fry? looking ass and look at yo nipples!",
        "You shaped like the letter L after losing every argument!",
        "You eat Hot Pockets cold and think its gourmet!",
        "You so broke, you charge your phone at McDonalds and call it a date!",
        "You failed a DNA test!",
        "Your breath smells like expired Gatorade and regret!",
        "You built like a Google Slides template!",
        "You dress like your clothes got divorced and share custody of your fit!",
        "You walked into a bar and the Wi-Fi disconnected!",
        "You built like the before picture in every commercial!",
    ]

return packgodRoasts[Math.floor(Math.random() * (20)) + 1]
};