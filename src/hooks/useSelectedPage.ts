import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./useAppContext";

export default function useSelectedPage(deps?: any) {
  const { id } = useParams<{ id: string }>();
  const { pages } = useAppContext();
  const selectedPage = useMemo(() => {
    const elem = pages.find((p) => p._id === id);
    return elem;
  }, [id, pages, deps]);
  return selectedPage;
}
