import http from "../../api/apiClient";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { useCallback, useEffect, useState, useId } from "react";
import { useNavigate, useParams } from "react-router";

export default function UpdateRecepies() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: "",
    cooking_time: "",
  });

  // 🔹 Ambil data resep berdasarkan ID
  const fetchRecepies = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await http.get(`/recepies/${params.id}`);
      setForm(response.data.data);
    } catch (error) {
      console.error("Gagal memuat data resep:", error);
      alert("Gagal memuat data resep!");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchRecepies();
  }, [fetchRecepies]);


  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await http.put(`/recepies/${params.id}`, form);
      if (response.status === 200) {
        alert("✅ Resep berhasil diperbarui!");

        navigate("/"); 
      }
    } catch (error) {
      console.error("Gagal update resep:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Hapus resep (DELETE)
  const handleDelete = async () => {
    const confirmDelete = confirm("Apakah kamu yakin ingin menghapus resep ini?");
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      const response = await http.delete(`/recepies/${params.id}`);
      if (response.status === 200) {
        alert("🗑️ Resep berhasil dihapus!");
        navigate("/"); // atau navigate(-1) untuk kembali ke halaman sebelumnya
      }
    } catch (error) {
      console.error("Gagal menghapus resep:", error);
      alert("❌ Gagal menghapus resep!");
    } finally {
      setIsLoading(false);
    }
  };

  const idPrefix = useId();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">✏️ Edit / Hapus Resep</h1>

      <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
        <Input
          id={`${idPrefix}-recipe_name`}
          name="recipe_name"
          value={form.recipe_name}
          onChange={handleOnChange}
          label="Nama Resep"
          placeholder="Masukkan nama resep"
        />
        <Input
          id={`${idPrefix}-ingredients`}
          name="ingredients"
          value={form.ingredients}
          onChange={handleOnChange}
          label="Bahan-bahan"
          placeholder="Masukkan bahan-bahan"
        />
        <Input
          id={`${idPrefix}-instructions`}
          name="instructions"
          value={form.instructions}
          onChange={handleOnChange}
          label="Instruksi"
          placeholder="Masukkan langkah memasak"
        />
        <Input
          id={`${idPrefix}-cooking_time`}
          name="cooking_time"
          value={form.cooking_time}
          onChange={handleOnChange}
          label="Waktu Memasak (menit)"
          placeholder="Masukkan waktu memasak"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            onClick={() => navigate("/")}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Menyimpan..." : "💾 Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}