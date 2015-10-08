Ext.define('SysTech.view.hrms.EmployeeList', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.employeelist',
//  width     : 700,
  border    : false,
  requires  : [
    'SysTech.store.hrms.Role' 
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 140
  },
  defaults: {
    anchor: '100%'
  },
  items: [{
    xtype : 'usersearch'
  }, {
    xtype : 'usergrid', height: 350, width: 750
  }]
}); 
