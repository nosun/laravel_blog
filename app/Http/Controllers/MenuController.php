<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MenuController extends Controller
{

	public function menu(Request $request,$id=0,$id2=0)
	{
		$key = $request->input('key');
		return view('menu')->with('id',$id)->with('id2',$id2)->with('key',$key)->with('title','menu test');
	}
}