<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Products;
use App\User;

class DashboardController extends Controller
{
    public function index()
    {
        $productsVisibles = Count(Products::where('visibility', true)->where('status', 'approved')->get());
        $QuantityClients = Count(User::where('type', 'user')->get());
        $QuantityProducts = Count(Products::all());

        return response()->json([
            'productsVisibles' => $productsVisibles,
            'QuantityClients' => $QuantityClients,
            'QuantityProducts' => $QuantityProducts,
        ]);
    }
}
