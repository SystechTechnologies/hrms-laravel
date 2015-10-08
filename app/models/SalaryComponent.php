<?php

class SalaryComponent extends Eloquent {

	protected $table    = 'salary_components';
  
  protected $fillable = array('name', 'type', 'total_payable', 'ctc');
  public    $guarded  = array();
  
}
