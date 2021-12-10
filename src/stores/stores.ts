import { atom } from "recoil";

export const isOpenState = atom<boolean>({
  key: "isOpenState",
  default: false,
});
