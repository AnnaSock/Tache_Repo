import { ListTodo, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../contexts/auth/useAuth";

export default function PageConnexion() {
  const {
    seConnecter,
    setEmail,
    email,
    password,
    setPassword,
    isLoading,
    error,
    toggleShowPassword,
    showPassword
  } = useAuth();


  

  return (
    <div>
      <div className="relative w-screen h-screen font-sans">
        <img
          src="../../../public/fondApp.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

        <div className="relative z-20 flex items-center h-full max-w-lg p-12 ml-20">
          <form
            onSubmit={seConnecter}
            className="backdrop-blur-md p-10 w-full max-w-lg text-black"
            style={{ backgroundColor: "#A0A0A0" }}
          >
            <div className="flex justify-center gap-2 ">
              <ListTodo size={36} color="#A52A2A" />
              <h2 className="mb-6 text-3xl font-semibold">To Do LIST</h2>
            </div>

            <label className="block mb-4 text-sm opacity-80">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full bg-transparent border-b border-gray-700 focus:border-black outline-none py-3 mb-6 placeholder-gray-600"
              placeholder="Email"
              required
            />

            <label className="flex justify-between items-center mb-4 text-sm opacity-80">
              Mot de passe
              
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-700 focus:border-black outline-none py-3 mb-6 placeholder-gray-600 pr-10"
                placeholder="Mot de passe"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-0 top-6 transform -translate-y-1/2 pr-3 text-gray-600 hover:text-black focus:outline-none"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center mb-6">
              <Link
                to="/inscription"
                className="text-sm underline opacity-80 hover:opacity-100 transition text-white cursor-pointer"
              >
                S'inscrire?
              </Link>

              <a
                href="#"
                className="text-sm text-white underline opacity-80 hover:opacity-100 transition ml-[8rem] mt-1"
              >
                Mot de passe oublié?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black bg-opacity-70 text-white hover:bg-opacity-90 transition rounded-full py-3 font-semibold"
            >
              {isLoading ? "Connexion..." : "Se Connecter"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
