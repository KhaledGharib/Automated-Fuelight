"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface StateContextProps {
  displayCount: number | null;
  activeCount: number | null;
  inactiveCount: number | null;
  loading: boolean;
}

const StateContext = createContext<StateContextProps>({
  displayCount: null,
  activeCount: null,
  inactiveCount: null,
  loading: true,
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useUser();
  const [displayCount, setDisplayCount] = useState<number | null>(null);
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [inactiveCount, setInactiveCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.sub) {
        const ownerId = user.sub.replace("auth0|", "");
        try {
          const res = await fetch("/api/count", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ownerId }),
          });

          const data = await res.json();
          const displayLength = data.length;
          setDisplayCount(displayLength);
          const activeCount = data.filter(
            (display: { isActive: any }) => display.isActive
          ).length;
          setActiveCount(activeCount);

          const inactiveCount = displayLength - activeCount;
          setInactiveCount(inactiveCount);
          setLoading(false);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData().catch(console.error);
  }, [user]);

  return (
    <StateContext.Provider
      value={{ displayCount, activeCount, inactiveCount, loading }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
