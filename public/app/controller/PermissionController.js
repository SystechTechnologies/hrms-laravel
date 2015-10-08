Ext.define('SysTech.controller.PermissionController', {
  extend  : 'Ext.app.Controller',
  stores  : [],
  views   : [],
  refs    : [{
    ref   : 'manageEmpTab',
    xtype : 'manage_employee_tab',
    selector: 'manage_employee_tab'
  }],
  init: function () {
    this.control({
      'manage_employee_tab': {
        beforerender: this.hrmsBeforeRendered
      }
    });
  },
  hrmsBeforeRendered: function(me) {
    
  },
  /**
  * utility method to check if user has required permissions or not
  */
  hasPermission: function(permission) {
  
  },
  /**
   * utility method to check if user has required permissions or not
   */
  getUserPermissions: function() {
  
  }
  
});
