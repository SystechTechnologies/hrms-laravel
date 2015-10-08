<?php

class LeaveCalender extends Eloquent {

	protected $table    = 'leave_calender';
  
  protected $fillable = array('name', 'type', 'leave_date', 'comments');
  
  protected $hidden = array('created_at', 'updated_at');
  
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }
  
}