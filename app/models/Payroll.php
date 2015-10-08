<?php

class Payroll extends Base {

	protected $table    = 'user_payroll_details';
  
  protected $fillable = array('user_id', 'job_title', 'status', 'joining_date', 
    'probition_end_date', 'penmanent_date', 'job_category', 
    'job_location', 'shift', 'comments');
    
  protected $hidden = array('created_at', 'updated_at', 'created_by', 'updated_by');
  public    $guarded  = array();
  
  public static function boot() { 
    parent::boot(); 
  }
  
  public function user() {
    return $this->belongsTo('User');
  }
  
}