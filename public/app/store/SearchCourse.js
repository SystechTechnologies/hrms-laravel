Ext.define('SysTech.store.SearchCourse', {
  extend  : 'Ext.data.Store',
  storeId : 'SearchCourse',
  fields  : ['id', 'course_name'],
  proxy   : {
    type  : 'ajax',
    url   : 'training/search_course',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});
//Now create a single SearchUser for multi-purpose use
Ext.create('SysTech.store.SearchCourse');
