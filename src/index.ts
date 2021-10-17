import {Telegraf} from 'telegraf';
import {config} from 'dotenv';
import {textToSpeechBot} from './feature/text-to-speech';
import {IBotContext} from './IBotContext';

config();

const {DOMAIN, PORT, TELEGRAM_TOKEN} = process.env;

if (!TELEGRAM_TOKEN) {
  throw new Error(
    'Telegram token not found. Please specify the "TELEGRAM_TOKEN" environment variable"'
  );
}

const bot = new Telegraf<IBotContext>(TELEGRAM_TOKEN);

bot.use(textToSpeechBot);

bot.launch({
  webhook: {
    domain: DOMAIN,
    port: Number(PORT),
  },
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
