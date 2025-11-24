// store/useBearStore.ts
import { create } from "zustand";
import type { Routes } from "../App";

interface IRouteStore {
  route: Routes[];
  setRoute: (route: Routes) => void;
  goback: () => void;
}

const useRouteStore = create<IRouteStore>((set) => ({
  route: ["selectProject"],
  setRoute: (route: Routes) =>
    set((state) => ({ route: [...state.route, route] })),
  goback: () =>
    set((state) => {
      const currentArr = state.route;
      currentArr.pop();
      console.log(currentArr);
      return { route: [...currentArr] };
    }),
}));

export default useRouteStore;
