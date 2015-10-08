<?php

//Base controller, a super class for all controller used to serve common functionality
//It's contain coursegrained methods can be accessiable to all clield controllers
//Functionality includes
//1) - get user from the session, get user roles and check its permissions
//2) - check employee's status, s/he's manager name etc.
//3) - 
class BaseController extends Controller {

  public function loginUser() {
    $all = Input::all();
    //check first if user has valid credentials
    $user = User::with('roles')->where('user_name', '=', $all['user_name'])->first();
    //check if user is null, then return error message.
    if($user) {
      //return $user;
      //if user is valid then check if its locked
     // $user = $user->toArray();
      if(!Hash::check($all['password'], $user['password'])) {
        return Response::jsend('fail',
          array('msg' => sprintf ("Password not matched, Please try again."))
        );
      }
      if($user['activation'] == 'lock') {
        return Response::jsend('fail',
          array('msg' => sprintf ("Username %s is locked, Reach out to your manager/HR to unlock your account.", 
            $all['user_name']))
        );
      }
      //if all is well, set the user in session and return success.
      //TODO also search for User roles, and set in session.
      unset($user['password']);
      $users_roles = array();
      if(count($user->roles) > 0) {
        foreach($user->roles as $role) {
          unset($role['pivot']);
          $users_roles[] = $role;
        }
      }
      unset($user['roles']);
      $user['roles'] = $users_roles;
      $manager = User::where('id','=',$user['manager_id'])
        ->first(array('id','first_name', 'last_name', 'email', 'activation'));
      $user['manager'] = $manager;
      Session::put('user_session', $user);
      return Response::jsend('success', $user /*array('msg' => 'success')*/);
    }
    else {
      return Response::jsend('fail', 
        array('msg' => sprintf ("Username %s is not valid, Please try again.", $all['user_name']))
      );
    }
  }
  
  //TODO implements full
  protected function hasUserPermission($permissions) {
    $auth_user = Session::get('user_session');
    $roles = $auth_user['roles'];
    $has_permissions = false;
    foreach($permissions as $permission) {
      
    }
  }
  
  protected function getUserId() {
    $auth_user = Session::get('user_session');
    $id = $auth_user['id'];
    return $id;
  }
  
  protected function isAdmin() {
    $auth_user = Session::get('user_session');
    $roles = $auth_user['roles'];
    $is_admin = false;
    foreach($roles as $role) {
      if($role['name'] === 'Admin') {
        $is_admin = true;
      }
    }
    return $is_admin;
  }
  
  protected function getManager() {
    $auth_user = Session::get('user_session');
    $mgr = $auth_user['manager'];
    return $mgr;
  }

  protected function isEmployee()
  {
    //employee role is a least access role. and every user is a employee
    //here the entention of this function is to check if user has only 'Employee' role ?
    $auth_user = Session::get('user_session');
    $roles = $auth_user['roles'];
    if(count($roles) == 1 && $roles[0]['name'] === 'Employee')
      return true;
    else 
      return false;
  }
}
