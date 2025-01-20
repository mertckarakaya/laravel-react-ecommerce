<?php

namespace App\Http\Controllers;

use App\Helpers\GenericHelpers;
use App\Http\Requests\CategoryRequests;
use App\Models\Category;
use App\Helpers\ApiResult;
use \Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function create(CategoryRequests $request): JsonResponse
    {
        try {
            $category = new Category();
            $category->guid = GenericHelpers::GenerateGuid();
            $category->name = $request->input('name');
            $category->img = $request->input('img');
            $category->save();

            return $this->handleResponse($category, 'Success', true, 201);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);
        }
    }
    public function list() : JsonResponse
    {
        try {
            $categories = Category::select('guid','name','img')
                ->get();

            return $this->handleResponse($categories);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);
        }
    }
    public function getByGuid($guid) : JsonResponse
    {
        try {
            $category = Category::select('guid', 'name', 'img')->where('guid', $guid)->first();
            if ($category == null) {
                return $this->handleResponse(null, 'Category not found', false, 404);
            }
            return $this->handleResponse($category);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);
        }
    }
    public function update(CategoryRequests $request, $guid) : JsonResponse
    {
        try {
            $category = Category::where('guid', $guid)->first();
            if ($category == null) {
                return $this->handleResponse(null, 'Category not found', false, 404);
            }
            $category->name = $request->input('name');
            $category->img = $request->input('img');
            $category->save();

            return $this->handleResponse($category, 'Success', true, 201);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);
        }
    }
    public function delete($guid) : JsonResponse
    {
        try {
            $category = Category::where('guid', $guid)->first();
            if ($category == null) {
                return $this->handleResponse(null, 'Category not found', false, 404);
            }
            $category->delete();
            return $this->handleResponse(null, 'Success', true, 204);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);

        }
    }

    public function webList() : JsonResponse
    {
        try {
            $categories = Category::select('guid','name','img')
                ->get();

            return $this->handleResponse($categories);
        } catch (\Exception $ex) {
            return $this->handleResponse(null, $ex->getMessage(), false, 500);
        }
    }

    private function handleResponse(mixed $data, string $message = 'Success', bool $status = true, int $code = 200) : JsonResponse
    {
        $result = new ApiResult();
        $result->data = $data;
        $result->message = $message;
        $result->status = $status;
        return response()->apiJson($result, $code);
    }
}
