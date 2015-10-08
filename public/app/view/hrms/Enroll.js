Ext.define('SysTech.view.hrms.Enroll', {
//  bodyStyle : 'padding:10px',
  extend    : 'Ext.form.Panel',
  alias     : 'widget.enroll',
  width     : 700,
  border    : false,
  requires  : [
    'SysTech.view.Heading'
  ],
  items : [{
    layout  : 'column',
    border  : false,
    items   : [{
      columnWidth : 0.5,
      border      : false,
      layout      : 'anchor',
      fieldDefaults  : {
        msgTarget : 'side',
        labelWidth: 120,
        afterLabelTextTpl : "<span style='color:red;'>*</span>"
      },
      defaults    : {
        anchor      : '90%',
        allowBlank  : false,
        msgTarget   : 'side',
        maxLenght   : 40
      },
      items       : [{
        xtype     : 'combobox',
        fieldLabel: 'User Name',
        name      : 'user_id',
        emptyText : 'User name',
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        hideTrigger: true,
        minChars  : 2, 
        triggerAction: 'query', 
        typeAhead : true, 
        displayField: 'name',
        valueField: 'id',
        blankText : 'User name is required.',
        store     : Ext.getStore('SearchUser')
      },{
        fieldLabel  : 'Course Name',
        xtype       : 'combobox',
        name        : 'course_id',
        emptyText   : 'Course name',
        hideTrigger : true,
        minChars    : 2, 
        triggerAction: 'query', 
        typeAhead   : true, 
        displayField: 'course_name',
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        valueField  : 'id',
        blankText   : 'Course name is required.',
        store       : Ext.getStore('SearchCourse')
      },{
        xtype       : 'combobox',
        fieldLabel  : 'Session Name',
        name        : 'sassion_id',
        emptyText   : 'Session name',
        hideTrigger : true,
        minChars    : 2, 
        triggerAction: 'query', 
        typeAhead   : true, 
        displayField: 'sassion_name',
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        blankText   : 'Session name is required.',
        valueField  : 'id',
        store       : Ext.getStore('SearchSession')    
      },{
        xtype       : 'combobox',
        fieldLabel  : 'Status',
        name        : 'status',
     //   labelWidth  : 120,
        store       : {
          fields    : ['abbr', 'name'],
          data      : [
            {"abbr":"Request", "name":"Request"},
            {"abbr":"Approved", "name":"Approved"},
            {"abbr":"Reject", "name":"Reject"},
            {"abbr":"Cancel", "name":"Cancel"}
          ]
        },
        valueField  : 'abbr',
        displayField: 'name',
        typeAhead   : true,
        queryMode   : 'local',
        afterLabelTextTpl : "<span style='color:red;'>*</span>",
        forceSelection: true
      }]
    },{
      columnWidth : 0.5,
      border      : false,
      layout      : 'anchor',
      fieldDefaults  : {
        msgTarget   : 'side',
        labelWidth  : 120,
        afterLabelTextTpl : "<span style='color:red;'>*</span>"
      },
      defaults    : {
        anchor      : '100%',
        allowBlank  : false,
        msgTarget   : 'side',
        maxLenght   : 40
      },
      items       : [/*{
            xtype: 'fieldcontainer',
            fieldLabel: 'Last Three Jobs',
            labelWidth: 100,

            // The body area will contain three text fields, arranged
            // horizontally, separated by draggable splitters.
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                flex: 1
            }, {
                xtype: 'splitter'
            }, {
              xtype: 'button',
              text: 'hello'
            }]
      },*/
      {
        fieldLabel  : 'Description',
        xtype       : 'textarea',
        name        : 'comments',
        allowBlank  : true,
        height      : 80,
        afterLabelTextTpl : ''
      }]
    }]
  }],
  buttons: [{
    text    : 'Assign Training',
    iconCls : 'hr-training',
    action  : 'create'  
  },{
    text    : 'Reset',
    iconCls : 'reset', 
    action  : 'reset'
  }]
});
