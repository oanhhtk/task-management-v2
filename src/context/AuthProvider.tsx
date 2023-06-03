import { Spin } from "antd";
import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

type AuthContextType = {
  user?: any;
  setUser?: (user: any) => void;
};
export const AuthContext = createContext<AuthContextType>({});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user: any) => {
      console.log("[From AuthProvider]", { user });
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          // window.location.reload();
        }
        setIsLoading(false);
        return;
      }

      // reset user info
      console.log("reset");
      setIsLoading(false);
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubcribed();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loading loading /> : <>{children}</>}
    </AuthContext.Provider>
  );
}
