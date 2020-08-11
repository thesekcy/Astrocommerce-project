<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;

class userController extends Controller
{

    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function store(Request $req)
    {
        $dados = $req->all();

        // return $dados;

        try {

            $dados['password'] = Hash::make($dados['password']);

            user::create($dados);
            return 'true';
        } catch (\Throwable $th) {
            //throw $th;
            return 'Erro ao criar usuário: '. $th;
        }

    }

    public function show(Request $req)
    {
        try {
            $dados = $req->all();
            $id = $req['id'];

            $user = User::where('id', $id)->get();

            return $user;
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function update(Request $req)
    {
        try {
            $dados = $req->all();

            $id = $req['id'];

            $user = User::find($id);
            $user->update($dados);

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
