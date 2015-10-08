Ext.define('SysTech.view.hrms.UserForm', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.form.Panel',
  alias     : 'widget.userform',
  width     : 700,
  border    : false,
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
      defaults    : {
        allowBlank : false,
        msgTarget : 'side',
        minLength  : 4,
        maxLenght  : 40,
        afterLabelTextTpl : "<span style='color:red;'>*</span>"
      }, 
      items       : [{
        fieldLabel: 'First Name',
        name      : 'first_name',
        anchor    : '95%'
      },{
        fieldLabel: 'User Name',
        name: 'user_name',
        anchor:'95%'
      },{
        fieldLabel  : 'Password',
        name        : 'password',
        anchor      : '95%',
        inputType   : 'password'
      },{
        xtype     : 'radiogroup',
        fieldLabel: 'Gender',
        columns   : 2,
        vertical  : true,
        anchor    : '75%',
        items     : [
          { boxLabel: 'Male', name: 'gender', inputValue: 'male', checked: true},
          { boxLabel: 'Female', name: 'gender', inputValue: 'female'}
        ]
      },{
        fieldLabel: 'Manager Name',
        name      : 'manager_id',
        xtype     : 'combobox',
        anchor    : '95%',
        emptyText : 'Manager name',
        hideTrigger: true,
        minChars  : 2, 
        triggerAction: 'query', 
        typeAhead : true, 
        displayField: 'name',
        valueField: 'id',
        store     : Ext.getStore('SearchUser')
      }]
    },{
      columnWidth : 0.5,
      border      : false,
      layout      : 'anchor',
      defaultType : 'textfield',
      defaults    : {
        allowBlank  : false,
        msgTarget   : 'side',
        minLength   : 4,
        maxLenght   : 40,
        anchor    : '100%'
      }, 
      items       : [{
        fieldLabel: 'Last Name',
        name      : 'last_name'
      },{
        fieldLabel  : 'E-mail',
        name        : 'email',
       // anchor      : '100%',
        vtype       : 'email'
      },{
        fieldLabel  : 'Marital Status',
        name        : 'marital_status',
        labelWidth  : 120//,
        //anchor      : '100%'
      },{
        xtype     : 'radiogroup',
        fieldLabel: 'Account Activation',
        columns   : 2,
        vertical  : true,
        anchor    : '85%',
        items     : [
          { boxLabel: 'Active', name: 'activation', inputValue: 'active', checked: true},
          { boxLabel: 'Lock', name: 'activation', inputValue: 'lock'}
        ]
      }]
    }]
  },{
    xtype : 'fieldset',
    title : '<b>Mailing Address</b><small>&nbsp;(Optional)</small>',
    defaultType : 'textfield',
    collapsible : true,
    layout      : 'anchor',
    defaults    : {
      anchor  : '100%'
    },
    items   : [{
      fieldLabel: 'Street Address',
      name  : 'street_address',
    //allowBlank: false
    }, {
      xtype : 'container',
      layout: 'hbox',
      items : [{
        xtype : 'textfield',
        fieldLabel: 'City',
        name  : 'city',
      }, {xtype: 'splitter'},{
        xtype : 'combobox',
        name: 'state',
        fieldLabel  : 'State',
        labelWidth  : 50,
        width : 150,
        store : {
          fields  : ['abbr', 'name'],
          data : [
            {"abbr":"AL", "name":"Alabama"},
            {"abbr":"AK", "name":"Alaska"},
            {"abbr":"AZ", "name":"Arizona"}
          ]
        },
        valueField: 'abbr',
        displayField: 'name',
        typeAhead: true,
        queryMode: 'local',
        forceSelection: true
      }, {xtype: 'splitter'},{
        xtype: 'textfield',
        fieldLabel: 'Postal Code',
        labelWidth: 80,
        name: 'postal_code',
        width: 165,
        //allowBlank: false,
        maxLength: 10,
        enforceMaxLength: true,
        maskRe: /[\d\-]/,
        regex: /^\d{5}(\-\d{4})?$/,
        regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
      }]
    }]
  },{
    xtype : 'tabpanel',
    plain : true,
    activeTab : 0,
    height    : 160,
    defaults  : {bodyStyle:'padding:10px'},
    items     : [{
      title : 'Contact Details',
      //   defaults: {width: 230},
      defaults : {width: 500},
      defaultType: 'textfield',
      items   : [{
        fieldLabel: 'Home',
        name: 'home'//,
        //emptyText: '(888) 555-1212'
      },{
        fieldLabel: 'Business',
        name: 'business'
      },{
        fieldLabel: 'Mobile Number',
        name: 'mobile'
      },{
        fieldLabel: 'Fax Number',
        name: 'fax'
      }]
    },{
      title:'Qualifications',
      defaults: {width: 500},
      defaultType: 'textfield',
      items: [{
        fieldLabel: 'Work Experiance',
        name: 'work_experiance'
      },{
        fieldLabel: 'Education',
        name: 'education'
      },{
        fieldLabel: 'Skills',
        name: 'skills'
      },{
        fieldLabel: 'Languaues',
        name: 'languaues'
      }]
    },{
      title:'Additional Details',
      defaults: {width: 400},
      defaultType: 'textfield',
      items: [{
        fieldLabel: 'Driver\'s License Number',
        xtype : 'datefield',
        name  : 'lic_no',
        labelWidth  : 150,
        anchor  : '50%'
      },{
        fieldLabel  : 'License Expiry Date',
        xtype       : 'datefield',
        labelWidth  : 150,
        name        : 'lic_expiry',
        //  vtype:'email',
        anchor      :'50%'
      },{
        fieldLabel: 'Passport Number',
        name      : 'passport_no',
        labelWidth  : 150,
        anchor    : '95%'
      },{
        fieldLabel: 'Nationality',
        //     xtype : 'datefield',
        name      : 'nationality',
        labelWidth  : 150,
        //vtype:'email',
        anchor:'50%'
      }]
    }]
  }],
  buttons: [{
    text: 'Save User',
    iconCls: 'save',
    action : 'save'
  },{
    text: 'Reset', iconCls: 'reset', action : 'reset'
  }]
});
