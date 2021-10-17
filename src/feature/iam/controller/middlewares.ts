import {Telegraf} from 'telegraf';

const {USERS_WHITELIST = ''} = process.env;

const whitelistMap = USERS_WHITELIST.split(',')
  .map(Number)
  .reduce<Record<number, boolean>>((result, value) => {
    result[value] = true;
    return result;
  }, {});

/**
 * Access Control List middleware
 * Prevents users not from the whitelist accessing next middlewares
 */
export const acl = Telegraf.branch(
  ctx => {
    const fromId = ctx.from?.id;

    if (!fromId) {
      return false;
    }

    const isWhitelisted = Object.prototype.hasOwnProperty.call(
      whitelistMap,
      fromId
    );

    return isWhitelisted;
  },
  Telegraf.passThru(),
  Telegraf.reply('Insufficient permissions')
);
