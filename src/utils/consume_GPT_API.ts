import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

// https://github.com/openai/openai-node
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default class Consume_GPT_API {

  static async get_GPT_response(
    messages: ChatCompletionRequestMessage[],
    temperature: number
  ): Promise<string> {

    const chatCompletion: any = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature
    });
    const content = chatCompletion.data.choices[0].message.content;
    // console.log(`recebeu completion`);
    // console.log(`completion ->`, content);
    // console.log("=-=--=-=-=-=-=-=-=-=-=--=--=-=-=")

    if (!content) {
      // "Error: message or message.content is undefined"
      return `{"error": "[Consume_GPT_API.get_GPT_response] Error: message or message.content is undefined"}`;
    }

    return content;
  }
}
