<?php

//Giving Model name as Sassion instead of 'Session' 
//because of Session Facade and name conflict
class Sassion extends Base {

	protected $table    = 'sassions';
  
  protected $fillable = array('sassion_name', 'course_id', 'schedule_date', 'due_date', 'user_id', 'capacity', 
    'location', 'status', 'delivery_method', 'description');
  
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }

  //Session has one-to-one relationship with User ( as Co-Ordinator)
  public function user() {
    //this matches the Eloquent model
		return $this->hasOne('User'); 
	}
  
  //Session belongs to Course
  public function course() {
    return $this->belongsTo('Course');
  }
  
  //Session has-many enrollments
  public function enroll() {
    return $this->hasMany('Enroll');
  }

}
