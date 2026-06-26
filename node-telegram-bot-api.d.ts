declare module "node-telegram-bot-api" {
  export interface Chat {
    id: number;
  }

  export interface Message {
    chat: Chat;
    text?: string;
  }

  export interface TelegramBotOptions {
    polling?: boolean;
  }

  export default class TelegramBot {
    constructor(token: string, options?: TelegramBotOptions);
    onText(regexp: RegExp, callback: (msg: Message) => void): void;
    on(event: "message", callback: (msg: Message) => void): void;
    sendMessage(chatId: number, text: string): Promise<unknown>;
  }
}
