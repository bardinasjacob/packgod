import { AutoRouter } from 'itty-router';
import {
  InteractionType,
  InteractionResponseType,
  verifyKey,
} from 'discord-interactions';

const router = AutoRouter()

export default {

  async fetch(request, env) {
    if (request.method === 'POST') {
      const signature = request.headers.get('x-signature-ed25519');
      const timestamp = request.headers.get('x-signature-timestamp');
      const body = await request.text();
      const isValid = await verifyKey(body, signature, timestamp, env.PUBLIC_KEY);
      console.log('hello')
      if (!isValid) {
        console.error('Invalid Request');
        return new Response('Bad request signature.', { status: 401 });
      }
      console.log('goodbye')

      return router.handle(request, env);
    }
  }
}

router.post('/', async (request, env) => {
  console.log("reached line 37")
  // const message = await request.json();
  // console.log(message.type)
  // if (message.type === InteractionType.PING) {
  //   console.log('Handling Ping request');
  //   return new Response(JSON.stringify({
  //     type: InteractionResponseType.PONG,
  //   }), {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }

  // if (message.type === InteractionType.APPLICATION_COMMAND) {
  //   const name = message.data.name;

  //   if (name === 'pack') {
  //     return new Response(JSON.stringify({
  //       type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  //       data: {
  //         content: pickRoast(),
  //       },
  //     }), {
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //   }

  //   return new Response('Unhandled interaction type', { status: 400 });
  // }
})




function pickRoast() {
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

  return packgodRoasts[Math.floor(Math.random() * packgodRoasts.length)]
};