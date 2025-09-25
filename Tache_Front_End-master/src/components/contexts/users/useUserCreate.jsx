import { createContext } from "react";
import { useContext } from "react";
// import  UserCreateContext  from "../createContext/Context";

export const UserCreateContext=createContext()

export default function useUserCreate() {
  const context = useContext(UserCreateContext);
  if (!context) throw new Error("le composant n'est pas dans le contexte");
  return context;
}
