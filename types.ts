
export type Role = 'user' | 'model';

interface TextPart {
  text: string;
  inlineData?: never;
}

interface InlineDataPart {
  text?: never;
  inlineData: {
    mimeType: string;
    data: string;
  };
}

export type Part = TextPart | InlineDataPart;

export interface Message {
  role: Role;
  parts: Part[];
}
