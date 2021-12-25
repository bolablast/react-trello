import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  //선택제한 없애자 ㅋ
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    ToDo: [],
    Doing: [],
    Done: [],
  },
});
