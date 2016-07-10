<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Service;
use App\Helpers\Ajax;
use Auth;

class ServiceController extends Controller
{
    public function __construct(){
	    $this->middleware('auth');
    }

	public function showList(){
		$accounts = Service::all();
		return view('accountList')->with('accounts',$accounts);
	}

	public function show($id){
		$account = Service::find($id);

		if(!$account){
			abort(404);
		}

		return view('account')->with('account',$account);
	}

	public function AjaxAdd(Request $request){
		$account = new Service();
		$account->uid = Auth::user()->id;
		$result  = $account->fill($request->all())->save();

		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxEdit(Request $request, $id){
		$account = Service::find($id);
		$account->uid = Auth::user()->id;
		$result  = $account->fill($request->all())->save();
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxDelete($id){
		$result = Service::destroy($id);
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}

	}
}
