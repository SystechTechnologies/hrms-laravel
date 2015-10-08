<?php

class Base extends Eloquent {
    
  /**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('created_at', 'updated_at', 'created_by', 'updated_by');
  
  public static function boot()
  {
    parent::boot();
    static::creating(function($model)
    {
      $user = Session::get('user_session');
      $model->created_by = $user['id']; //$user->id;
    //  $model->updated_by = $user['id']; //$user->id;
    });
    static::updating(function($model)
    {
      $user = Session::get('user_session');
      $model->updated_by = $user['id'];
    });
  }
    
}