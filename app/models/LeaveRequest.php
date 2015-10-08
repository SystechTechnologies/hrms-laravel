<?php

class LeaveRequest extends Base {

	protected $table    = 'leave_requests';
  
  protected $fillable = array('user_id', 'mgr_id', 'entitlement_id', 'from_date', 
    'to_date', 'no_of_days', 'status', 'address_on_leave', 'remarks');
  
  protected $hidden = array('created_at', 'updated_at', 'created_by', 'updated_by');
  
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }
  
  //One-to-Many relationship with entitlements (Inversion) 
  public function entitlement()
  {
    return $this->belongsTo('Entitlement');
  }
  
  //One-to-Many relationship with User
  public function user()
  {
    return $this->belongsTo('User');
  }
  
}