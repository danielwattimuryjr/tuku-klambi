<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'nama_lengkap' => ['string', 'max:255'],
            'username' => ['alpha_dash', 'min:5', Rule::unique(User::class)->ignore($this->user()->id)],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'tanggal_lahir' => 'required',
            'no_telp' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
        ];
    }
}
