Ext.define('SysTech.view.hrms.Session', {
//  bodyStyle : 'padding:10px',
  extend    : 'Ext.form.Panel',
  alias     : 'widget.session',
  width     : 690,
  border    : false,
  requires  :[
    'SysTech.view.Heading'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 120
  },
  defaults  : {
    anchor  : '100%'
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
        allowBlank  : false,
        msgTarget   : 'side',
     //   minLength   : 4,
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        maxLenght   : 40
      },
      items       : [{
        fieldLabel: 'Session Name',
        name      : 'sassion_name',
        anchor    : '95%'
      }, {
        xtype : 'datefield',
        name  : 'schedule_date',
        anchor      : '75%',
        format      : 'd-m-Y',
        fieldLabel  : 'Scheduled Date'
      },{
        xtype       : 'numberfield',
        fieldLabel  : 'Capacity',
        labelWidth  : 120,
        name        : 'capacity',
        anchor      : '60%'
      },{
        fieldLabel  : 'Location',
        name        : 'location',
        anchor      : '95%'
      },{
        fieldLabel  : 'Status',
        xtype       : 'combobox',
        name        : 'status',
        anchor      : '95%',
        listeners   : {},
        editable    : false,
        labelWidth  : 120,
        store       : {
          fields    : ['abbr', 'name'],
          data      : [
            {"abbr":"pending", "name":"Pending Approval"},
            {"abbr":"scheduled", "name":"Scheduled"},
            {"abbr":"cancelled", "name":"Cancelled"},
            {"abbr":"complete", "name":"Completed"}
          ]
        },
        valueField  : 'abbr',
        displayField: 'name',
        typeAhead   : true,
        queryMode   : 'local',
        forceSelection: true
      },{
        xtype       : 'combobox',
        fieldLabel  : 'Delivery Method',
        name        : 'delivery_method',
        anchor      : '95%',
        anchor      : '95%',
        labelWidth  : 120,
        editable    : false,
        store       : {
          fields    : ['abbr', 'name'],
          data      : [
            {"abbr":"class_room", "name":"Class Room"},
            {"abbr":"self_study", "name":"Self Study"},
            {"abbr":"online", "name":"Online"},
            {"abbr":"webex", "name":"Web Ex"}
          ]
        },
        valueField  : 'abbr',
        displayField: 'name',
        typeAhead   : true,
        queryMode   : 'local',
        forceSelection: true
      }]
    },{
      columnWidth : 0.5,
      border      : false,
      layout      : 'anchor',
      defaultType : 'textfield',
      defaults    : {
        allowBlank  : false,
        msgTarget   : 'side',
      //  minLength   : 4,
        maxLenght   : 40,
        afterLabelTextTpl : "<span style='color:red;'>*</span>"
      },
      items       : [{
        fieldLabel  : 'Course Name',
        xtype       : 'combobox',
        name        : 'course_id',
        emptyText   : 'Course name',
        hideTrigger : true,
        minChars    : 2, 
        triggerAction: 'query', 
        typeAhead   : true, 
        displayField: 'course_name',
        valueField  : 'id',
        anchor      : '100%',
        store       : Ext.getStore('SearchCourse')
      },{
        fieldLabel  : 'Co-ordinator',
        name        : 'user_id',
        anchor      : '100%',
        xtype       : 'combobox',
        emptyText   : 'Co-ordinator',
        hideTrigger : true,
        minChars    : 2, 
        triggerAction: 'query', 
        typeAhead   : true, 
        displayField: 'name',
        valueField  : 'id',
        store       : Ext.getStore('SearchUser')
      },{
        xtype       : 'datefield',
        name        : 'due_date',
        anchor      : '75%',
        format      : 'd-m-Y',
        fieldLabel  : 'Due Date'
      },{
        fieldLabel  : 'Description',
        xtype       : 'textarea',
        name        : 'description',
        anchor      : '100%',
        height      : 80
      }]
    }]
  }],
  buttons: [/*{
    text    : 'Attach Course File',
    iconCls : 'attachment'
  },*/{
    text    : 'Create Session',
    iconCls : 'hr-training',
    action  : 'create'  
  },{
    text    : 'Reset',
    iconCls : 'reset', 
    action  : 'reset'
  }]
});
