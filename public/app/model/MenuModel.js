Ext.define('SysTech.model.MenuModel', {
  extend: 'Ext.data.Model',
  fields: ['src', 'caption']
});

var menuStore = Ext.create('Ext.data.Store', {
  model: 'MenuModel',
  storeId: 'menuStore',
  data: [{ src:'images/server_software.png', caption:'Drawing & Charts' },
        { src:'images/icon_module16.png', caption:'Advanced Data' },
        { src:'images/viewmag.png', caption:'Overhauled Theme' },
        { src:'images/server_software.png', caption:'Performance Tuned' }
  ]
});




