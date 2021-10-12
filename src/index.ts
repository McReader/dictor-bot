import {Telegraf} from 'telegraf';
import {config} from 'dotenv';
import {middlewares as textToSpeech} from './feature/text-to-speech';
import {middlewares as iam} from './feature/iam';
import {IBotContext} from './IBotContext';

config();

const {TELEGRAM_TOKEN} = process.env;

if (!TELEGRAM_TOKEN) {
  throw new Error(
    'Telegram token not found. Please specify the "TELEGRAM_TOKEN" environment variable"'
  );
}

const bot = new Telegraf<IBotContext>(TELEGRAM_TOKEN);

bot.use(textToSpeech.init);

bot.on('text', iam.acl, textToSpeech.synthesizeSpeech);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
