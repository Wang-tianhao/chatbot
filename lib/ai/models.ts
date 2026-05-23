export const DEFAULT_CHAT_MODEL = "gemini-3.1-pro-preview";

export const titleModel = {
  id: "gemini-3.5-flash",
  name: "Gemini 3.5 Flash",
  provider: "google",
  description: "Fast model for title generation",
};

export type ModelCapabilities = {
  tools: boolean;
  vision: boolean;
  reasoning: boolean;
};

export type ChatModel = {
  id: string;
  name: string;
  provider: string;
  description: string;
  reasoningEffort?: "none" | "minimal" | "low" | "medium" | "high";
};

export const chatModels: ChatModel[] = [
  {
    id: "gemini-3.1-pro-preview",
    name: "Gemini 3.1 Pro",
    provider: "google",
    description: "Google flagship multimodal model with strong reasoning",
  },
  {
    id: "gemini-3.5-flash",
    name: "Gemini 3.5 Flash",
    provider: "google",
    description: "Fast multimodal model with tool use",
  },
];

const CAPABILITIES: Record<string, ModelCapabilities> = {
  "gemini-3.1-pro-preview": { tools: true, vision: true, reasoning: true },
  "gemini-3.5-flash": { tools: true, vision: true, reasoning: true },
};

export function getCapabilities(): Record<string, ModelCapabilities> {
  return CAPABILITIES;
}

export function getActiveModels(): ChatModel[] {
  return chatModels;
}

export const allowedModelIds = new Set(chatModels.map((m) => m.id));

export const modelsByProvider = chatModels.reduce(
  (acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  },
  {} as Record<string, ChatModel[]>
);
