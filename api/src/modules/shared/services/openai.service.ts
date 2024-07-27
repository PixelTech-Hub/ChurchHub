// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// import axios from 'axios';

// import { Configuration, OpenAIApi } from 'openai';

// @Injectable()
// export class OpenaiService {
//   openAi = null;
//   constructor(private configService: ConfigService) {
//     const configuration = new Configuration({
//       apiKey: this.configService.get('OPENAI_API_KEY'),
//     });
//     this.openAi = new OpenAIApi(configuration);
//   }

//   // -- CHECK MESSAGE
//   private async _createModeration(input: string): Promise<boolean | object> {
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
//     };
//     const response = await axios.post(
//       'https://api.openai.com/v1/moderations',
//       { input },
//       { headers },
//     );

//     // --
//     if (response.data.results && response.data.results.length > 0) {
//       return response.data.results[0].flagged;
//     }
//     return false;
//   }

//   // -- SEND MESSAGE
//   private async _sendMessage(user: string, message: string): Promise<boolean> {
//     try {
//       const flagged = await this._createModeration(message);

//       if (!flagged) {
//         await this.openAi.createCompletion({
//           model: 'text-davinci-003',
//           prompt: message,
//           temperature: 0.7,
//           max_tokens: 800,
//           n: 1,
//           frequency_penalty: 1,
//           presence_penalty: 0,
//           user,
//         });
//       }
//       return true;
//     } catch (e) {
//       console.warn(e, message, user);
//     }
//     return false;
//   }
// }
