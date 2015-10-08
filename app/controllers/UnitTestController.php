<?php

class UnitTestController extends Controller {
  
  public function now() {
    
    $history = LeaveRequest::with('user')->with('entitlement')
      ->where('mgr_id', '=', 6)
      ->orderBy('id', 'DESC')->take(20)->get();
    return $history;
    //$leaves = User::with('leaveRequest')->where('id', '=', 6)->get();
    //return $leaves;
    //  return Config::get('systech.annual_start_date');
   // $enrolls = Enroll::with('sassions')->orderBy('id', 'DESC')->take(10)->get();
   /*$leaveSum = DB::table('leave_requests')->where('user_id', '=', 6)
      ->where('entitlement_id', '=',  1)->sum('no_of_days');
    echo $leaveSum;
    */
  }

}