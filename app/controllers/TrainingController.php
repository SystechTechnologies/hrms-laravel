<?php

class TrainingController extends BaseController {

	public function loadSession()
	{
   // $sessions = Sassion::all(); //Sassion::find(1)->course
    $sessions = Sassion::with('course')->take(12);
    return Response::jsend('success', $sessions->get());
	}
  
  //load all courses
  public function loadCourses()
	{
    $courses = Course::orderBy('id', 'DESC')->take(10);//with('sessions')->take(10);
    return Response::jsend('success', $courses->get());
	}

  public function createCourse()
	{
    //check if the course already exist...
    $all = Input::all();
    $course = Course::where('course_name', '=', $all['course_name'])->first();
    if($course) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Course name %s is already exist. Please create course with another name.", $all['course_name']))
      );
    }
    else {
      //create new course details.
      $course = Course::create($all);
      //after successfully creating Course
      //$id = $course->id;
      return Response::jsend('success', 
        array('msg' => 'Course successfully created.'));
    }
	}
  
  //function used to create session with course, and co-ordinator name
  public function createSession()
	{
    //check if the session with same name already exist...
    $all = Input::all();
    $session = Sassion::where('sassion_name', '=', $all['sassion_name'])->first();
    if($session) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Session name %s is already exist. Please create session with another name.", $all['sassion_name']))
      );
    }
    else {
      //create new session details.
      $session = Sassion::create($all);
      //after successfully creating Course
      //$id = $course->id;
      return Response::jsend('success', array('msg' => 'Session successfully created.'));
    }
	}
  
  //function used to enroll user to session for training
  //1) check if session belongs to course, else throw error.
  //2) check if the session user enrolled to 
  //    - is active, and scheduled 
  //    - has not cross the capacity of session limit.
  //
  public function enrollUserToSession()
	{
    //check if the session with same name already exist...
    $all = Input::all();
   // return Response::jsend('success', $all);
    $enroll = Enroll::where('user_id', '=', $all['user_id'])
      ->where('sassion_id', '=', $all['sassion_id'])
      ->get();
    if(count($enroll) > 0) {
      return Response::jsend('fail',
        array('msg' => sprintf ("User are already register to this session."))
      );
    }
    else {
      //select session to validate before we save it.
      $sassion = Sassion::where('id', '=', $all['sassion_id'])->first();
      if(count($sassion) > 0) {
        //check if this session belongs to selected course or not
        if($sassion['course_id'] != $all['course_id']) {
          return Response::jsend('fail',
            array('msg' => sprintf ("Session %s doesn't belongs to selected Course.", $sassion['sassion_name']))
          );
        }
      }
      //Now check the capacity of session
      $capacity = $sassion['capacity'];
      $count = Enroll::where('sassion_id', '=', $all['sassion_id'])->count();
      if($count == $capacity) {
        return Response::jsend('fail',
          array('msg' => sprintf ("Can't enroll to session. Its full."))
        );
      }
      //TODO
      //check user permissions, and manager approval
      $enroll = Enroll::create($all);
      return Response::jsend('success', array('msg' => 'User successfully enrolled to session.'));
    }
	}
  
  //Deleting course will also delete all the active/passive 
  //session associated with it. 
  public function deleteCourse()
	{
    //check if the role already exist...
    /*
    $id = Input::get('id');
    $role = Role::find($id);
    $role->delete();
    return Response::jsend('success', array('msg' => 'Role successfully deleted.'));
    */
	}

  public function searchUser()
  {
    $query = Input::get('query');
    //TODO search inactive users.
    $users = User::where('first_name', 'like', "$query%")
      ->get(array('id', 'first_name', 'last_name'));
    $users_array = array();
    foreach($users as $user) {
      $users_array[] = array('id' => $user->id, 
        'name' => $user['first_name']. ', '.$user['last_name']);
    }
    return Response::jsend('success', $users_array);
  }
  
  public function searchCourse()
  {
    $query = Input::get('query');
    $courses = Course::where('course_name', 'like', "$query%")
      ->where('status', '=', 'Active')
      ->get(array('id', 'course_name'));
    return Response::jsend('success', $courses);
  }
  
  public function searchSession()
  {
    $query = Input::get('query');
    $sessions = Sassion::where('sassion_name', 'like', "$query%")
      ->where('status', '=', 'scheduled')
      ->get(array('id', 'sassion_name'));
    return Response::jsend('success', $sessions);
  }
  
  /**
    This method used for two perpose
    1) load all enrollemts for all session (group by session) for HR, Admin users.
    2) load individual enrollments details for current employee. (if $sessionId = '')
  */
  //TODO fix optimize query, make relation ship so we can avoid executing multiple queries.
  public function loadEnrollmentDetails()
  {
    $sessionId = Input::get('sessionId', '');
    //if $sessionId is '' then its from employee, so show him his records
 //   Log::info("Starting Laravel Logs...");
  //  Log::info("Session ID :" . $sessionId);
    $enroll_array = array();
    if($sessionId == '') {
      $enrolls = Enroll::with('sessions')->where('status', '!=', 'Approved')
        ->where('user_id', '=', $this->getUserId())
        ->orderBy('id', 'DESC')->take(20)->get();
        
      foreach($enrolls as $enroll) {
        $session = Sassion::where('id', '=', $enroll['sassion_id'])
          ->first(array('sassion_name','due_date', 'schedule_date', 'delivery_method', 'capacity'));
        
        $enroll['sassion_name'] = $session['sassion_name'];
        $enroll['due_date'] = $session['due_date'];
        $enroll['capacity'] = $session['capacity'];
      // $enroll['enrolled'] = 2; //$session['capacity'];
        $enroll['schedule_date'] = $session['schedule_date'];
        $enroll['delivery_method'] = $session['delivery_method'];
        
        $course = Course::where('id', '=', $enroll['course_id'])
          ->first(array('course_name'));
        $enroll['course_name'] = $course['course_name'];
        
        $user = User::where('id', '=', $enroll['user_id'])
          ->first(array('first_name', 'last_name'));
        $enroll['user_name'] = $user['first_name'] .' '.$user['last_name'] ;
        $enroll_array[] = $enroll;
      }
    }
    else {
      $enrolls = Enroll::with('sessions')->where('status', '!=', 'Approved')
        ->where('sassion_id', '=', $sessionId)
        ->orderBy('id', 'DESC')->take(20)->get();
      
      //TODO here we should check, if he is a manager, but not HR, Admin, then we should load the records 
      //currosponding to its sub-ordinates only.
      
      //TODO optimize query, make relation ship so we can avoid executing multiple queries.
      $session = Sassion::where('id', '=', $sessionId)
        ->first(array('sassion_name','due_date', 'schedule_date', 'delivery_method', 'capacity'));
        
      foreach($enrolls as $enroll) 
      {
       // $each = array_merge($enroll);
        $enroll['sassion_name'] = $session['sassion_name'];
        $enroll['due_date'] = $session['due_date'];
        $enroll['capacity'] = $session['capacity'];
        $enroll['schedule_date'] = $session['schedule_date'];
        $enroll['delivery_method'] = $session['delivery_method'];
        
        $course = Course::where('id', '=', $enroll['course_id'])
          ->first(array('course_name'));
        $enroll['course_name'] = $course['course_name'];
        
        $user = User::where('id', '=', $enroll['user_id'])
          ->first(array('first_name', 'last_name'));
        $enroll['user_name'] = $user['first_name'] .' '.$user['last_name'] ;
        $enroll_array[] = $enroll;
      }
    }
    return Response::jsend('success', $enroll_array);
  }
  
  public function approveEnrollment() 
  {
    $id = Input::get('id');
    $enroll = Enroll::where('id', '=', $id)->first();
    $enroll->status = 'Approved';
    $enroll->update();
    return Response::jsend('success', $enroll); 
  }
  
  
  
}
