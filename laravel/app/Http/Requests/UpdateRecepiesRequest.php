<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRecepiesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'recipe_name' => 'sometimes|string|max:255',
        'ingredients' => 'sometimes|string',
        'instructions' => 'sometimes|string',
        'cooking_time' => 'sometimes|integer|min:1',
    ];
}

}
