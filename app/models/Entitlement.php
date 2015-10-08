<?php

class Entitlement extends Base {

	protected $table    = 'entitlements';
  
  protected $fillable = array('name', 'no_of_days', 'calender');
  
  protected $hidden = array('created_at', 'updated_at');
  
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }

}