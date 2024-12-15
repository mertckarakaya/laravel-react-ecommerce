<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use \App\Helpers\ApiResult;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReviewRequest extends FormRequest
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
            'product_guid' => ['required', 'string', 'exists:product,guid'],
            'text' => ['required', 'string'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'product_guid.required' => 'Ürün GUID alanı zorunludur.',
            'product_guid.string' => 'Ürün GUID alanı metin tipinde olmalıdır.',
            'product_guid.exists' => 'Ürün bulunamadı.',
            'text.required' => 'Yorum alanı zorunludur.',
            'text.string' => 'Yorum alanı metin tipinde olmalıdır.',
            'rating.required' => 'Puan alanı zorunludur.',
            'rating.integer' => 'Puan alanı tam sayı olmalıdır.',
            'rating.min' => 'Puan alanı en az 1 olabilir.',
            'rating.max' => 'Puan alanı en fazla 5 olabilir.',
        ];
    }

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
