import { CheckCircle2, Circle, Edit3, Trash2 } from "lucide-react";

export default function UserTaskCard({ tache }) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {/* Exemple de tâche */}
      <div className="bg-[#F0F0F0] bg-opacity-90 backdrop-blur-sm rounded-lg p-4 border border-gray-300 hover:bg-opacity-100 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button className="mt-1 text-gray-600 hover:text-black transition-colors">
              <CheckCircle2 size={20} className="text-green-600" />
            </button>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                {tache.titre}
              </h3>
              <p className="text-sm mb-3 text-gray-600">{tache.description}</p>

              <div className="flex items-center space-x-3 mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border text-blue-600 bg-blue-50 border-blue-200">
                  <Circle size={16} className="text-blue-600" />
                  {tache.statut}
                </span>

                {/* Dates affichées si présentes */}
                {tache.dateDebut && (
                  <span className="text-xs text-gray-500">
                    Début : {new Date(tache.dateDebut).toLocaleDateString()}
                  </span>
                )}
                {tache.dateFin && (
                  <span className="text-xs text-gray-500">
                    Fin : {new Date(tache.dateFin).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Lecteur audio s'il y a un enregistrement */}
              {tache.audioPath && (
                <audio  controls className="w-full rounded mt-2">
                  <source src={tache.audioPath} type="audio/webm" />
                  <source
                    src={tache.audioPath.replace(".webm", ".mp3")}
                    type="audio/mp3"
                  />
                  Votre navigateur ne supporte pas la lecture audio.
                </audio>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <Edit3 size={16} />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
