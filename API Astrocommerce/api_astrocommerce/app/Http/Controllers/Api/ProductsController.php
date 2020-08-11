<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Products;

class ProductsController extends Controller
{
    public function index()
    {

        $products = Products::all();

        return response()->json($products);

    }


    public function store(Request $req)
    {
        $dados = $req->all();

        try {
            if($req->hasFile('image')){

                $file = $req->file('image');

                $path = public_path() . '/uploads/images/store/';
                $file->move($path, $file->getClientOriginalName());
                // return response()->json(compact('path'));

                $avatar = $file->getClientOriginalName();

                $dados['image'] = $avatar;
                $dados['created_by'] = (int)$dados['created_by'];

                if($dados['visibility'] == "true" || $dados['visibility'] == 1){
                    $dados['visibility'] = true;
                }else if($dados['visibility'] == "false" || $dados['visibility'] == 0){
                    $dados['visibility'] = false;
                }

                Products::create($dados);


                return('true');

            }else{
                return 'nao tem';
            }
        } catch (\Throwable $th) {
            //throw $th;
            return 'error: '. $th;
        }
    }

    public function show(Request $id)
    {
        try {
            $id = $id->all();
            $id = $id['id'];

            $product = Products::where('id', $id)->get();

            return $product;
        } catch (\Throwable $th) {
            return $th;
        }

    }

    public function update(Request $req)
    {
        try {
            $dados = $req->all();

            $id = $req['id'];

            if($req->hasFile('image')){
                $file = $req->file('image');

                $path = public_path() . '/uploads/images/store/';
                $file->move($path, $file->getClientOriginalName());
                // return response()->json(compact('path'));

                $avatar = $file->getClientOriginalName();

                $dados['image'] = $avatar;
            }

            if($dados['visibility'] == "true" || $dados['visibility'] == 1){
                $dados['visibility'] = true;
            }else if($dados['visibility'] == "false" || $dados['visibility'] == 0){
                $dados['visibility'] = false;
            }


            $product = Products::find($id);
            $product->update($dados);

            return true;
        } catch (\Throwable $th) {
                return $th;
            }
        }

    public function destroy($id)
    {
        //
    }
}
