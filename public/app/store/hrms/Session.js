Ext.define('SysTech.store.hrms.Session', {
  extend  : 'Ext.data.Store',
  storeId : 'sessionStore',
  fields  : ['sassion_name', 'course.course_name', 'schedule_date', 'due_date', 'capacity', 'user_id', 'location', 'status', 'delivery_method'],
  //create session model first, then only we can use it in form as object.
  proxy : {
    type  : 'ajax',
    url   : 'training/load_sessions',
    reader: {
      type  : 'json',
      root  : 'data'
    }
  }//,
  //autoLoad  : false
});

//create this explicitly, will help in later access.
Ext.create('SysTech.store.hrms.Session');