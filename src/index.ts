import {Telegraf} from 'telegraf';
import {config} from 'dotenv';
import {
  init,
  synthesizeSpeech,
} from './feature/text-to-speech/controller/middlewares';
import {acl} from './feature/iam/controller/middlewares';
import {IBotContext} from './IBotContext';

config();

const {TELEGRAM_TOKEN} = process.env;

if (!TELEGRAM_TOKEN) {
  throw new Error(
    'Telegram token not found. Please specify the "TELEGRAM_TOKEN" environment variable"'
  );
}

const bot = new Telegraf<IBotContext>(TELEGRAM_TOKEN);

bot.use(init);

bot.on('text', acl, synthesizeSpeech);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
