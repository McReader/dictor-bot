import {Composer} from 'telegraf';

import {ITextToSpeechContext} from './ITextToSpeechContext';

import {GoogleTextToSpeech} from '../service/GoogleTextToSpeech';

export const textToSpeechBot = new Composer<ITextToSpeechContext>();

textToSpeechBot.use((ctx, next) => {
  ctx.textToSpeech = new GoogleTextToSpeech();
  return next();
});

textToSpeechBot.on('text', async ctx => {
  ctx.replyWithChatAction('record_voice');

  const source = await ctx.textToSpeech.synthesizeSpeech(ctx.message.text);

  ctx.replyWithChatAction('upload_voice');

  ctx.replyWithVoice({source});
});
