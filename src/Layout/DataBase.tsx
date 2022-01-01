import { useParams } from "react-router";
export default function DataBase() {
  // get id from url
  const { id } = useParams<{ id: string }>();
  return <div className={`flex flex-grow `}></div>;
}
