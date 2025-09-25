import {
  ListTodo,
  Plus,
  Edit3,
  Trash2,
  Filter,
  CheckCircle2,
  Circle,
  AlertCircle,
  LogOut,
} from "lucide-react";
import UserTaskCard from "./UserTaskCard";
import DeleteTask from "./DeleteTask";
import useUserTask from "../contexts/userTasks/useUserTask";
import UserTaskList from "./UserTaskList";
import Pagination from "./Pagination";
import AddTask from "./AddTask";

export default function UserTache() {
  const {
    showAddForm,
    setShowAddForm,
    currentPage,
    totalPages,
    setCurrentPage,
    totalTaches,
    setCurrentFilter,
    currentFilter,
    tachesTab,
    deconnecter,
    user
  } = useUserTask();
  const filters = [
    { key: "all", label: "Toutes" },
    { key: "A_FAIRE", label: "À Faire" },
    { key: "EN_COURS", label: "En cours" },
    { key: "TERMINER", label: "Terminées" },
  ];
  return (
    <div className="relative w-screen h-screen font-sans">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-[#AECCD6]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center h-full p-8 overflow-auto">
        <div
          className="backdrop-blur-md p-10 w-full max-w-4xl text-black"
          style={{ backgroundColor: "#A0A0A0" }}
        >
          {/* User info and logout - positioned top right */}
          <div className="absolute top-6 right-6 flex items-center gap-4 z-30">
            {/* Bulle utilisateur */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold select-none overflow-hidden">
              {user && (
                <div className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold select-none overflow-hidden">
                  {user.photo ? (
                    <img
                      src={`http://localhost:3000${user.photo}`}
                      alt={`${user.nom}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user.nom.charAt(0).toUpperCase()
                  )}
                </div>
              )}
            </div>

            <span className="text-black font-medium">
              {user && user.prenom && user.nom
                ? `${user.prenom} ${user.nom}`
                : "Utilisateur"}
            </span>

            {/* Bouton déconnexion */}
            <button
              onClick={deconnecter}
              title="Déconnexion"
              className="flex items-center gap-1 bg-[#A52A2A] text-white rounded px-3 py-1 hover:bg-red-700 transition"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* Header */}
          <div className="flex ml-3  gap-2 mb-10">
            <ListTodo size={36} color="#A52A2A" />
            <h2 className="text-3xl font-semibold">To Do LIST</h2>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition rounded-full px-4 py-2 font-semibold"
            >
              <Plus size={18} />
              Nouvelle Tâche
            </button>

            {/* Boutons filtres dynamiques et gestion du filtre actif */}
            <div className="flex gap-2">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCurrentFilter(key)} // Changement de filtre
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    currentFilter === key
                      ? "bg-black bg-opacity-70 text-white"
                      : "bg-white bg-opacity-50 text-black hover:bg-opacity-70"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Add/Edit Form Modal */}
          {showAddForm && <AddTask></AddTask>}

          {/* Delete Confirmation Modal */}
          {/* <DeleteTask></DeleteTask> */}

          {/* Tasks List */}
          <div className="">
            <UserTaskList></UserTaskList>
          </div>

          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>

          {/* Footer Stats */}
          <div className="mt-6 pt-6 border-t border-gray-400 border-opacity-50">
            <div className="flex justify-between text-sm opacity-80">
              <span>Total: {totalTaches} tâches</span>
              <span>
                À Faire:{" "}
                {tachesTab.filter((t) => t.statut === "A_FAIRE").length}
              </span>
              <span>
                En cours:{" "}
                {tachesTab.filter((t) => t.statut === "EN_COURS").length}
              </span>
              <span>
                Terminées:{" "}
                {tachesTab.filter((t) => t.statut === "TERMINER").length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
