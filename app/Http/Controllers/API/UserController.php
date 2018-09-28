<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(5);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users',
            'password' => 'required|string|min:6',
            'type' => '',
            'bio' =>'',
            'photo' =>'',

        ]);

        //return ['message' => "I have your data"];
        //return $request->all();

        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => $request['photo'],
            'type' => $request['type'],
            'bio' => $request['bio'],
            'password' => Hash::make($request['password']),
        ]);
    }


    // show profile info
    public function profile()
    {
        return auth('api')->user();
    }

    //update profile
    public function updateProfile(Request $request)
    {
        $currentUser = auth('api')->user();

        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users,email,'. $currentUser->id,
            'password' => 'sometimes|required|string|min:6',
            'type' => '',
            'bio' =>'',
            'photo' =>'',

        ]);


        $currentPhoto = $currentUser->photo;

        if($request->photo != $currentPhoto) {

            $namePhoto = time().'.'.explode('/',explode(':',substr($request->photo, 0, strpos($request->photo,';')))[1])[1];
            \Image::make($request->photo)->save(public_path('img/profiles/').$namePhoto);

            $request->merge(['photo' => $namePhoto]);

            $pathCurrentPhoto = public_path('img/profiles/').$currentPhoto;
            if(file_exists($pathCurrentPhoto)){
                @unlink($pathCurrentPhoto);
            }
        }


        if(!empty($request->password)){
            $hashPassword = Hash::make($request['password']);
            $request->merge(['password' => $hashPassword]);
        }


        $currentUser->update($request->all());

        return ['messageFromLaravel' => "Profile has been updated."];
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    //Accept Upadting user's info with the same email just for current user
    //'email' => 'unique:users,email,'. $user->id,
    {
        $user=User::findOrFail($id);
        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|email|max:191|unique:users,email,'. $user->id,
            'password' => 'sometimes|string|min:6',
            'type' => '',
            'bio' =>'',
            'photo' =>'',

        ]);
            $user->update($request->all());

        return ['messageFromLaravel' => "User's Info has been updated."];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       $user = User::findOrFail($id);

       $user->delete();

       return ['messageFromLaravel' => 'User has been deleted.'];
    }
}
