Ext.define('SysTech.view.hrms.LeaveHistoryGrid', {
  extend  : 'Ext.grid.Panel',
  alias   : 'widget.leavehistorygrid',
  width   : 700,
  border  : false,
  requires:[
    'SysTech.store.hrms.LeaveRequest'
  ],
  layout  : 'fit',
  viewConfig : {
    emptyText : '<span style="color:red;padding:10px;font-weight:bold;">No Leave request found for this Year.</span>'
  },
  store   : Ext.StoreMgr.lookup('leaveRequestStore'),
  columns : [
    { text  : 'User Name', dataIndex: 'user_name'},
    { text  : 'Entitlements', dataIndex: 'entitlement_name', width: 140},
    { text  : 'Number of Days', dataIndex: 'no_of_days'},
    { text  : 'From Date', dataIndex: 'from_date'},
    { text  : 'To Date', dataIndex: 'to_date'},
    { text  : 'Approval Status', dataIndex: 'status'}
  ],
  listeners : {
    itemdblclick: function(me, record, item, index, e, eOpts ) {}
  },
  /*
  dockedItems: [{
    xtype : 'pagingtoolbar',
    store : Ext.getStore('leaveRequestStore'),
    dock  : 'bottom',
    displayInfo: true
  }],*/
  listeners : {
    beforerender : function(me) {},
    beforeshow : function(me) {}
  }
});