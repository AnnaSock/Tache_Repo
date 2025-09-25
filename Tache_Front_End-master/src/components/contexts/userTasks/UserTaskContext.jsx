import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { UserTaskContext } from "./useUserTask";
import useAuth from "../auth/useAuth";
import { useSearchParams } from "react-router-dom";

export default function MyUserTaskProvider({ children }) {
  const { user , deconnecter} = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  //  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taches, setTaches] = useState([]);
  const [error, setError] = useState(null);
  const [refreshTache, setRefreshTache] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const searchFromUrl = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  const [currentFilter, setCurrentFilter] = useState('all');


  const tachesTab = taches && Array.isArray(taches.data) ? taches.data : [];
  const totalTaches= tachesTab.length
  const tachesFiltrees = tachesTab.filter(tache => {
  const matchesSearch = (
    (tache.titre && tache.titre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (tache.description && tache.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const matchesFilter = currentFilter === 'all' 
    ? true 
    : tache.statut === currentFilter;

  return matchesSearch && matchesFilter;
});


  const itemsPerPage = 2;
  const tachesInversees = [...tachesFiltrees].reverse();
  const totalPages = Math.ceil(tachesInversees.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const tachesPage = tachesInversees.slice(startIdx, endIdx);



  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [audioBlob, setAudioBlob] = useState(null);

  // Démarrer l'enregistrement
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        chunksRef.current = [];
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) {
      alert("Impossible d'accéder au micro : " + e.message);
    }
  };

  // Arrêter l'enregistrement
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(formData, audioBlob);

    // Réinitialiser formulaire
    setFormData({ titre: "", description: "", statut: "A_FAIRE" });
    setAudioBlob(null);
    setAudioUrl(null);
  };



  

  useEffect(() => {
    async function fetchTaches() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/taches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setTaches(data);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
      }
    }

    fetchTaches();
  }, [user, refreshTache]);

  const createTask = async (taskData, audioBlob) => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");

    // Construire un FormData pour envoyer fichiers + champs
    const formData = new FormData();
    formData.append("titre", taskData.titre);
    formData.append("description", taskData.description);
    formData.append("statut", taskData.statut);
    formData.append("dateDebut", taskData.dateDebut);
    formData.append("dateFin", taskData.dateFin);


    if (audioBlob) {
      // Le 3e param est le nom du fichier
      formData.append("audio", audioBlob, "recording.webm");
    }

    const response = await fetch("http://localhost:3000/api/taches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Ne pas mettre Content-Type, fetch gère multipart/form-data automatiquement
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }
    const newTask = await response.json();
    flushSync(() => {
      setTaches((prev) => ({
        ...prev,
        data: [newTask, ...prev.data],
      }));
    });
    setRefreshTache((prev) => !prev);
    return newTask;
  } finally {
    setIsLoading(false);
  }
};


  const updateTask = async (id, updates) => {
    setIsLoading(true);
    try {
      // Simulation PUT /:id (avec authentification)
      setTaches((prev) =>
        prev.data.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

 const [formData, setFormData] = useState({
    titre: "",
    description: "",
    statut: "A_FAIRE",
    dateDebut: "",
    dateFin: "",
    audio: ""
  });

  const cancelEdit = () => {
    setEditingTask(null);
    setShowAddForm(false);
    setFormData({ titre: "", description: "", statut: "A_FAIRE" });
  };

  const handleSubmit = async (formData, audioBlob) => {
  if (!formData.titre.trim()) return;

  if (editingTask) {
    await updateTask(editingTask.id, formData);
    setEditingTask(null);
  } else {
    await createTask(formData, audioBlob);
  }

  setFormData({ titre: "", description: "", statut: "A_FAIRE", dateDebut: "", dateFin: "" });
  setAudioBlob(null);
  setAudioUrl(null);
  setShowAddForm(false);
};


  return (
    <UserTaskContext.Provider
      value={{
        showAddForm,
        setShowAddForm,
        tachesPage,
        error,
        createTask,
        isLoading,
        editingTask,
        cancelEdit,
        setFormData,
        formData,
        totalPages,
        setCurrentPage,
        onSubmit,
        audioUrl,
        isRecording,
        startRecording,
        stopRecording,
        currentPage,
        setSearchParams,
        setSearchTerm,
        totalTaches,
        currentFilter,
        setCurrentFilter,
        tachesTab,
        user,
        deconnecter
      }}
    >
      {children}
    </UserTaskContext.Provider>
  );
}
