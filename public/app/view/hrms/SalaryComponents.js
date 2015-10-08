Ext.define('SysTech.view.hrms.SalaryComponents', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.salarycomponents',
  width     : 600,
  border    : false,
  requires  : [
    'SysTech.store.hrms.SalaryComponent'
  ],
  defaults: {
    anchor: '90%'
  },
  items   : [{
    xtype   : 'form',
    border  : false,
    url     : 'payroll/create_salary_comp',
    defaultType: 'textfield',
    layout  : 'anchor',
    defaults: {
      anchor: '100%',
      msgTarget : 'side',
      labelWidth: 160,
      afterLabelTextTpl : "<span style='color:red;'>*</span>"
    },
    items : [{
      fieldLabel: 'Compoment Name',
      name      : 'name',
      anchor    : '80%',
      allowBlank: false
    },{
      xtype     : 'radiogroup',
      fieldLabel: 'Salary component type ?',
      columns   : 2,
      vertical  : true,
      name      : 'type',
      anchor    : '75%',
      allowBlank: false,
      items     : [
        { boxLabel: 'Earning', name: 'type', inputValue: 'earning'},
        { boxLabel: 'Deduction', name: 'type', inputValue: 'deduction'}
      ]
    },{
      xtype     : 'radiogroup',
      fieldLabel: 'Part of total payable ?',
      columns   : 2,
      vertical  : true,
      name      : 'total_payable',
      allowBlank: false,
      anchor    : '75%',
      items     : [
        { boxLabel: 'Yes', name: 'total_payable', inputValue: 'yes'},
        { boxLabel: 'No', name: 'total_payable', inputValue: 'no'}
      ]
    },{
      fieldLabel: 'Cost to Company ?',
      xtype     : 'radiogroup',
      name      : 'ctc',
      columns   : 2,
      vertical  : true,
      allowBlank: false,
      anchor    : '75%',
      items     : [
        { boxLabel: 'Yes', name: 'ctc', inputValue: 'yes'},
        { boxLabel: 'No', name: 'ctc', inputValue: 'no'}
      ]
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
        text    : 'Create Salary Component',
        iconCls : 'save',
        handler : function() {
          var form = this.up('form').getForm();
          if (form.isValid()) {
            form.submit({
              success: function(form, action) {
                Ext.Msg.alert('Success', action.result.data.msg);
                Ext.StoreMgr.lookup('salaryComponentStore').load();
                form.reset();
              }
            });
          }
        }
      }]
    }],
  },{
    xtype   : 'grid',
    title   : 'Salary Components Grid',
    style   : {
      paddingTop  : '10px'
    },
    store   : Ext.StoreMgr.lookup('salaryComponentStore'),
    columns : [
      { text: 'Salary Component', dataIndex: 'name', width : 160 },
      { text: 'Salary Type', dataIndex: 'type', width : 80 },
      { text: 'Part of total payable', dataIndex: 'total_payable', width : 120},
      { text: 'Cost to Company', dataIndex: 'ctc'},
      { text  : 'Action', xtype : 'actioncolumn', width : 80,
        items : [{
          icon    : 'images/cross.png',
          tooltip : 'Delete Component',
          width   : 50,
          handler : function(grid, rowIndex, colIndex) {
            var record = grid.getStore().getAt(rowIndex);
            Ext.Ajax.request({
              url   : 'payroll/delete_salary_comp',
              params: {
                id: record.get('id')
              },
              success: function(response){
                Ext.Msg.show({
                  title : 'Confirmation',
                  msg   : 'Salary component successfully deleted.',
                  width : 300,
                  buttons: Ext.Msg.OK,
                  fn: function() {
                    Ext.StoreMgr.lookup('salaryComponentStore').load();
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
