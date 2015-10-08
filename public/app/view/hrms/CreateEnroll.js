Ext.define('SysTech.view.hrms.CreateEnroll', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.createenroll',
  //width     : 700,
  border    : false,
  requires  : [
    'SysTech.view.hrms.Enroll',
    'SysTech.view.hrms.EnrollGrid'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 140
  },
  defaults: {
    anchor: '100%'
  },
  items: [{
    xtype : 'enroll'
  },{
    xtype : 'enrollgrid', width : 820, height: 380
  }]
});
