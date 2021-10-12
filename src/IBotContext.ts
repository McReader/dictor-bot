import {Context} from 'telegraf';
import {ITextToSpeech} from './feature/text-to-speech';

export interface IBotContext extends Context {
  textToSpeech: ITextToSpeech;
}
