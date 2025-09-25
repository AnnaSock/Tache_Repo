import { UserPlus, ArrowRight } from "lucide-react";
import useUserCreate from "../contexts/users/useUserCreate";
import Upload from "./Upload";
import DynamicChamp from "./DynamicChamp";

export default function PageInscription() {
  const {
    user,
    error,
    handleSubmit,
    formData,
    champs1,
    champs2,
    champs3,
    champs4,
  } = useUserCreate();

  return (
    <div className="relative w-screen h-screen inset-0 bg-[#AECCD6] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent pointer-events-none"></div>

      <form
        className="relative z-10 bg-gray-300 bg-opacity-90 rounded p-10 w-full max-w-md text-gray-700 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center mb-6 gap-2">
          <UserPlus size={24} color="#A52A2A" />
          <h1 className="text-xl font-bold text-black">To Do LIST</h1>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <ArrowRight size={24} color="currentColor" />
          <h2 className="text-lg font-semibold ">Créer un compte</h2>
        </div>

        {/* --- Nom & Prénom --- */}
        <div className="flex gap-6 mb-5 mt-3">
          <DynamicChamp champs={champs1}></DynamicChamp>
        </div>

        {/* --- Email & Adresse --- */}
        <div className="flex gap-6 mb-5">
          <DynamicChamp champs={champs2}></DynamicChamp>
        </div>

        {/* --- Password & Login --- */}
        <div className="flex gap-6 mb-5">
          <DynamicChamp champs={champs3}></DynamicChamp>
        </div>

        {/* --- Téléphone & Genre --- */}
        <div className="flex gap-6 mb-5">
          <DynamicChamp champs={champs4}></DynamicChamp>
        </div>

        <div>
          <Upload></Upload>
        </div>

        {/* --- Messages --- */}
        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}
        {user && (
          <p className="mb-4 text-green-600 font-semibold text-center">
            Utilisateur créé avec succès !
          </p>
        )}

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-black rounded-full py-3 text-white font-semibold hover:bg-gray-900 transition"
          disabled={
            !formData.nom ||
            !formData.prenom ||
            !formData.email ||
            !formData.password ||
            !formData.login ||
            !formData.genre
          }
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
}
