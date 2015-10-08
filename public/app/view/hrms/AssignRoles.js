Ext.define('SysTech.view.hrms.AssignRoles', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.assignroles',
  width     : 700,
  border    : false,
  requires:[
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
    xtype : 'heading',
    data : {text : 'Assign  Roles to User'}
  },{
    xtype : 'form',
    width : 440,
    border  : false,
    layout  : 'anchor',
    defaults    : {
      allowBlank  : false,
      msgTarget   : 'side',
      minLength   : 4,
      maxLenght   : 40
    }, 
    items : [{
      xtype     : 'fieldcontainer',
      //labelWidth: 100,
      layout    : 'hbox',
      anchor    : '100%',
      items     : [{
        fieldLabel: 'User Name',
        name      : 'user_id',
        xtype     : 'combobox',
        width     : 355,
        emptyText : 'User name',
        hideTrigger: true,
        minChars  : 2, 
        triggerAction: 'query',
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        typeAhead : true, 
        displayField: 'name',
        valueField: 'id',
        store     : Ext.getStore('SearchUser')
      },{
        xtype : 'splitter'
      },{
        xtype : 'button',
        text  : 'User roles',
        action  : 'view_roles',
        iconCls : 'hr-assign-role'
      }]
    },{
      fieldLabel: 'Roles',
      name      : 'role_id',
      xtype     : 'combobox',
      editable  : false,
      anchor    : '100%',
    //  readOnly  : true,
      emptyText : 'Select one or many roles',
    //  hideTrigger: true,
    //  minChars  : 2, 
    //  triggerAction: 'query', 
    //  typeAhead       : false, 
      multiSelect     : 'true',
      forceSelection  : true,
      displayField    : 'name',
      valueField      : 'id',
      queryMode       : 'local',
      afterLabelTextTpl : "<span style='color:red;'>*</span>",
      store           : Ext.getStore('roleStore'),
      listeners       : {
        change: function(combo, eOpts){
        }
      }
    }],
    buttons: [{
    text    : 'Assign Roles',
    iconCls : 'hr-assign-role',
    action  : 'assign'
    },{
      text    : 'Reset',
      iconCls : 'reset',
      action  : 'reset'
    }]
  },{
    xtype : 'rolesgrid'
  }]
}); 
