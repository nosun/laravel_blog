<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    protected $fillable = ['name', 'type', 'account', 'password', 'info', 'tag', 'belong', 'address'];
}
