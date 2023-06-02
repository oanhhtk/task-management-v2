import { createContext, useState } from "react";

type BoardContextType = {
  activeId?: string;
  setActiveId?: (string: string) => void;
  // ...
};
export const BoardContext = createContext<BoardContextType>({});

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
