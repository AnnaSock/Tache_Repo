
import { Image } from "lucide-react"
import useUserCreate from "../contexts/users/useUserCreate"

export default function Upload() {
  const {handleChange, preview, fileName}= useUserCreate()
  return (
    <div>
        {/* --- Upload Photo avec aperçu --- */}
        <div className="mb-6 text-center">
          <div className="flex  gap-1 ">
            <Image size={15} color="#A52A2A" />
            <label className="block text-sm" htmlFor="fileUpload">
              Photo
            </label>
          </div>

          <div className="flex items-center justify-between mt-2">
            {/* input fichier caché */}
            <input
              type="file"
              name="photo"
              id="fileUpload"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />

            {/* Bouton visible à gauche */}
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-[#866659] text-white px-3 py-1 rounded hover:bg-[#FFA07A] transition text-sm"
            >
              Choisir un fichier
            </label>

            {/* Affichage du nom du fichier à gauche du bouton, en petit */}
            {fileName && (
              <span className="ml-4 text-gray-700 text-sm break-words max-w-xs whitespace-normal">
                {fileName}
              </span>
            )}

            {/* Aperçu à droite */}
            {preview && (
              <img
                src={preview}
                alt="Aperçu de la photo"
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-500"
              />
            )}
          </div>
        </div>

    </div>
  )
}
