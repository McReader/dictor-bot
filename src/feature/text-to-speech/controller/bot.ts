import {Composer} from 'telegraf';

import {middlewares} from '../../iam';

import {GoogleTextToSpeech} from '../service/GoogleTextToSpeech';

import {ITextToSpeechContext} from './ITextToSpeechContext';

export const textToSpeechBot = new Composer<ITextToSpeechContext>();

textToSpeechBot.use((ctx, next) => {
  ctx.textToSpeech = new GoogleTextToSpeech();
  return next();
});

textToSpeechBot.use(middlewares.acl);

textToSpeechBot.on('text', async ctx => {
  ctx.replyWithChatAction('record_voice');

  const source = await ctx.textToSpeech.synthesizeSpeech(ctx.message.text);

  ctx.replyWithChatAction('upload_voice');

  ctx.replyWithVoice({source});
});
