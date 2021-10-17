import {Context} from 'telegraf';

import {ITextToSpeech} from '../service/ITextToSpeech';

export interface ITextToSpeechContext extends Context {
  textToSpeech: ITextToSpeech;
}
