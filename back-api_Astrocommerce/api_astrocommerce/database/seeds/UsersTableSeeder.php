<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Administrador',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678A@'),
            'gender' => 'masculine',
            'access' => true,
            'type' => 'admin',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'Usuário Editor',
            'email' => 'editor@editor.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678E@'),
            'gender' => 'masculine',
            'access' => true,
            'type' => 'editor',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('users')->insert([
            'name' => 'Fábio Santana',
            'email' => 'fabio27336f@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678F@'),
            'gender' => 'masculine',
            'phone' => '+55 (11) 98707-5393',
            'cep' => '08573-000',
            'end' => 'Av. Italo Adami',
            'end_num' => '491',
            'district' => 'Vila Zeferina',
            'city' => 'Itaquaquecetuba',
            'state' => 'São Paulo',
            'type' => 'user',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
