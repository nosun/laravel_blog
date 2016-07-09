<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Account;
use App\Helpers\Ajax;

class AccountController extends Controller
{
    public function __construct(){
	    $this->middleware('auth');
    }

	public function showList(){
		$accounts = Account::all();
		return view('accountList')->with('accounts',$accounts);
	}

	public function show($id){
		$account = Account::find($id);

		if(!$account){
			abort(404);
		}

		return view('account')->with('account',$account);
	}

	public function AjaxAdd(Request $request){
		$account = new Account();
		$result  = $account->fill($request->all())->save();

		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxEdit(Request $request, $id){
		$account = Account::find($id);
		$result  = $account->fill($request->all())->save();
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxDelete($id){
		$result = Account::destroy($id);
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}

	}
}
