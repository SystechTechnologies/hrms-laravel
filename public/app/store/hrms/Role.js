Ext.define('SysTech.store.hrms.Role', {
  extend  : 'Ext.data.Store',
  storeId : 'roleStore',
  fields  : ['id', 'name', 'description', 'type'],
  proxy   : {
    type  : 'ajax',
    url   : 'roles',
      reader: {
        type: 'json',
        root: 'data'
      }
  },
  autoLoad: true //make it false later
});
//create store
Ext.create('SysTech.store.hrms.Role');