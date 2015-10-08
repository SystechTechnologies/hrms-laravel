Ext.define('SysTech.view.hrms.LeaveApprovalGrid', {
  extend  : 'Ext.grid.Panel',
  alias   : 'widget.leaveapprovalgrid',
  width   : 700,
  border  : false,
  requires:[
    'SysTech.store.hrms.LeaveRequest',
    'SysTech.view.common.Component'
  ],
  layout  : 'fit',
  viewConfig : {
    emptyText : '<span style="color:red;padding:10px;font-weight:bold;">No leave request submitted by your sub-ordinates.</span>'
  },
  store   : Ext.StoreMgr.lookup('leaveRequestStore'),
  columns : [
    { text  : 'User Name', dataIndex: 'user_name'},
    { text  : 'Entitlements', dataIndex: 'entitlement_name', width: 140},
    { text  : 'Number of Days', dataIndex: 'no_of_days'},
    { text  : 'From Date/To Date', xtype: 'templatecolumn', tpl: '{from_date} / {to_date}', width: 140},
    { text  : 'Status', dataIndex: 'status', width: 100 , xtype: 'componentcolumn', 
      renderer: function(status) { 
        return { 
          store: ['Request', 'Approved', 'Reject', 'Cancel'], 
          value: status, 
          xtype: 'combobox',
          listeners : {
            change: function(me, n, o) {
              me.setValue(n);
            }
          }
        }; 
      }
    },
    { text: 'Action', xtype : 'componentcolumn', width : 120,
      renderer: function(value, meta, record, rIdx, cIdx) {
        return { 
          text  : 'Approve Now', 
          xtype : 'button', 
          iconCls : 'tick',
          handler: function(btn) { 
            //var status = record.get('status');
            //var val = btn.up('grid').down('componentcolumn').down('combo').getValue();
            var idx = btn.up('grid').getSelectionModel().getSelection()[0].index;
            var cbx = btn.up('grid').down('componentcolumn').query('combo')[idx];
            var val = cbx.getValue();
            /*
            if(val != 'Approved') {
              Ext.Msg.alert('Alert', 'Enrollment is in ' + val +' status. Please change to Approve');
              return false;
            }*/
          //  if(val == 'Approved') {
              Ext.Ajax.request({
                url : 'leave/approve_leave_request',
                method  : 'POST',
                params  : {
                  id : record.get('id'),
                  status : val
                },
                success: function(response) {
                //  btn.setText('Approved');
                //  btn.setDisabled(true);
                  var resp = Ext.JSON.decode(response.responseText);
                  Ext.Msg.show({
                    title : 'Confirmation',
                    msg   : resp.data.msg,
                    width : 400,
                    buttons: Ext.Msg.OK,
                    fn    : Ext.emptyFn,
                    icon  : Ext.MessageBox.INFO
                  });
                },
                failure: function(response) {
                  Ext.Msg.alert('Failure', 'Failed to take action on selected Leave.');
                }
              });
           // }
          }
        }; 
      }
    }
  ],
   features : [{
    ftype   : 'groupingsummary',
    groupHeaderTpl: 'Employee: {name}',
  }],
  listeners : {
    
  },
  /*
  dockedItems: [{
    xtype : 'pagingtoolbar',
    store : Ext.getStore('enrollStore'),
    dock  : 'bottom',
    displayInfo: true
  }],
  */
  listeners : {
    beforerender : function(me) {
      console.log('------ isAdmin : ' + global.getController('BaseController').isAdmin());
    },
    beforeshow : function(me) {
      //console.log('-------- beforeshow ----------');
    },
    itemdblclick: function(me, record, item, index, e, eOpts ) {
    }
  }
});