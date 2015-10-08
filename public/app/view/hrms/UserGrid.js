Ext.define('SysTech.view.hrms.UserGrid', {
  extend  : 'Ext.grid.Panel',
//  title   : 'User Search Result',
  alias   : 'widget.usergrid',
 // width   : 680,
  requires:[
    'SysTech.store.hrms.User',
    'SysTech.view.hrms.UserPayroll'
  ],
//  padding : 10,
  style : {
    paddingTop: '10px'
  },
  store   : Ext.getStore('userStore'),
  columns : [
    { text: 'First, Last name',  dataIndex: 'name', xtype: 'templatecolumn', tpl: '{first_name}, {last_name}'},
    { text: 'Email (Phone)', dataIndex: 'email', xtype: 'templatecolumn', tpl: '{email} ({phone})', width: 150},
    { text: 'Username', dataIndex: 'user_name' },
    { text: 'Gender', dataIndex: 'gender', width: 60 },
    { text: 'Activation', dataIndex: 'activation', width: 60 },
    { text: 'Manager', dataIndex: 'manager' },
    { text  : 'Action',
      xtype : 'actioncolumn',
      width : 60,
      items : [{
        icon    : 'images/cross.png',
        tooltip : 'Delete User Details',
        width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
      },{
        icon    : 'images/information.png',
        tooltip : 'View User Information',
        width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
      }]
    },
    { xtype : 'componentcolumn', width : 110, text : 'Payroll Details',
      renderer: function(value, meta, record, rIdx, cIdx) {
        return {
          text  : 'Payroll Details', 
          xtype : 'button', 
          iconCls : 'edit_user',
          handler: function(btn) {
            var data = record.getData();
            var userId = data.id;
            var userName = data.first_name + ' ' + data.last_name;
            Ext.Ajax.request({
              url     : 'payroll/load_user_payroll',
              method  : 'POST',
              params  : {
                user_id    : userId,
              },
              success: function(response, opt) {
                var resp = Ext.JSON.decode(response.responseText);
                var window = Ext.create('SysTech.view.hrms.UserPayroll');
                window.setTitle('Edit ' +userName+ '\'s payroll settings');
                var frm = window.down('form').getForm();
                if(resp.success === 'success') {
                  Ext.Msg.show({
                    title : 'Confirmation',
                    msg   : 'User\'s payroll details are already set. Do you want to edit payroll details ?',
                    width : 400,
                    buttons: Ext.Msg.YESNO,
                    fn    : function(btn) {
                      if(btn == 'yes') {
                        var values = resp.data;
                        frm.setValues(values);
                        window.show();
                      }
                      if(btn == 'no'){
                        window.destroy(); 
                      }
                    },
                    icon  : Ext.MessageBox.INFO
                  });
                }
                else {
                  frm.setValues({user_id : userId});
                  window.show();
                }
              },
              failure: function(response) {
                Ext.Msg.alert('Failure', 'Failed to update users payroll details.');
              }
            });
          }
        };
      }
    }
  ],
  dockedItems: [{
    xtype: 'pagingtoolbar',
    store: Ext.StoreMgr.lookup('userStore'),
    dock: 'bottom',
    displayInfo: true
  }]
});