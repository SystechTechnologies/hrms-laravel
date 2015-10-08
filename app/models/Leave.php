<?php

class Leave extends Base {

	protected $table    = 'leave_requests';
  
  protected $fillable = array('user_id', 'mgr_id', 'leave_type', 'from_date', 'to_date', 'no_of_days',
    'status', 'address_on_leave', 'remarks');
  
  protected $hidden = array('created_at', 'updated_at', 'created_by', 'updated_by');
  
  public    $guarded  = array();
  
  public static function boot()
  { 
    parent::boot(); 
  }

  public function entitlement()
  {
    return $this->hasOne('Entitlement', 'leave_type');
  }
  
}