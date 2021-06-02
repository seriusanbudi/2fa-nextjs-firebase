import { AppContext } from "pages/_app";
import { useContext } from "react";

export const useCurrentUser = () => {
  const { currentUser = null } = useContext(AppContext);

  return { ...currentUser };
};
