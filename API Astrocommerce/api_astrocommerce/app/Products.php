<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class products extends Model
{
    protected $fillable = [
        'name', 'description', 'image','status','visibility','created_by'
    ];
}
