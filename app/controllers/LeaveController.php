<?php

class LeaveController extends BaseController {

	public function loadLeaveCalender()
	{
    $leaves = LeaveCalender::all();
    return Response::jsend('success', $leaves);
	}

  public function createLeaveCalender() 
  {
    $all = Input::all();
    $leaves = LeaveCalender::where('name', '=', $all['name'])->get();
    if(count($leaves) > 0) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Entitlement %s is already exist.", $all['name']))
      );
    }
    $id = LeaveCalender::create($all);
    return Response::jsend('success', $id);
  }
  
  //function use to delete any leave entitlement entry.
  public function deleteLeaveCalender()
  {
    $id = Input::get('id');
    LeaveCalender::where('id', '=', $id)->delete();
  }
  
  public function loadLeaveEntitlement()
  {
    $entitle = Entitlement::all();
    return Response::jsend('success', $entitle);
  }
  
  public function createNewEntitlement()
  {
    $all = Input::all();
    $name = $all['name'];
    $entitlement = Entitlement::where('name', '=', $name)->get();
    if(count($entitlement) > 0)
    {
      return Response::jsend('fail',
        array('msg' => sprintf ("Entitlement %s is already exist.", $name))
      );
    }
    else 
    {
      $id = Entitlement::create($all);
      return Response::jsend('success', 
        array('msg' => 'Entitlement successfully created.')
      );
    }
  }
  
  public function deleteEntitlement() 
  {
    $id = Input::get('id');
    $entitlement = Entitlement::where('id', '=', $id);
    $entitlement->delete();
  }
  /***
    function used to create a leave request, initially set to 'requested'.
    1) check if user has aready applied to leaves on that date.
    2) check if user exceed the no of days entitled for leaves fer year.
    3) 
   */
  public function applyForLeave()
  {
    $all = Input::all();
    $mgr = $this->getManager();
    $authUserId = $this->getUserId();
    $all['mgr_id'] = $mgr['id'];
    $all['user_id'] = $authUserId;
    $all['status'] = 'Eequest';
    //TODO
    //1) check if user exceed the no of days entitled for leaves fer year.
    $entitle = Entitlement::where('id', '=', $all['entitlement_id'])->first();
    /*
    $leaves = LeaveRequest::where('user_id', '=', $authUserId)
      ->where('entitlement_id', '=',  $all['entitlement_id'])->get();
    */
    $noOfDays = $entitle['no_of_days'];
    $leaveSum = DB::table('leave_requests')->where('user_id', '=', $authUserId)
      ->where('entitlement_id', '=',  $all['entitlement_id'])->sum('no_of_days');
    $totalLeaves = $leaveSum + $all['no_of_days'];
    if($totalLeaves > $noOfDays) {
      return Response::jsend('fail',
        array('msg' => sprintf ("You are Exceeding the Limit of %s", $entitle['name']))
      );
    }
    //2) if the user is already applied to that leave
    //3) create Leave request.
    LeaveRequest::create($all);
    return Response::jsend('success', array('msg' => 'Leave request is submitted.'));
  }
  
  /****
    common function used for User, Admin and Manager, need to check the role before query
  */
  public function showLeaveRequest()
  {
   // $isUser = 
  }
  
  /****
  * function used to show all users Leave request History in grid
  */
  public function showLeavesHistory() 
  {
    $userId = $this->getUserId();
    $histories = LeaveRequest::with('user')->with('entitlement')
      ->where('user_id', '=', $userId)->get();
    $leave_history = array();
    foreach($histories as $history) 
    {
      //'id', 'user_id', 'user_name', 'entitlement_name', 'no_of_days','from_date', 'to_date', 'status'
      $row = array();
      $row['id'] = $history['id'];
      $row['user_id'] = $history['id'];
      $row['no_of_days'] = $history['no_of_days'];
      $row['from_date'] = $history['from_date'];
      $row['to_date'] = $history['to_date'];
      $row['status'] = $history['status'];
      
      $user = $history['user'];
      $row['user_name'] = $user['first_name']. ' '.$user['last_name'];
      
      $ent = $history['entitlement'];
      $row['entitlement_name'] = $ent['name'].' ('. $ent['no_of_days'].' days)';

      $leave_history[] = $row;
    }
    return Response::jsend('success', $leave_history);
  }
  
  public function showApproveRequest()
  {
    $userId = $this->getUserId();
    $histories = LeaveRequest::with('user')->with('entitlement')
      ->where('mgr_id', '=', $userId)
      ->orderBy('id', 'DESC')->take(20)->get();
    $leave_history = array();
    foreach($histories as $history) 
    {
      $row = array();
      $row['id'] = $history['id'];
      $row['user_id'] = $history['id'];
      $row['no_of_days'] = $history['no_of_days'];
      $row['from_date'] = $history['from_date'];
      $row['to_date'] = $history['to_date'];
      $row['status'] = $history['status'];
      
      $user = $history['user'];
      $row['user_name'] = $user['first_name']. ' '.$user['last_name'];
      
      $ent = $history['entitlement'];
      $row['entitlement_name'] = $ent['name'].' ('. $ent['no_of_days'].' days)';

      $leave_history[] = $row;
    }
    return Response::jsend('success', $leave_history);
  }
  
  
  public function actionOnLeaveRequest()
  {
    $all = Input::all();
    $leave = LeaveRequest::where('id', '=', $all['id']);
    $leave->update(array('status' => $all['status']));
    return Response::jsend('success', 
      array('msg' => sprintf ("Leave status is set to %s.", $all['status']))
    );
  }
}
