<?php

class Author extends Eloquent {
  public $timestamps = false;
  
  protected $fillable = array('name', 'email');
  
  public function books() {
    return $this->hasMany('Book');
  }

}
