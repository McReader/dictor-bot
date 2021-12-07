export interface ITextToSpeech {
  synthesizeSpeech(text: string): Promise<Buffer>;
}
