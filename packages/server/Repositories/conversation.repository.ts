type Message = {
   role: "user" | "assistant";
   content: string;
};

//Implemetation Detail
const conversationHistory = new Map<string, Message[]>();

export const conversationRepository = {
   getLastResponseId(consersationId: string) {
      return conversationHistory.get(consersationId);
   },
   setLastResponseId(conversationId: string, history: Message[]) {
      return conversationHistory.set(conversationId, history);
   },
};

//Export public interface of the module
// export function

// export function
