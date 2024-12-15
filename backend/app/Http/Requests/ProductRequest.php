<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ApiResult;

class ProductRequest extends FormRequest
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
            'category_guid' => 'required|string',
            'name' => 'required|string',
            'images' => 'required|array|min:1',
            'description' => 'required|string',
            'colors' => 'required|array|min:1',
            'sizes' => 'required|array|min:1',
            'current_price' => 'required|numeric',
            'discount_price' => 'required|numeric',
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
            'category_guid.required' => 'Kategori alanı zorunludur.',
            'name.required' => 'İsim alanı zorunludur.',
            'images.required' => 'Görsel alanı zorunludur.',
            'description.required' => 'Açıklama alanı zorunludur.',
            'colors.required' => 'Renk alanı zorunludur.',
            'sizes.required' => 'Beden alanı zorunludur.',
            'current_price.required' => 'Fiyat alanı zorunludur.',
            'discount_price.required' => 'İndirimli fiyat alanı zorunludur.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $result = new ApiResult();
        $result->data = null;
        $result->message = $validator->errors()->first();
        $result->status = false;
        $result->error = $validator->errors();

        throw new HttpResponseException(response()->apiJson($result, 422));
    }
}
