// store/useBearStore.ts
import { create } from "zustand";

export interface IProject {
  id: string;
  accessObject: string;
  businessName: string;
  platform: "Instagram" | "Threads" | "Youtube" | "X";
  updatedAt: string;
  createdTime: string;
}

export interface IPromptValue {
  contentId: string;
  prompt: string[];
  promptContentType: string[];
  promptId: string[];
  promptName: string[];
  promptPlatform: string[];
  promptStatus: string[];
  judge: "ready" | "fail" | "pass";
  text: string;
  id: string;
  createdTime: string;
  review: string;
  judegeReason: string;
  queue: string[];
  link: string;
}

export interface IPrompt {
  ask: string; // 프롬포트
  system: string; // 시스템프롬포트
  constantSystem: string;
  content: string[];
  contentType: string;
  formType: "text" | "shortform" | "longform" | "carousel";
  llm: "GPT" | "GEMINI";
  model: string;
  name: string;
  platform: "Youtube" | "Threads" | "X" | "Instagram";
  promptId: string;
  status: "live" | "die";
  createdTime: string;
  id: string;
}

interface IRouteStore {
  selectPrompt: Partial<IPrompt>;
  setSelectPrompt: (prompt: Partial<IPrompt>) => void;

  prompts: IPrompt[];
  setPrompts: (prompt: IPrompt[]) => void;

  promptValues: IPromptValue[];
  setPromptValues: (route: IPromptValue[]) => void;

  newPropmt: Partial<IPrompt>;
  setNewPrompt: (promptObj: Partial<IPrompt>) => void;

  projects: IProject[];
  setProjects: (projects: IProject[]) => void;

  selectProject: Partial<IProject>;
  setSelectProject: (pj: Partial<IProject>) => void;

  systemPromptGuard: boolean;
  setSystemPromptGuard: (bool: boolean) => void;
}

const usePromptStore = create<IRouteStore>((set) => ({
  selectPrompt: {},
  setSelectPrompt: (prompt) =>
    set((state) => ({ selectPrompt: { ...state.selectPrompt, ...prompt } })),

  prompts: [],
  setPrompts: (prompt) => set(() => ({ prompts: prompt })),

  promptValues: [],
  setPromptValues: (promptList) => set(() => ({ promptValues: promptList })),

  newPropmt: {},
  setNewPrompt: (promptObj) =>
    set((state) => ({
      newPropmt: {
        ...state.newPropmt,
        ...promptObj,
      },
    })),

  projects: [],
  setProjects: (project) => set(() => ({ projects: [...project] })),

  selectProject: {},
  setSelectProject: (pj) =>
    set((state) => ({ selectProject: { ...state.projects, ...pj } })),

  systemPromptGuard: true,
  setSystemPromptGuard: (bool) => set(() => ({ systemPromptGuard: bool })),
}));

export default usePromptStore;
