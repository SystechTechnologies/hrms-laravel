<?php

class UserController extends Controller {

	public function load()
	{
  
    //$sessions = Sassion::with('course')->take(12);
    //return Response::jsend('success', $sessions->get());
    //$users = User::all()->orderBy('id', 'DESC');
   // $users = User::take(20)->orderBy('id', 'DESC')->get();
    
    $users = User::take(10)->orderBy('id', 'DESC')->get();
    $users_array = array();
    foreach($users as $user) {
      unset($user['password']);
      $mgr = User::where('id', '=', $user['manager_id'])->first(array('first_name', 'last_name'));
      $user['manager'] = $mgr['first_name'].' '.$mgr['last_name'];
      $users_array[] = $user;
    }
    return Response::jsend('success', $users_array);
	}

  public function create()
	{
    //check if the users already exist...
    $all = Input::all();
    //return Response::jsend('success', $all);
    $user = User::where('user_name', '=', $all['user_name'])->first();
    if($user) {
      return Response::jsend('fail',
        array('msg' => sprintf ("User name %s is already exist. Please select another one.", $all['user_name']))
      );
    }
    else {
      //create new user.
      $rowUser = array(
        'first_name'  => Input::get('first_name'),
        'last_name'   => Input::get('last_name'),
        'user_name'   => Input::get('user_name'),
        'email'       => Input::get('email'),
        'password'    => Hash::make(Input::get('password')),
        'activation'  => Input::get('activation'),
        'gender'      => Input::get('gender'),
        'marital_status' => Input::get('marital_status'),
        'manager_id'  => Input::get('manager_id')
      );
      //using MassAssignment to create user.
      $user = User::create($rowUser);
      //after successfully creating User, add the additional details (contact details, skills....)
      $id = $user->id;
      return Response::jsend('success', array('msg' => 'User successfully created.'));
    }
	}
  
  public function delete()
	{
    //check if the role already exist...
    /*
    $id = Input::get('id');
    $role = Role::find($id);
    $role->delete();
    return Response::jsend('success', array('msg' => 'Role successfully deleted.'));
    */
	}

  public function searchUser() 
  {
    $query = Input::get('query');
    //TODO search inactive users.
    $users = User::where('first_name', 'like', "$query%")
      ->get(array('id', 'first_name', 'last_name'));
    $users_array = array();
    foreach($users as $user) {
      $users_array[] = array('id' => $user->id, 'name' => $user['first_name'].' '.$user['last_name']);
    }    
    return Response::jsend('success', $users_array);
  }
}
