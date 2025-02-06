<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthCheckController extends Controller
{
    public function check(Request $request): JsonResponse
    {
        return response()->json([
            'authenticated' => Auth::check(),
        ]);
    }
}
