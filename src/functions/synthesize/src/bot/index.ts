import {Telegraf} from 'telegraf';
import {config} from 'dotenv';

import {GoogleTextToSpeech, ITextToSpeech} from '../text-to-speech';

import {IBotContext} from './IBotContext';

config();

const {TELEGRAM_TOKEN} = process.env;

if (!TELEGRAM_TOKEN) {
  throw new Error(
    'Telegram token not found. Please specify the "TELEGRAM_TOKEN" environment variable"'
  );
}

export const bot = new Telegraf<IBotContext>(TELEGRAM_TOKEN);
let textToSpeech: ITextToSpeech;

bot.on('text', async ctx => {
  await ctx.replyWithChatAction('record_voice');

  if (!textToSpeech) {
    textToSpeech = new GoogleTextToSpeech();
  }

  let source: Buffer;

  try {
    source = await textToSpeech.synthesizeSpeech(ctx.message.text);
  } catch (e) {
    console.error(e);
    return;
  }

  await ctx.replyWithChatAction('upload_voice');

  await ctx.replyWithVoice({source});
});
