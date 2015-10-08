Ext.define('SysTech.store.SearchUser', {
  extend  : 'Ext.data.Store',
  storeId : 'SearchUser',
  fields  : ['id', 'name'],
  proxy   : {
    type  : 'ajax',
    url   : 'users/searchUser',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});
//Now create a single SearchUser for multi-purpose use
Ext.create('SysTech.store.SearchUser');
