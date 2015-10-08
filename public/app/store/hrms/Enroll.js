Ext.define('SysTech.store.hrms.Enroll', {
  extend  : 'Ext.data.Store',
  storeId : 'enrollStore',
  fields  : ['id', 'sassion_name', 'due_date', 'schedule_date',  'delivery_method', 'capacity',
    'course_name', 'user_name', 'status', 'commnets', 'user_id', 'sassion_id', 'course_id'],
  proxy   : {
    type  : 'ajax',
    url   : 'training/load_enrollments',
    reader: {
      type  : 'json',
      root  : 'data'
    },
    extraParams : {
      sessionId : ''
    }
  },
  groupField  : 'sassion_name'
  //autoLoad  : false
});
//create this explicitly, will help in later access.
Ext.create('SysTech.store.hrms.Enroll');