import { useContext } from "react";
import { createContext } from "react";



export const UserTaskContext= createContext()


export default function useUserTask(){
    const context= useContext(UserTaskContext)
    if(!context) throw new Error("Le component n'est pas dans le contexte du provider")
    return context    
}