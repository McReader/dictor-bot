import {NarrowedContext, Types, Middleware} from 'telegraf';

import {IBotContext} from '../../../IBotContext';

import {GoogleTextToSpeech} from '../service/GoogleTextToSpeech';

export const init: Middleware<IBotContext> = (ctx, next) => {
  ctx.textToSpeech = new GoogleTextToSpeech();
  return next();
};

export const synthesizeSpeech: Middleware<
  NarrowedContext<IBotContext, Types.MountMap['text']>
> = async ctx => {
  ctx.replyWithChatAction('record_voice');

  const source = await ctx.textToSpeech.synthesizeSpeech(ctx.message.text);

  ctx.replyWithChatAction('upload_voice');

  ctx.replyWithVoice({
    source,
  });
};
