Ext.define('SysTech.view.hrms.Course', {
//  bodyStyle : 'padding:10px',
  extend    : 'Ext.form.Panel',
  alias     : 'widget.course',
  width     : 450,
  border    : false,
  requires  : [
    'SysTech.view.Heading',
    'SysTech.store.SearchUser'
  ],
  fieldDefaults: {
    msgTarget : 'side',
    labelWidth: 120
  },
  defaults  : {
    anchor  : '100%'
  },
  defaultType : 'textfield',
  defaults    : {
    allowBlank  : false,
    msgTarget   : 'side',
    minLength   : 4,
    maxLenght   : 40,
    afterLabelTextTpl : "<span style='color:red;'>*</span>"
  },
  items: [{
    fieldLabel: 'Course Title',
    name      : 'course_name',
    anchor    : '100%',
    emptyText : 'course title',
    blankText : 'Course title is required.'
  },{
    xtype     : 'radiogroup',
    fieldLabel: 'Status',
    name      : 'status',
    columns   : 2,
    vertical  : true,
    anchor    : '65%',
    items     : [
      { boxLabel: 'Active', name: 'status', inputValue: 'Active', checked: true },
      { boxLabel: 'Passive', name: 'status', inputValue: 'Passive'}
    ]
  },{
    xtype : 'datefield',
    name  : 'duration',
    anchor      : '60%',
  //  width       : 200,
    fieldLabel  : 'Course Duration',
    emptyText   : 'course duration',
    blankText   : 'Course duration is required.'
  },{
    fieldLabel  : 'Description',
    xtype       : 'textarea',
    name        : 'description',
    anchor      : '100%',
    emptyText   : 'course description',
    blankText   : 'Course description is required.'
  },{
    xtype       : 'filefield',
   // xtype       : 'textfield',
    fieldLabel  : 'Attachment',
    labelWidth  : 120,
    name        : 'attachment',
    anchor      : '100%',
    buttonText  : 'Upload course syllabus',
    emptyText   : 'attachment file path',
    blankText   : 'Course duration is required.',
    buttonConfig : {
      iconCls   : 'attachment'
    }
  }],
  buttons: [/*{
    text    : 'Attach Course File',
    iconCls : 'attachment'
  },*/{
    text    : 'Create New Course',
    iconCls : 'course', action: 'create'
  },{
    text    : 'Reset',
    iconCls : 'reset', action: 'reset'
  }]
});
