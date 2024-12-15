<?php

namespace App\Http\Requests;

use App\Helpers\ApiResult;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
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
            'username' => 'required|string|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'username.required' => 'İsim alanı zorunludur.',
            'username.string' => 'İsim alanı metin tipinde olmalıdır.',
            'username.unique' => 'Bu isim zaten kullanılmaktadır.',
            'email.required' => 'E-posta alanı zorunludur.',
            'email.email' => 'E-posta alanı geçerli bir e-posta adresi olmalıdır.',
            'email.unique' => 'Bu e-posta adresi zaten kullanılmaktadır.',
            'password.required' => 'Şifre alanı zorunludur.',
            'password.string' => 'Şifre alanı metin tipinde olmalıdır.',
            'password.min' => 'Şifre alanı en az 6 karakter olmalıdır.',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function failedValidation(Validator $validator)
    {
        $result = new ApiResult();
        $result->data = null;
        $result->message = $validator->errors()->first();
        $result->status = false;
        $result->error = $validator->errors();

        throw new HttpResponseException(response()->apiJson($result, 422));
    }
}
