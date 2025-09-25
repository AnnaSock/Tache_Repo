import { createContext } from "react"
import { useContext } from "react"
// import  AuthContext  from "../../../createContext/Context.jsx"

export const AuthContext=createContext()

export default function useAuth() {
        const context = useContext(AuthContext)
        if(!context) throw new Error("Le composant n'est pas dans le contexte")
            return context
}