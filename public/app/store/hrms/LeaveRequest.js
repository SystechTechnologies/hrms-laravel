Ext.define('SysTech.store.hrms.LeaveRequest', {
  extend  : 'Ext.data.Store',
  storeId : 'leaveRequestStore',
  fields  : ['id', 'user_id', 'user_name', 
    'entitlement_name', 'no_of_days', //keep the format like 'sick leave (2 days)'
    'from_date', 'to_date', 'status'
  ],
  proxy   : {
    type  : 'ajax',
    url   : 'leave/show_leave_history',
    sortParam : undefined,
    reader: {
      type  : 'json',
      root  : 'data'
    }//,
    /*
    extraParams : {
      sessionId : ''
    }
    */
  },
  groupField  : 'user_name'
  //autoLoad  : false
});
Ext.create('SysTech.store.hrms.LeaveRequest');