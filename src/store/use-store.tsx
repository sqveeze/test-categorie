import React from "react";
import {categories, ICategorie} from "./categories";

interface IStoreContext {
  categorieList: ICategorie[];
  setCategorieList: React.Dispatch<React.SetStateAction<ICategorie[]>>;
}

const StoreContext = React.createContext<IStoreContext>({} as IStoreContext);

export const ProvideStore: React.FC = ({children}): JSX.Element => {
  const store = useProvideStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return React.useContext(StoreContext);
};

const useProvideStore = (): IStoreContext => {
  const [categorieList, setCategorieList] =
    React.useState<ICategorie[]>(categories);

  return {
    categorieList,
    setCategorieList,
  };
};
