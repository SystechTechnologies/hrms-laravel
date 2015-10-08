Ext.define('SysTech.store.hrms.Course', {
  extend  : 'Ext.data.Store',
  storeId : 'courseStore',
  fields  : ['id', 'course_name', 'status', 'duration', 'attachment', 'description'],
  proxy : {
    type  : 'ajax',
    url   : 'training/load_courses',
    reader: {
      type  : 'json',
      root  : 'data'
    }
  }//,
  //autoLoad  : false
});
//create this explicitly, will help in later access.
Ext.create('SysTech.store.hrms.Course');