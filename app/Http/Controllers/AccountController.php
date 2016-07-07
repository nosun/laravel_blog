<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Account;

class AccountController extends Controller
{
    public function __construct(){
	    $this->middleware('auth');
    }

	public function showList(){
		$accounts = Account::all();
		return view('accounts')->with('accounts',$accounts);
	}

	public function AjaxAdd(){


	}

	public function AjaxEdit(){


	}

	public function AjaxDelete(){


	}
}
