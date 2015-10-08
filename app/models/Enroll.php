<?php

class Enroll extends Base {

	protected $table    = 'enroll_session';
  
  protected $fillable = array('course_id', 'sassion_id', 'user_id', 'status', 'comments');
  
  protected $hidden = array('created_at', 'updated_at', 'updated_by');
  
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }

  //user has many-to-many relationship with Enrollments.
  
  //Session has one-to-many relationship with Enrollmetns
  public function sessions() {
    return $this->belongsTo('Sassion');
  }
  
}