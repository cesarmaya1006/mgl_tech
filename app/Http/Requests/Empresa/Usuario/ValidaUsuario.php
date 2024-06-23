<?php

namespace App\Http\Requests\Empresa\Usuario;

use Illuminate\Foundation\Http\FormRequest;

class ValidaUsuario extends FormRequest
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
            'cargo_id' => 'required',
            'email' => 'required|max:50|unique:users,email,' . $this->route('id'),
            'identificacion' => 'required|unique:empleados,identificacion,' . $this->route('id'),

        ];
    }
    public function attributes()
    {
        return [
            'cargo_id' => 'Cargo',
            'email' => 'Correo Electrónico',
            'identificacion' => 'Identificación',

        ];
    }

    public function messages()
    {
        return [
            'cargo_id.required' => 'El campo cargo es obligatorio',
            'email.required' => 'El campo correo electrónico es obligatorio',
            'email.unique' => 'El campo correo electrónico ya se encuentra en la base de datos verifique la información e intentelo nuevamente',
            'identificacion.required' => 'El campo identificación es obligatorio',
            'identificacion.unique' => 'El campo identificación ya se encuentra en la base de datos verifique la información e intentelo nuevamente',

        ];
    }
}
