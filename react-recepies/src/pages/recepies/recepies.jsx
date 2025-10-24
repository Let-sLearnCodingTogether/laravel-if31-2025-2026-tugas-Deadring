import { NavLink } from "react-router";
import http from "../../api/apiClient";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function RecepiesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [recepies, setRecepies] = useState([]);
  const navigate = useNavigate();

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

  // 🔹 Fungsi untuk menghapus resep dengan konfirmasi
  const handleDelete = async (recepyId, recepyName) => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus resep "${recepyName}"? Tindakan ini tidak dapat dibatalkan!`
    );

    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      const response = await http.delete(`/recepies/${recepyId}`);
      
      if (response.status === 200) {
        alert("✅ Resep berhasil dihapus!");
        // Refresh daftar resep setelah penghapusan
        fetchRecepies();
      }
    } catch (error) {
      console.error("Error deleting recepy:", error);
      alert("❌ Gagal menghapus resep!");
    } finally {
      setIsLoading(false);
    }
  };

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
        ➕ bikin resep baru
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
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  {recepy.recipe_name}
                </h2>
                <div className="flex gap-2">
                  <NavLink 
                    to={`/update-recepies/${recepy.id}`}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    ✏️ update
                  </NavLink>
                  <button 
                    onClick={() => handleDelete(recepy.id, recepy.recipe_name)}
                    disabled={isLoading}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🗑️ {isLoading ? "menghapus..." : "hapus"}
                  </button>
                </div>
              </div>

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