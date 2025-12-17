import { Mistral } from "@mistralai/mistralai";

const client = new Mistral({
   apiKey: process.env.MISTRALAI_API_KEY,
});

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   temperature?: number;
   maxTokens?: number;
};

export const llmClient = {
   async generateText({
      model = "mistral-large-latest",
      prompt,
      temperature = 0.2,
      maxTokens = 300,
   }: GenerateTextOptions) {
      const response = await client.chat.complete({
         model,
         messages: [
            {
               role: "user",
               content: prompt,
            },
         ],
         temperature,
         maxTokens: maxTokens,
      });
      const content = response.choices[0]?.message.content;

      // Handle both string and array safely but simply
      const message = Array.isArray(content)
         ? content.join("") // Join all parts into a single string
         : content || ""; // Use string directly or empty if null/undefined

      return message;
   },
};
