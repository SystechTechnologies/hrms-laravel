<?php

class User extends Eloquent {

	protected $table    = 'users';
  
  protected $fillable = array('first_name', 'last_name', 'email', 'user_name', 
    'password', 'activation', 'gender', 'marital_status', 'manager_id');
  
  public    $guarded  = array();
  
  protected $hidden = array('created_at', 'updated_at', 'created_by', 'updated_by');
  
  public static function boot() 
  { 
    parent::boot(); 
  }

  //user has many-to-many relationship with roles.
  public function roles()
  {
    return $this->belongsToMany('Role');
  }
  
  public function leaveRequest()
  {
    return $this->hasMany('LeaveRequest');
  }
  
  public function payroll()
  {
    return $this->hasOne('Payroll');
  }
}
