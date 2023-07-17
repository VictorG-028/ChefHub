import { Configuration, OpenAIApi } from "openai";

// https://github.com/openai/openai-node
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default class Consume_GPT_API {

  static async get_GPT_response(prompt: string): Promise<string> {

    // const jsonBody = JSON.stringify({
    //   "model": "gpt-3.5-turbo",
    //   "messages": [
    //     {
    //       "role": "user",
    //       "content": prompt
    //     }
    //   ],
    //   "temperature": 0,
    // });

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0
    });
    const message = chatCompletion.data.choices[0].message;

    if (!message || !message.content) {
      return "Error: response is undefined"
    }

    return message.content;
  }
}
