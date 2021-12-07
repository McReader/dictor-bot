import {TextToSpeechClient, protos} from '@google-cloud/text-to-speech';

import {ITextToSpeech} from './ITextToSpeech';

const {GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = '{}'} = process.env;

export class GoogleTextToSpeech implements ITextToSpeech {
  private static readonly REQUEST_TIMEOUT = 30 * 1000; // 30s

  // Add one or more effects profiles to array.
  // Refer to documentation for more details:
  // https://cloud.google.com/text-to-speech/docs/audio-profiles
  private static readonly EFFECTS_PROFILE_ID = [
    'headphone-class-device',
    'handset-class-device',
  ];

  private readonly client: TextToSpeechClient = new TextToSpeechClient({
    credentials: JSON.parse(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS),
  });

  async synthesizeSpeech(text: string): Promise<Buffer> {
    const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
      {
        input: {text},
        voice: {
          languageCode: 'ru-RU',
          ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.MALE,
        },
        audioConfig: {
          audioEncoding:
            protos.google.cloud.texttospeech.v1.AudioEncoding.OGG_OPUS,
          effectsProfileId: GoogleTextToSpeech.EFFECTS_PROFILE_ID,
        },
      };

    const [{audioContent}] = await this.client.synthesizeSpeech(request, {
      timeout: GoogleTextToSpeech.REQUEST_TIMEOUT,
    });

    if (!audioContent) {
      throw new Error('Audio content not found');
    }

    return Buffer.from(audioContent);
  }
}
