Ext.define('SysTech.view.hrms.CreateSession', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.createsession',
  //width     : 700,
  border    : false,
  requires  : [
    'SysTech.view.hrms.Session',
    'SysTech.view.hrms.SessionGrid'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 140
  },
  defaults: {
    anchor: '100%'
  },
  items: [{
    xtype : 'session'
  }, {
    xtype : 'sessiongrid', width : 840, height: 300
  }]
});
