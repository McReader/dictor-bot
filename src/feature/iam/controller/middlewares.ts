import {Telegraf} from 'telegraf';

const {USERS_WHITELIST = ''} = process.env;

export const acl = Telegraf.acl(
  USERS_WHITELIST.split(',').map(Number),
  Telegraf.passThru()
);
