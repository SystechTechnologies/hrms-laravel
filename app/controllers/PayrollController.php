<?php

class PayrollController extends BaseController {

	public function loadJobCategories()
	{
    $jobs = JobCategory::all();
    return Response::jsend('success', $jobs);
	}

  public function createJobCategory() 
  {
    $all = Input::all();
    $job = JobCategory::where('job_category', '=', $all['job_category'])->get();
    if(count($job) > 0) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Job category %s is already exist.", $all['job_category']))
      );
    }
    $id = JobCategory::create($all);
    return Response::jsend('success', 'Job Category successfully created.');
  }
  
  public function deleteJobCategory()
  {
    $id = Input::get('id');
    JobCategory::where('id', '=', $id)->delete();
  }
  
  /** Salary Components **/
  public function loadSalaryComponents()
	{
    $salary = SalaryComponent::all();
    return Response::jsend('success', $salary);
	}

  public function createSalaryComponent() 
  {
    $all = Input::all();
    $salary = SalaryComponent::where('name', '=', $all['name'])->get();
    if(count($salary) > 0) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Salary Component %s is already exist.", $all['name']))
      );
    }
    $id = SalaryComponent::create($all);
    return Response::jsend('success', 'Salary Component successfully created.');
  }
  
  public function deleteSalaryComponent()
  {
    $id = Input::get('id');
    SalaryComponent::where('id', '=', $id)->delete();
  }
  
  /** Job Titles **/
  public function loadJobTitles()
	{
    $salary = JobTitle::all();
    return Response::jsend('success', $salary);
	}

  public function createJobTitle() 
  {
    $all = Input::all();
    $salary = JobTitle::where('job_title', '=', $all['job_title'])->get();
    if(count($salary) > 0) {
      return Response::jsend('fail',
        array('msg' => sprintf ("Salary title %s is already exist.", $all['job_title']))
      );
    }
    $id = JobTitle::create($all);
    return Response::jsend('success', 
      array('msg' => sprintf ("Salary title %s successfully created.", $all['job_title']))
    );  
  }
  
  public function deleteJobTitle()
  {
    $id = Input::get('id');
    JobTitle::where('id', '=', $id)->delete();
  }
  
  /** User payroll details **/
  public function loadUserPayroll() 
  {
    $userId = Input::get('user_id');
    $pay = Payroll::where('user_id', '=', $userId)->get();
    if(count($pay) > 0) {
      //user has a payroll details associated with it.
      return Response::jsend('success', $pay[0]);
    }
    else {
      return Response::jsend('fail');
    }
  }
  
  public function createUserPayrollDetails()
  {
    $all = Input::all();
    $pay = Payroll::where('user_id', '=', $all['user_id']);
    if(count($pay->get()) > 0) {
      $pay->update($all);
    }
    else {
      Payroll::create($all);
    }
    return Response::jsend('success', 'Users Payroll successfully created.');
  }
  
}
