import {Context} from 'telegraf';
import {ITextToSpeech} from '../text-to-speech';

export interface IBotContext extends Context {
  textToSpeech: ITextToSpeech;
}
