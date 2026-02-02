import axios from "axios";
import { BiSolidSend } from "react-icons/bi";
import { GoEyeClosed } from "react-icons/go";
import { IoWarningOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import TypingIndicator from "./TypingIndicator";

interface FormData {
   prompt: string;
}

interface ChatResponse {
   message: string;
}

interface Message {
   content: string;
   role: "user" | "bot";
}

const ChatBot = () => {
   const [warning, setWarning] = useState(false);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const formRef = useRef<HTMLDivElement | null>(null);
   const [error, setError] = useState("");
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   useEffect(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const onSubmit = async ({ prompt }: FormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
         setIsBotTyping(true);
         setError("");
         reset({ prompt: "" });
         // console.log(data);
         const { data } = await axios.post<ChatResponse>("/api/chat", {
            prompt,
            userId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: "bot" },
         ]);
      } catch (error) {
         console.log(error);
         setError("Something went wrong! try again later.");
      } finally {
         setIsBotTyping(false);
      }
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   const onClickWarning = () => {
      setWarning(true);
   };

   return (
      <>
         <div className="flex gap-2">
            {
               <IoWarningOutline
                  className="text-amber-400 text-3xl cursor-pointer"
                  onClick={onClickWarning}
               />
            }
            <div
               className={`border-1 items-end rounded-xl p-1 bg-amber-300 ${warning ? "block" : "hidden"}`}
            >
               <div className="flex gap-2 ">
                  <GoEyeClosed
                     className="text-black text-2xl cursor-pointer"
                     onClick={() => setWarning(false)}
                  />
                  <span>
                     .The output of this chat is approximately 50 tokens (around
                     200 characters). To obtain the desired result within this
                     limit, it is recommended to provide a clear and concise
                     prompt.
                  </span>
               </div>
            </div>
         </div>
         {/* Logic for messages */}
         <div className="flex flex-col h-full">
            {/* CHAT AREA (scrollable) */}
            <div className="flex flex-col gap-3 flex-1 mb-10 overflow-y-auto">
               {messages.map((message, index) => (
                  <div
                     ref={index === messages.length - 1 ? formRef : null}
                     key={index}
                     className={`px-3 py-1 rounded-xl ${
                        message.role === "user"
                           ? "bg-blue-600 self-end"
                           : "bg-gray-400 text-black self-start"
                     }`}
                  >
                     <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
               ))}

               {isBotTyping && <TypingIndicator />}
               {error && <p className="text-red-600">{error}</p>}
            </div>

            {/* INPUT AREA (fixed at bottom) */}
            <form
               onSubmit={handleSubmit(onSubmit)}
               onKeyDown={onKeyDown}
               className="flex flex-col gap-2 items-end border-2 border-gray-400 bg-white p-4 rounded-3xl shadow-md"
            >
               <textarea
                  {...register("prompt", {
                     required: true,
                     validate: (data) => data.trim().length > 0,
                  })}
                  autoFocus
                  className="w-full border-0 focus:outline-none resize-none"
                  placeholder="Ask Anything"
                  maxLength={300}
               />

               <Button
                  disabled={!formState.isValid}
                  className="rounded-full w-9 h-9"
               >
                  <BiSolidSend />
               </Button>
            </form>
         </div>
      </>
   );
};

export default ChatBot;
