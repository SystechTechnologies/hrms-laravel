<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('test/now', 'UnitTestController@now');

Route::get('roles', 'RoleController@loadRoles');
Route::post('roles/create', 'RoleController@create');
Route::post('roles/delete', 'RoleController@delete');
Route::post('roles/assign_roles', 'RoleController@assignRolesToUser');
Route::post('roles/delete_user_role', 'RoleController@deleteUserRoles');
Route::get('roles/view_user_role/{userId}', 'RoleController@viewUserRoles');

//Login controller
Route::post('login/check_user', 'BaseController@loginUser');

//User controller action
Route::post('users/create', 'UserController@create');
Route::get('users/load', 'UserController@load');
Route::get('users/searchUser', 'UserController@searchUser');

//Training Services
Route::post('training/create_course', 'TrainingController@createCourse');
Route::post('training/create_session', 'TrainingController@createSession');
Route::post('training/enroll_user', 'TrainingController@enrollUserToSession');
Route::get('training/load_sessions', 'TrainingController@loadSession');
Route::get('training/load_courses', 'TrainingController@loadCourses');
Route::get('training/load_enrollments', 'TrainingController@loadEnrollmentDetails');
Route::get('training/search_course', 'TrainingController@searchCourse');
Route::get('training/search_session', 'TrainingController@searchSession');
Route::post('training/approve_enrollment', 'TrainingController@approveEnrollment');

/** LeaveManagement URLs **/
Route::get('leave/load_leave_calender',     'LeaveController@loadLeaveCalender');
Route::post('leave/delete_leave_calender',  'LeaveController@deleteLeaveCalender');
Route::post('leave/create_leave_calender',  'LeaveController@createLeaveCalender');
Route::get('leave/load_leave_entitlement',  'LeaveController@loadLeaveEntitlement');
Route::post('leave/create_entitlement',     'LeaveController@createNewEntitlement');
Route::post('leave/delete_leave_entitlement', 'LeaveController@deleteEntitlement');
Route::post('leave/apply_leave',            'LeaveController@applyForLeave');
Route::get('leave/show_leave_history',      'LeaveController@showLeavesHistory');
Route::get('leave/show_approve_request',    'LeaveController@showApproveRequest');
Route::post('leave/approve_leave_request',  'LeaveController@actionOnLeaveRequest');

/** Payroll URLs **/
Route::get('payroll/load_job_categories',   'PayrollController@loadJobCategories');
Route::post('payroll/create_job_category',  'PayrollController@createJobCategory');
Route::post('payroll/delete_job_category',  'PayrollController@deleteJobCategory');
Route::get('payroll/load_salary_comp',      'PayrollController@loadSalaryComponents');
Route::post('payroll/create_salary_comp',   'PayrollController@createSalaryComponent');
Route::post('payroll/delete_salary_comp',   'PayrollController@deleteSalaryComponent');
Route::get('payroll/load_job_titles',       'PayrollController@loadJobTitles');
Route::post('payroll/create_job_title',     'PayrollController@createJobTitle');
Route::post('payroll/delete_job_title',     'PayrollController@deleteJobTitle');

Route::post('payroll/load_user_payroll',    'PayrollController@loadUserPayroll');
Route::post('payroll/create_user_payroll',  'PayrollController@createUserPayrollDetails');


Route::get('/', function()
{
  return View::make('index');
});

Route::get('/pdf', function()
{
    $html = '<html><body>'
            . '<p>Welcome to TechZoo.</p>'
            . '</body></html>';
        return PDF::load($html, 'A4', 'portrait')->download('my_pdf');
});

Event::listen('laravel.query', function($sql) {
  var_dump($sql);
});
