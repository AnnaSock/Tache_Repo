import { useEffect, useState } from "react";
import { UserCreateContext } from "./useUserCreate";
import { Phone, User, Locate, Mail, Lock, LogIn } from "lucide-react";
export default function MyCreateUserProvider({ children }) {
  const champs1 = [
    {
      label: "Nom",
      name: "nom",
      type: "text",
      placeholder: "Nom",
      required: true,
      icone: <User size={15} color="#A52A2A" />,
    },
    {
      label: "Prénom",
      name: "prenom",
      type: "text",
      placeholder: "Prénom",
      required: true,
      icone: <User size={15} color="#A52A2A" />,
    },
  ];

  const champs2 = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
      icone: <Mail size={15} color="#A52A2A" />,
    },
    {
      label: "Adresse",
      name: "adresse",
      type: "text",
      placeholder: "Adresse",
      required: false,
      icone: <Locate size={15} color="#A52A2A" />,
    },
  ];

  const champs3 = [
    {
      label: "Mot de passe",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      required: true,
      icone: <Lock size={15} color="#A52A2A" />,
    },
    {
      label: "Login",
      name: "login",
      type: "text",
      placeholder: "Login",
      required: true,
      icone: <LogIn size={15} color="#A52A2A" />,
    },
  ];

  const champs4 = [
    {
      label: "Téléphone",
      name: "telephone",
      type: "tel",
      placeholder: "Téléphone",
      required: false,
      icone: <Phone size={15} color="#A52A2A" />,
    },
    {
      label: "Genre",
      name: "genre",
      type: "select",
      required: true,
      icone: <User size={15} color="#A52A2A" />,
      options: [
        { value: "FEMME", label: "Femme" },
        { value: "HOMME", label: "Homme" },
      ],
    },
  ];

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null); // pour stocker l'URL d'aperçu
  const [fileName, setFileName] = useState(null);

  const createUser = async (data) => {
  setError(null);

  try {
    const formDataToSend = new FormData();

    // Ajouter chaque champ FormData ; photo est un File
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    const response = await fetch("http://localhost:3000/api/users/", {
      method: "POST",
      body: formDataToSend, // FormData envoyé directement
    });

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    const createdUser = await response.json();
    setUser(createdUser);
  } catch (e) {
    setError(e.message || "Erreur inscription");
  }
};


  // Etats locaux pour chaque champ contrôlé
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    password: "",
    login: "",
    telephone: null,
    genre: "",
    photo: null, // devient fichier, pas juste texte
  });

  // Mise à jour facile des champs
  const handleChange = (e) => {
  const { name, value, files } = e.target;

  // Gérer fichier photo
  if (files && files.length > 0) {
    const file = files[0];
    setFileName(file.name);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    setFormData((prev) => ({
      ...prev,
      [name]: file, // stocker le fichier dans formData
    }));
  } else {
    // Pour les champs texte classiques
    setFileName(null);
    setPreview(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
  };

  return (
    <UserCreateContext.Provider
      value={{
        user,
        error,
        showPassword,
        formData,
        handleChange,
        handleSubmit,
        setFormData,
        setShowPassword,
        preview,
        fileName,
        champs1,
        champs2,
        champs3,
        champs4,
      }}
    >
      {children}
    </UserCreateContext.Provider>
  );
}
