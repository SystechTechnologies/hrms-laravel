<?php

class JobCategory extends Eloquent {

	protected $table    = 'job_categories';
  
  protected $fillable = array('job_category', 'job_description');
  public    $guarded  = array();
  
}
