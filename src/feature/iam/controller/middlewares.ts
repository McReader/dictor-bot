import {Telegraf} from 'telegraf';

const {USERS_WHITELIST = ''} = process.env;

/**
 * Access Control List middleware
 * Prevents users not from the whitelist accessing next middlewares
 */
export const acl = Telegraf.acl(
  USERS_WHITELIST.split(',').map(Number),
  Telegraf.passThru()
);
