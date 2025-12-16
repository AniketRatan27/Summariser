import type { Request, Response } from "express";
import z from "zod";
import { chatService } from "../services/chat.service";

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, "prompt is required")
      .max(300, "prompt is exceeded (max is 300 characters)."),
   userId: z.string().uuid(),
});

export const ChatController = {
   async sendMessage(req: Request, res: Response) {
      const paserResult = chatSchema.safeParse(req.body);
      if (!paserResult.success) {
         console.log(paserResult.error.format());
         return res.status(400).json(paserResult.error.format());
      }
      // console.log(paserResult.data); //check

      const { prompt, userId } = req.body;
      console.log(prompt);
      const response = await chatService.sendMessage(prompt, userId);

      res.json({ message: response.message });
   },
};
