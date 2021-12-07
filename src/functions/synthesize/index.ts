import {HttpFunction} from '@google-cloud/functions-framework';
import {bot} from './bot';

export const synthesize: HttpFunction = (req, res) => {
  bot.handleUpdate(req.body, res);
};
