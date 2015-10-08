<?php

class Course extends Base {

	protected $table    = 'courses';
  
  protected $fillable = array('course_name', 'status', 'duration', 'attachment', 'description');
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }
  
  // each course has many sessions
	public function sessions() {
		return $this->hasMany('Sassion');
	}

}
