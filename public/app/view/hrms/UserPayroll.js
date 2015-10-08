Ext.define('SysTech.view.hrms.UserPayroll', {
  extend    : 'Ext.window.Window',
  alias     : 'widget.userpayroll',
  border    : false,
  frame     : true,
  layout    : 'fit',
 // title     : 'Edit user payroll details',
  width     : 380,
  height    : 380,
  bodyStyle : 'background:#fff;padding:10px;',
  modal     : true,
  draggable :  true,
  requires:[
  ],
  items     : [{
    xtype   : 'form',
    border  : false,
    url     : 'payroll/create_user_payroll',
    fieldDefaults : {
      labelAlign  : 'left',
      labelWidth  : 120,
      anchor      : '100%',
      allowBlank  : false,
      msgTarget   : 'side'
    },
    items : [{
      xtype : 'hidden',
      name  : 'user_id'
    },{
      name      : 'job_title',
      fieldLabel: 'Job Title',
      xtype     : 'combobox',
      store     : Ext.StoreMgr.lookup('jobTitleStore'),
      valueField    : 'id',
      displayField  : 'job_title',
      queryMode     : 'local',
      editable      : false,
      forceSelection: true,
      listeners : {
        afterrender : function(me) {
          me.getStore().load();
        }
      }
    },{
      fieldLabel: 'Employment Status',
      xtype : 'combobox',
      name  : 'status',
      store : {
        fields  : ['abbr', 'name'],
        data    : [
          {"abbr":"FL", "name":"Freelancer"},
          {"abbr":"FTC", "name":"Full time Contract"},
          {"abbr":"FTP", "name":"Full time Permernant"},
          {"abbr":"PTP", "name":"Part time Permernant"},
          {"abbr":"PTC", "name":"Part time Contract"}
        ]
      },
      valueField  : 'abbr',
      displayField: 'name',
      queryMode   : 'local',
      editable    : false
    },{
      xtype   : 'datefield',
      name    : 'joining_date',
      anchor  : '80%',
      format  : 'd-m-Y',
      editable  : false,
      fieldLabel: 'Joining Date'
    },{
      xtype   : 'datefield',
      name    : 'probition_end_date',
      anchor  : '80%',
      format  : 'd-m-Y',
      editable  : false,
      fieldLabel: 'Probition End Date'
    },{
      xtype   : 'datefield',
      name    : 'penmanent_date',
      anchor  : '80%',
      format  : 'd-m-Y',
      editable  : false,
      fieldLabel: 'Date of Permanency'
    },{
      xtype : 'combobox',
      name  : 'job_category',
      fieldLabel: 'Job Categoty',
      editable  : false,
      valueField: 'id',
      displayField: 'job_category',
      queryMode : 'local',
      store     : Ext.StoreMgr.lookup('jobCategoryStore'),
      listeners : {
        afterrender : function(me) {
          me.getStore().load();
        }
      }
    },{
      name  : 'job_location',
      fieldLabel: 'Job Location',
      xtype : 'combobox',
      store : {
        fields  : ['abbr', 'name'],
        data    : [
          {"abbr": 1, "name": "Alabama"},
          {"abbr": 2, "name": "Alaska"},
          {"abbr": 3, "name": "Arizona"}
        ]
      },
      valueField  : 'abbr',
      displayField: 'name',
      queryMode   : 'local',
      forceSelection: true
    },{
      name  : 'shift',
      fieldLabel: 'Working Shift',
      xtype : 'combobox',
      store : {
        fields  : ['abbr', 'name'],
        data    : [
          {"abbr":"FDW", "name":"Full Day Works"},
          {"abbr":"HDW", "name":"Half Day Works"}
        ]
      },
      valueField: 'abbr',
      displayField: 'name',
      queryMode: 'local',
      forceSelection: true
    },{
      xtype : 'textareafield',
      name  : 'comments',
      fieldLabel: 'Payroll Comments'
    }/*,{
      xtype: 'timefield',
      name: 'time1',
      fieldLabel: 'Time Field',
      minValue: '1:30 AM',
      maxValue: '9:15 PM'
    }*/]
  }],
  dockedItems: [{
    xtype   : 'toolbar',
    padding : '2 0 2 0',
    dock    : 'bottom',
    ui      : 'footer',
    items   : ['->',{
      text    : 'Reset Details',
      iconCls : 'reset',
      handler : function(me) {
        me.up('window').down('form').getForm().reset();
      }
    },{
      text    : 'Update payroll Details',
      iconCls : 'save',
      handler : function(me) {
        var form = me.up('window').down('form').getForm();
        if (form.isValid()) {
          form.submit({
            success: function(form, action) {
              me.up('window').destroy();
            }
          });
        }
      }
    }]
  }]
});  
