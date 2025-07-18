export type WSMessage =
  | {
      type: "system";
      body: string;
    }
  | {
      type: "join";
      channel: string;
      username: string;
    }
  | {
      type: "leave";
      channel: string;
      username: string;
    }
  | {
      type: "message";
      channel: string;
      authorId: string;
      username: string;
      body: string;
      sentAt: number;
    };

export type ClientInfo = {
  channel: string;
  username: string;
};
