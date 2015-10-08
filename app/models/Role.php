<?php

class Role extends Base {

  public $guarded = array();
  
  public static function boot() { parent::boot(); }
  
  protected $fillable = array('name', 'description', 'type');
  
  //user and role must have m2m relation-ship
  public function users()
  {
    return $this->belongsToMany('User');
  }
  
}
