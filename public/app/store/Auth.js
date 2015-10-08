Ext.define('SysTech.store.Auth', {
  extend  : 'Ext.data.Store',
  storeId : 'authStore',
  model   : 'SysTech.model.AuthUser',
  fields  : ['id', 'first_name', 'last_name', 'email', 'user_name', 'phone', 'gender', 'activation', 'manager', 'roles'],
  proxy   : {
    type  : 'memory'
  }
});
//create this explicitly, will help in later access.
