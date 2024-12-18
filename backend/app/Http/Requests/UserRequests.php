<?php

namespace App\Http\Requests;

use App\Helpers\ApiResult;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequests extends FormRequest
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
            'name' => 'string',
            'email' => 'email',
            'password' => 'string',
            'role' => 'string|in:admin,user',
        ];
    }
    public function messages(): array
    {
        return [
            'name.string' => 'İsim metin tipinde olmalıdır.',
            'email.email' => 'Geçerli bir E-Posta giriniz.',
            'role.string' => 'Rol metin tipinde olmalıdır.',
            'role.in' => 'Rol alanı sadece admin veya user olabilir.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'İsim',
            'email' => 'E-Posta',
            'password' => 'Şifre',
            'role' => 'Rol',
        ];
    }
    public function failedValidation(Validator $validator): void
    {
        $result = new ApiResult();
        $result->data = null;
        $result->message = $validator->errors()->first();
        $result->status = false;
        $result->error = $validator->errors();

        throw new HttpResponseException(response()->apiJson($result, 422));
    }
}
