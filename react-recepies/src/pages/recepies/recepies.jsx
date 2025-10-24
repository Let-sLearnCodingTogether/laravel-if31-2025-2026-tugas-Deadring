import { NavLink } from "react-router";
import http from "../../api/apiClient";
import { useCallback, useEffect, useState } from "react";

export default function RecepiesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [recepies, setRecepies] = useState([]);

  const fetchRecepies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await http.get("/recepies");
      console.log("API Response:", response.data);
      setRecepies(response.data.data ?? response.data);
    } catch (error) {
      console.error("Error fetching recepies:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecepies();
  }, [fetchRecepies]);

  if (isLoading) {
    return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
  }

  return (
    <div className="container mx-auto space-y-5 p-6">
      <h1 className="font-semibold text-2xl text-center">📖 Menu Resep</h1>
      <NavLink 
        to="/new-recepies" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
        bikin resep baru
    </NavLink>
    <NavLink 
        to="/update-recepies/:id" 
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
        update resep
    </NavLink>

      {recepies.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada resep tersedia.</p>
      ) : (
        <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700">
          {recepies.map((recepy) => (
            <li
              key={recepy.id}
              className="pt-4 p-5 border border-slate-300 rounded-lg shadow-sm bg-white dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2">
                {recepy.recipe_name}
              </h2>

              <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                ⏱️ Waktu Masak:{" "}
                <span className="font-medium">{recepy.cooking_time} menit</span>
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-zinc-700 dark:text-zinc-200">Bahan:</h3>
                <p className="italic text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                  {recepy.ingredients}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="font-medium text-zinc-700 dark:text-zinc-200">Instruksi:</h3>
                <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                  {recepy.instructions}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
