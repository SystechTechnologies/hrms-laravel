/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
var global
Ext.application({
    name: 'SysTech',

    views: [
    
      /* ============ Commons ============ */
      'Viewport', 'BasePanel', 'nav.NavMenu', 'nav.MenuPanel', 'LoginPanel', 
      'BaseTabPanel', 'Heading', 'common.Component', 'common.CTemplate', 'Permission',
      
      /* ============ HRMS ============ */
      'hrms.tabs.LeaveManagementTab', 'hrms.tabs.ManageEmployeeTab', 'hrms.UserSearch',
      'hrms.UserGrid','hrms.CreateRoles', 'hrms.AssignRoles', 'hrms.EmployeeList',
      'hrms.tabs.PayrolDetailsTab',
      
      /* Training Services views */
      'hrms.tabs.TrainingServicesTab','hrms.Course', 'hrms.CourseList', 'hrms.CreateSession',
      'hrms.Session', 'hrms.SessionGrid', 'hrms.Enroll', 'hrms.CreateEnroll', 'hrms.CourseGrid',
      'hrms.EnrollGrid', 'hrms.UserEnrollmentPanel',
      
      /* Leave Management */
      'hrms.LeaveEntitlement', 'hrms.LeaveCalender', 'hrms.Entitlement', 'hrms.LeaveHistoryGrid',
      'hrms.LeaveApprovalGrid',
      
      /* Payroll Management */
      'hrms.PayrollPanel', 'hrms.JobCategories', 'hrms.SalaryComponents', 'hrms.UserPayroll', 
      'hrms.JobTitle', 'hrms.UserPayrollDetails'
    ],
    models  : ['MenuModel', 'AuthUser'],
    controllers: [
      'Main', /*'LoginController',*/ 'BaseController',
      'hrms.HRMSController'
    ],
    stores: [
      // TODO: add stores here
      /** Common stores **/
      'SearchUser', 'SearchCourse', 'SearchSession',
      /** HRMS Module Stores **/
      'hrms.User', 'hrms.Role', 'hrms.Session', 'hrms.Course', 'hrms.Enroll', 'hrms.LeaveRequest',
      /** Payroll Stores **/
      'hrms.JobCategory', 'hrms.SalaryComponent', 'hrms.JobTitle'
    ],
    launch: function() {
      global = this;
      Ext.create('SysTech.view.LoginPanel',
        { renderTo : Ext.getBody()}
      );  
    }//,
    //autoCreateViewport: true
});
