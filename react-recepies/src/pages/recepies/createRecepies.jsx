import { replace, useNavigate } from "react-router";
import http from "../../api/apiClient"
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { useId, useState } from "react";

export default function CreateNewRecepies() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // State untuk menyimpan data form
    const [form, setForm] = useState({
        recipe_name: "",
        ingredients: "",
        instructions: "",
        cooking_time: ""
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await http.post("/recepies", form);

            if (response.status === 201) {
                navigate("/", {
                replace: true }); 
      }
        } catch (error) {
            console.error("Gagal menambahkan resep:", error);
        } finally {
            setIsLoading(false);
        }
    }

        return (
        <div className="container mx-auto">
            <form onSubmit={onSubmit}>
                <div className="space-y-3">
                    <Input id={useId()} name="recipe_name" value={form.recipe_name} onChange={handleOnChange} label="nama resep" placeholder="masukan nama resep" />
                    <Input id={useId()} name="ingredients" value={form.ingredients} onChange={handleOnChange} label="bahan" placeholder="masukan bahan" />
                    <Input id={useId()} name="instructions" value={form.instructions} onChange={handleOnChange} label="instruksi" placeholder=" masukan instruksi" />
                    <Input id={useId()} name="cooking_time" value={form.cooking_time} onChange={handleOnChange} label="waktu masak" placeholder="masukan waktu masak" />

                    
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Menyimpan..." : "💾 Simpan Perubahan"}
                    </Button>
                </div>
            </form>
        </div>
    )
}