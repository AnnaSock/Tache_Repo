import { Trash2 } from "lucide-react"
export default function DeleteTask() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
            <div className="backdrop-blur-md bg-gray-300 rounded-lg p-8 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trash2 size={20} className="text-red-600" />
                Confirmer la suppression
              </h3>
              <p className="text-gray-700 mb-6">
                Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.
              </p>
              <div className="flex gap-4">
                <button
                  className="flex-1 bg-red-600 bg-opacity-70 text-white hover:bg-opacity-90 transition rounded-full py-3 font-semibold"
                >
                  Supprimer
                </button>
                <button
                  className="flex-1 bg-white bg-opacity-70 text-black hover:bg-opacity-90 transition rounded-full py-3 font-semibold"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
  )
}
