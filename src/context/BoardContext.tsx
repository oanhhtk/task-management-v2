import { createContext, useState } from "react";

export const BoardContext = createContext({
  activeId: "",
  setActiveId: null,
});

export default function BoardProvier({ children }: any) {
  const [activeId, setActiveId] = useState<any>("");

  return (
    <BoardContext.Provider
      value={{
        activeId,
        setActiveId,
      }}
    >
      <>{children}</>
    </BoardContext.Provider>
  );
}
