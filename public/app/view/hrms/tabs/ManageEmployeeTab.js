Ext.define('SysTech.view.hrms.tabs.ManageEmployeeTab', {
  extend  : 'SysTech.view.BaseTabPanel',
  alias   : 'widget.manage_employee_tab',
  title   : 'Manage Employees',
  itemId  : 'manage_employee_tab',
  config  : {
    menu  : '', //current selected menu
    tab   : '' // current selected button
  },
  tbar    : [
    { xtype: 'splitbutton', text: 'Employee List', iconCls: 'hr-user-list', action : 'emp_list',
      menu: new Ext.menu.Menu({
        width: 160,
        items: [
          {text: 'Add Employee', iconCls: 'hr-add-user', action : 'add_emp'},
          {text: 'Create Roles', iconCls: 'hr-create-role', action : 'create_roles'},
          {text: 'Assign Roles', iconCls: 'hr-assign-role', action : 'assign_roles'}
        ]
      })
    },
    /** For Admin, Manager 
    { xtype: 'splitbutton', text: 'Manage Leaves', iconCls: 'hr-leaves', handler: function(){ alert("Manage Leave"); },
      menu: new Ext.menu.Menu({
        items: [
          {text: 'Assign Leave', iconCls: 'hr-add-user', handler: function(){ alert("Item 1 clicked"); }},
          {text: 'Create Roles', iconCls: 'hr-create-role', handler: function(){ alert("Item 2 clicked"); }},
          {text: 'Assign Roles', iconCls: 'hr-assign-role', handler: function(){ alert("Item 2 clicked"); }}
        ]
      })
    },**/
    /** For Employee **/ 
    { 
      xtype : 'button',
      text  : 'Payroll Details',
      iconCls : 'payroll',
      action  : 'payroll_panel'
    }
  ],
  items : [{
    xtype: 'employeelist'
  }]
});