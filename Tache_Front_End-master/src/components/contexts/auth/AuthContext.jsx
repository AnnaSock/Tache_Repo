import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./useAuth";



export default function MyAuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser]=useState(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const seConnecter = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setError(data.message || "Erreur de connexion");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Correction de la faute de frappe dans la route
        navigate("/userTache");
      }
    } catch (err) {
      setError("Erreur réseau");
      console.error(err);
    }
    
    setIsLoading(false);
  };


  useEffect(() => {
  const userConnect = localStorage.getItem("user");
  if (userConnect) {
    setUser(JSON.parse(userConnect));
  }
}, []);

const deconnecter = () => {
  localStorage.removeItem("token");  
  localStorage.removeItem("user"); 
  setUser(null);                     
  navigate("/");               
};



  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        error,
        isLoading,
        seConnecter,
        user,
        toggleShowPassword,
        showPassword,
        deconnecter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


