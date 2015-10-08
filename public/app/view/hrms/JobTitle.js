Ext.define('SysTech.view.hrms.JobTitle', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.jobtitle',
  width     : 600,
  border    : false,
  requires:[
    'SysTech.store.hrms.JobTitle'
  ],
  defaults: {
    anchor: '90%'
  },
  items   : [{
    xtype   : 'form',
    border  : false,
    url     : 'payroll/create_job_title',
    defaultType: 'textfield',
    layout  : 'anchor',
    defaults: {
      anchor    : '100%',
      msgTarget : 'side',
      labelWidth: 160,
      afterLabelTextTpl : "<span style='color:red;'>*</span>"
    },
    items : [{
      fieldLabel: 'Job Title',
      name      : 'job_title',
      anchor    : '80%',
      allowBlank: false
    },{
      xtype     : 'textarea',
      fieldLabel: 'Job Title Description',
      name      : 'job_description',
      anchor    : '80%',
      allowBlank: false
    }],
    dockedItems: [{
      xtype   : 'toolbar',
      padding : '2 0 2 0',
      dock    : 'bottom',
      ui      : 'footer',
      items   : [{
        text    : 'Reset Form',
        iconCls : 'reset',
        handler : function() {
          this.up('form').getForm().reset();
        }
      },{
        text    : 'Create Job Title',
        iconCls : 'save',
        handler : function() {
          var form = this.up('form').getForm();
          if (form.isValid()) {
            form.submit({
              success: function(form, action) {
                Ext.Msg.alert('Success', action.result.data.msg);
                Ext.StoreMgr.lookup('jobTitleStore').load();
                form.reset();
              }
            });
          }
        }
      }]
    }],
  },{
    xtype   : 'grid',
    title   : 'Job Titles Grid',
    style   : {
      paddingTop  : '10px'
    },
    store   : Ext.StoreMgr.lookup('jobTitleStore'),
    columns: [
      { text  : 'Job Title', dataIndex: 'job_title', width : 180 },
      { text  : 'Description',  dataIndex: 'job_description', flex: 1 },
      { text  : 'Action', xtype : 'actioncolumn', width : 80,
        items : [{
          icon    : 'images/cross.png',
          tooltip : 'Delete Title',
          width   : 50,
          handler : function(grid, rowIndex, colIndex) {
            var record = grid.getStore().getAt(rowIndex);
            Ext.Ajax.request({
              url   : 'payroll/delete_job_title',
              params: {
                id: record.get('id')
              },
              success: function(response){
                Ext.Msg.show({
                  title : 'Confirmation',
                  msg   : 'Job Title successfully deleted.',
                  width : 300,
                  buttons: Ext.Msg.OK,
                  fn: function() {
                    Ext.StoreMgr.lookup('jobTitleStore').load();
                  },
                  icon: Ext.window.MessageBox.INFO
                });
              }
            });//request
          }
        }]
      }
    ],
    height  : 350,
    width   : 580,
    listeners : {
      render: function(me) {
        var str = me.getStore();
        str.load();
      }
    }
  }]
});  
