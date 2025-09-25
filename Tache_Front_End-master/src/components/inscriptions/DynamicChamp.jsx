import useUserCreate from "../contexts/users/useUserCreate";
import {Eye, EyeOff} from "lucide-react"
export default function DynamicChamp({ champs }) {
   

  const { formData, handleChange , showPassword, setShowPassword} = useUserCreate();

  return (
    <div className="flex gap-6">
      {champs.map(({ label, name, type, placeholder, required, icone, options }) => (
        <div key={name} className={`flex-1 ${name === "password" ? "relative" : ""}`}>
          <div className="flex items-center gap-1">
            {icone}
            <label className="block text-sm" htmlFor={name}>
              {label}
            </label>
          </div>

          {type === "select" ? (
            <select
              name={name}
              id={name}
              value={formData[name] ?? ""}
              onChange={handleChange}
              className="w-full border-b border-gray-500 py-1 bg-transparent focus:border-black outline-none"
              required={required}
            >
              <option value="">Sélectionnez</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={name === "password" ? (showPassword ? "text" : "password") : type}
              name={name}
              id={name}
              value={formData[name] ?? ""}
              onChange={handleChange}
              placeholder={placeholder}
              className={`w-full border-b border-gray-500 py-1 bg-transparent focus:border-black outline-none ${
                name === "password" ? "pr-8" : ""
              }`}
              required={required}
              minLength={name === "password" ? 6 : undefined}
            />
          )}

          {/* Bouton toggle mot de passe */}
          {name === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7 text-gray-600 hover:text-black"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        
          

        </div>
      ))}
    </div>
  );
}
