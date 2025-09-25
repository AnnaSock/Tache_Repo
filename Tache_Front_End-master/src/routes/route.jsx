import {Routes, Route} from "react-router-dom"
import PageConnexion from "../components/connexions/PageConnexion"
import PageInscription from "../components/inscriptions/PageInscription"
import UserTache from "../components/userTache/UserTask"


export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<PageConnexion/>}></Route>
      <Route path="/inscription" element={<PageInscription/>}></Route>
      <Route path="/userTache" element={<UserTache/>}></Route>
    </Routes>
  )
}
