import { Mistral } from "@mistralai/mistralai";
import { conversationRepository } from "../Repositories/conversation.repository";

// create a new instance of MistralAI
const client = new Mistral({
   apiKey: process.env.MISTRALAI_API_KEY,
});

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      let history =
         conversationRepository.getLastResponseId(conversationId) || [];
      console.log(history);
      // Pushing user message
      history.push({
         role: "user",
         content: prompt,
      });

      const response = await client.chat.complete({
         model: "mistral-large-latest",
         messages: history,
         temperature: 0.2,
         maxTokens: 50,
      });

      // Extracting the assistant message to check if there exists messages
      const content = response.choices[0]?.message.content;

      // Handle both string and array safely but simply
      const message = Array.isArray(content)
         ? content.join("") // Join all parts into a single string
         : content || ""; // Use string directly or empty if null/undefined

      // Push only if not empty
      if (message.trim()) {
         history.push({ role: "assistant", content: message });
      }

      // Save back to map
      conversationRepository.setLastResponseId(conversationId, history);
      return {
         id: response.id,
         message: message,
      };
   },
};
