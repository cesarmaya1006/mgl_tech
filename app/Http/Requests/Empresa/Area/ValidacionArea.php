<?php

namespace App\Http\Requests\Empresa\Area;

use Illuminate\Foundation\Http\FormRequest;

class ValidacionArea extends FormRequest
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
            'empresa_id' => 'required',

        ];
    }
    public function attributes()
    {
        return [
            'empresa_id' => 'Empresa',

        ];
    }

    public function messages()
    {
        return [
            'empresa_id.required' => 'El campo empresa es obligatorio',

        ];
    }
}
