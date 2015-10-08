Ext.define('SysTech.store.hrms.User', {
  extend  : 'Ext.data.Store',
  storeId : 'userStore',
  fields  : ['first_name', 'last_name', 'email', 'user_name', 'phone', 'gender', 'activation', 'manager'],
  proxy   : {
    type  : 'ajax',
    url   : 'users/load',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});
//create this explicitly, will help in later access.
Ext.create('SysTech.store.hrms.User');