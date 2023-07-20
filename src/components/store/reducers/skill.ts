import { ISkill } from "@/models/skill";
import { AppState, Action } from "..";

export enum skillActionType {
  SKILL_ADD = "Add skill",
  SKILL_UPDATE = "Update skill",
  SKILL_DELETE = "Delete skill",
  SKILL_FETCH = "Get all skils",
  SKILL_LOADING = "Start loading",
}

export type SkillState = {
  loading: boolean;
  skill: null | ISkill;
  skills: ISkill[];
};
export const skillState = {
  loading: false,
  skill: null,
  skills: [],
};

const reducer = (
  state = AppState,
  action: Action<skillActionType, SkillState>
) => {
  switch (action.type) {
    case skillActionType.SKILL_LOADING:
      return {
        ...state.skillState,
        loading: action.payload,
      };
    case skillActionType.SKILL_ADD:
      return {
        ...state.skillState,
      };
      return state;
  }
};
