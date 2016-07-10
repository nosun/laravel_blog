<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Helpers\Ajax;
use Auth;
use App\Models\Article;

class ArticleController extends Controller
{
    public function __construct(){
	    $this->middleware('auth');
    }

	public function showList(){
		$accounts = Article::where('uid',Auth::user()->id)->get();
		return view('accountList')->with('accounts',$accounts);
	}

	public function show($id){
		$account = Article::find($id);

		if(!$account){
			abort(404);
		}

		return view('account')->with('account',$account);
	}

	public function AjaxAdd(Request $request){
		$account = new Article();
		$account->uid = Auth::user()->id;
		$result  = $account->fill($request->all())->save();

		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxEdit(Request $request, $id){
		$account = Article::find($id);
		$account->uid = Auth::user()->id;
		$result  = $account->fill($request->all())->save();
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}
	}

	public function AjaxDelete($id){
		$result = Article::destroy($id);
		if($result){
			return Ajax::success();
		}else{
			return Ajax::serverError('db error');
		}

	}
}
