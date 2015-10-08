Ext.define('SysTech.view.hrms.UserSearch', {
//  bodyStyle:'padding:10px',
  extend  : 'Ext.form.Panel',
  alias   : 'widget.usersearch',
  width   : 590,
  border  : false,
  requires:[
    'SysTech.view.Heading'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 120
  },
  defaults: {
    anchor: '100%'
  },
  items: [{
    layout  : 'column',
    border  : false,
    items   : [{
      columnWidth : 0.5,
      border      : false,
      layout      : 'anchor',
      defaultType : 'textfield',
      items : [{
        fieldLabel  : 'First Name',
        name        : 'first_name',
        anchor      : '95%'
      },{
        fieldLabel  : 'User name',
        //xtype       : 'datefield',
        name        : 'user_name',
       // labelWidth  : 140//,
        anchor      : '95%'
      },{
        xtype     : 'radiogroup',
        fieldLabel: 'Gender',
        columns   : 2,
        anchor    : '90%',
        vertical  : true,
          items: [
            { boxLabel: 'Male', name: 'rb', inputValue: '1' },
            { boxLabel: 'Female', name: 'rb', inputValue: '2', checked: true}
          ]
      },{
        fieldLabel  : 'Passport Number',
        name        : 'passport',
        anchor      : '95%'
      }]
    },{
      columnWidth   : 0.5,
      border        : false,
      layout        : 'anchor',
      defaultType   : 'textfield',
      items         : [{
        fieldLabel  : 'Last Name',
        name        : 'last_name',
        anchor:'100%'
      },{
        fieldLabel  : 'Manager Name',
        name        : 'manager_id',
        anchor:'100%'
      },{
        fieldLabel  : 'License Expiry Date',
        xtype       : 'datefield',
        name        : 'license_exp_date',
        anchor      : '100%'
      },{
        fieldLabel  : 'Nationality',
        name        : 'nationality',
        anchor:'100%'
      }]
    }]
  }],
  buttons: [{
    text    : 'Search User',
    iconCls : 'search'
  },{
    text    : 'Reset',
    iconCls : 'reset'
  }]
});
