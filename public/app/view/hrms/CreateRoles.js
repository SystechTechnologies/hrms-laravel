Ext.define('SysTech.view.hrms.CreateRoles', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.createroles',
  width     : 600,
  border    : false,
  requires:[
    'SysTech.view.hrms.RolesGrid', 
    'SysTech.store.hrms.Role' 
  ],
  fieldDefaults: {
    msgTarget: 'side',
    labelWidth: 140
  },
  defaults: {
    anchor: '90%'
  },
  items   : [{
    xtype : 'heading',
    data  : {text : 'Create Roles for User'}
  },{
    xtype   : 'form',
    border  : false,
    defaultType: 'textfield',
    layout  : 'anchor',
    defaults: {
      anchor: '100%',
      afterLabelTextTpl : "<span style='color:red;'>*</span>"
    },
    items : [{
      fieldLabel: 'Role Name',
      name      : 'name',
      anchor    : '60%',
      allowBlank: false
    },{
      xtype     : 'textarea',
      fieldLabel: 'Role Description',
      name      : 'description',
      allowBlank: false
    }],
    buttons: [{
      text    : 'Save Role',
      action  : 'save', 
      iconCls : 'save'
    },{
      text    : 'Reset',
      iconCls : 'reset',
      action  : 'reset'
    }]
  },{
    xtype   : 'rolesgrid',
    title   : 'User Roles Grid',
    style   : {
      paddingTop  : '10px'
    }
  }]
});  
