Ext.define('SysTech.store.SearchSession', {
  extend  : 'Ext.data.Store',
  storeId : 'SearchSession',
  fields  : ['id', 'sassion_name'],
  proxy   : {
    type  : 'ajax',
    url   : 'training/search_session',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});
//Now create a single SearchUser for multi-purpose use
Ext.create('SysTech.store.SearchSession');
