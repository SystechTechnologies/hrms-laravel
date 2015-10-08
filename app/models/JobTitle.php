<?php

class JobTitle extends Eloquent {

	protected $table    = 'job_titles';
  
  protected $fillable = array('job_title', 'job_description');
  public    $guarded  = array();
  
}
