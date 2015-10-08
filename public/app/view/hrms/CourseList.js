Ext.define('SysTech.view.hrms.CourseList', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.courselist',
//  width     : 700,
  border    : false,
  requires  : [
    'SysTech.store.hrms.Role',
    'SysTech.view.hrms.Course',
    'SysTech.store.hrms.Course',
    'SysTech.view.hrms.CourseGrid'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 140
  },
  defaults: {
    anchor: '100%'
  },
  items: [{
    xtype : 'course'
  }, {
    xtype : 'coursegrid', width : 720, height: 300
  }]
});
