import { Mic, Square } from "lucide-react"
import useUserTask from "../contexts/userTasks/useUserTask"

export default function Audio() {
  const {isRecording,startRecording,stopRecording,audioUrl}=useUserTask()  

  return (
    <div className="flex items-center justify-evenly gap-3">
        <div>
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="bg-black text-white rounded-full p-3"
                  aria-label="Démarrer l'enregistrement vocal"
                >
                  <Mic size={24} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700"
                  aria-label="Arrêter l'enregistrement"
                >
                  <Square size={24} />
                </button>
              )}
            </div>

            {/* Aperçu audio si disponible */}
            {audioUrl && (
              <div>
                <audio controls src={audioUrl} />
              </div>
            )}
    </div>
  )
}
