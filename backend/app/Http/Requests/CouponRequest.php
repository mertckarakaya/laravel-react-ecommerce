<?php

namespace App\Http\Requests;

use App\Helpers\ApiResult;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CouponRequest extends FormRequest
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
            'code' => 'required|string|max:15|unique:coupon',
            'discount_percent' => 'required|integer|min:1|max:100'
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
            'code.required' => 'Kupon kodu zorunludur.',
            'code.string' => 'Kupon kodu metin olmalıdır.',
            'code.max' => 'Kupon kodu en fazla 15 karakter olabilir.',
            'code.unique' => 'Kupon kodu zaten kullanılmış.',
            'discount_percent.required' => 'İndirim yüzdesi zorunludur.',
            'discount_percent.integer' => 'İndirim yüzdesi tam sayı olmalıdır.',
            'discount_percent.min' => 'İndirim yüzdesi en az 1 olabilir.',
            'discount_percent.max' => 'İndirim yüzdesi en fazla 100 olabilir.'
        ];
    }
    public function failedValidation(Validator $validator)
    {
        $result = new ApiResult();
        $result->data = null;
        $result->message = $validator->errors()->first();
        $result->status = false;
        $result->error = $validator->errors();

        throw new HttpResponseException(response()->apiJson($result, 400));
    }
}
