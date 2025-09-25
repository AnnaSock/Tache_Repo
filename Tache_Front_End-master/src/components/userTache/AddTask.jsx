import {  Plus } from "lucide-react";
import useUserTask from "../contexts/userTasks/useUserTask";
import Audio from "./Audio";

export default function AddTask() {
  const {
    isLoading,
    editingTask,
    cancelEdit,
    onSubmit,
    formData,
    setFormData,
  } = useUserTask();

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
      <div className="backdrop-blur-md bg-gray-300 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Plus size={24} />
          Nouvelle Tâche
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium opacity-80">
                Titre
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, titre: e.target.value }))
                }
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-black outline-none py-3 placeholder-gray-600"
                placeholder="Titre de la tâche"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium opacity-80">
                État
              </label>
              <select
                value={formData.statut}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, statut: e.target.value }))
                }
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-black outline-none py-3"
              >
                <option value="A_FAIRE">À Faire</option>
                <option value="EN_COURS">En Cours</option>
                <option value="TERMINER">Terminé</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium opacity-80">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full bg-transparent border-b-2 border-gray-700 focus:border-black outline-none py-3 placeholder-gray-600 resize-none"
              placeholder="Description détaillée"
              rows=""
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium opacity-80">Date de début</label>
              <input
                type="date"
                value={formData.dateDebut || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value }))}
                max={formData.dateFin || undefined}
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-black outline-none py-3"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium opacity-80">Date de fin</label>
              <input
                type="date"
                value={formData.dateFin || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value }))}
                min={formData.dateDebut || undefined}
                className="w-full bg-transparent border-b-2 border-gray-700 focus:border-black outline-none py-3"
              />
            </div>
          </div>
          <div className="flex items-center justify-evenly">
                <Audio></Audio>
          </div>
          <div className="flex gap-4 pt-6">
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="flex-1 bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition rounded-full py-3 font-semibold"
            >
              {isLoading
                ? "Enregistrement..."
                : editingTask
                ? "Modifier"
                : "Ajouter"}
            </button>
            <button
              onClick={cancelEdit}
              className="flex-1 bg-white bg-opacity-70 text-black hover:bg-opacity-90 transition rounded-full py-3 font-semibold"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
