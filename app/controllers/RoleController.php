<?php

class RoleController extends Controller {

	public function loadRoles()
	{
    $roles = Role::all();
    return Response::jsend('success', $roles->toArray());
	}

  public function create()
	{
    //check if the role already exist...
    $all = Input::all();
    $role = Role::where('name', '=', $all['name'])->first();
    if($role) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Role name %s is already exist.", $all['name']))
      );
    }
    else {
      //create new Role.
      
      $role = Role::create(array(
        'name' => Input::get('name'),
        'description' => Input::get('description'),
        'type'  => 'user'
      ));
      return Response::jsend('success', 
        array('msg' => sprintf ("Role name %s successfully created.", $all['name']))
      );
    }
	}
  
  //function used to assign roles to user
  // -1) check if this role is already assigned to user, if yes then throw error
  // -2) 
  public function assignRolesToUser() 
  {
    $all = Input::all();
    $roleIds = explode(',', Input::get('role_id'));
    $user = User::find($all['user_id']);
    $user->roles()->sync($roleIds, false);
    return Response::jsend('success',
      array('msg' => sprintf ("Roles assigned to %s %s.", $user['first_name'], $user['last_name']))
    );
  }
  
  public function delete()
	{
    //check if the role already exist...
    $id = Input::get('id');
    $role = Role::find($id);
    $role->delete();
    return Response::jsend('success', 
      array('msg' => 'Role successfully deleted.')
    );
	}
  
  //delete role(s) assigned to user one-by-one
  public function deleteUserRoles() 
  {
    $all = Input::all();
    $user = User::find($all['user_id'])->roles();
    $user->detach($all['role_id']);
    //return Response::jsend('success', $user->get());
  }
  
  //view all role(s) assigned to user
  public function viewUserRoles($userId) 
  {
    $user = User::find($userId)->roles();
    return Response::jsend('success', $user->get());
  }
}
