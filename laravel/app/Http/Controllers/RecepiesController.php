<?php

namespace App\Http\Controllers;

use App\Models\Recepies;
use App\Http\Requests\StoreRecepiesRequest;
use App\Http\Requests\UpdateRecepiesRequest;
use Exception;
use Illuminate\Support\Facades\Response;

class RecepiesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $recepies = Recepies::all();

            return response()->json([
                'massage' => 'List Resep',
                'data' => $recepies
            ],200);
        } catch (Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRecepiesRequest $request)
    {
        try {
            $validatedData = $request->safe()->all();
            $recepies = Recepies::create($validatedData);
            return response()->json([
                'message' => 'resep berhasil dibuat',
                'data' => $recepies
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Recepies $recepy)
    {
        try {
            return Response::json([
                'message' => "Detail resep",
                'data' => $recepy
            ], 200);
        } catch (Exception $e) {
            return Response::json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecepiesRequest $request, Recepies $recepy){
            try {
            $validatedData = $request->safe()->all();
            $recepy->update($validatedData);
            return response()->json([
                'message' => 'resep berhasil dibuat',
                'data' => $recepy
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server',
                'error' => $e->getMessage()
            ], 500);
        }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recepies $recepy)
    {
        try {
            if($recepy->delete()){
                return Response::json([
                    'message' => "resep dihapus",
                    'data' => null
                ], 200);
            }
            return Response::json([
                'message' => "resep tidak terhapus",
                'data' => null
            ], 500);
        } catch (\Exception $e) {
            return Response::json([
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
