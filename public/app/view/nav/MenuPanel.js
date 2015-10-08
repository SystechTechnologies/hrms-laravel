Ext.define('SysTech.view.nav.MenuPanel', {
  extend  : 'SysTech.view.BasePanel',
  alias   : 'widget.navmenupanel',
  animCollapse: true,
  layout  : 'fit',
  border  : false,
  initComponent: function(){
  //  console.info('initComponent...');
    Ext.define('Image', {
      extend: 'Ext.data.Model',
      fields: [
        { name:'src', type:'string' },
        { name:'caption', type:'string'},
      //  { name:'module', type:'string'},
        { name:'panelName', type:'string'}
      ]
    });
    
    Ext.create('Ext.data.Store', {
      id    : 'imagesStore',
      model : 'Image',
      data  : [
          { src:'images/icon_users.png', caption:'Manage Employees',  panelName : 'manage_employee_tab'},
          { src:'images/hrms/leaves.png', caption:'Leave Management',  panelName : 'leave_management_tab'},
          { src:'images/money_dollar.png', caption:'Payroll Details',       panelName : 'payrol_details_tab'},
          { src:'images/book_open.png', caption:'Training Services', panelName : 'training_services_tab'}
      ]
    });
        
    Ext.apply(this, {
      items: this.createView(),
    //  dockedItems: this.createToolbar()
    });
    this.callParent(arguments);
  },
  constructor: function(config){ 
        config = config || {}; 
        this.callParent(arguments);
    //    console.info('constructor...');
  },   
  createActions: function(){
    this.addAction = Ext.create('Ext.Action', {
      scope: this,
      handler: this.onAddFeedClick,
      text: 'Add',
      iconCls: 'nav-add'
    });
    this.settings = Ext.create('Ext.Action', {
      scope: this,
      handler: this.onAddFeedClick,
      text: 'Settings',
      iconCls: 'nav-settings'
    });
    this.removeAction = Ext.create('Ext.Action', {
      itemId: 'remove',
      scope: this,
      handler: this.onRemoveFeedClick,
      text: 'Remove',
      iconCls: 'nav-remove'
      });
  },
  createToolbar: function(){
      this.createActions();
      this.toolbar = Ext.create('widget.toolbar', {
        items: [this.addAction, this.settings, this.removeAction]
      });
      return this.toolbar;
  },
  createView: function(){
    this.view = Ext.create('widget.dataview', {
      store: Ext.data.StoreManager.lookup('imagesStore'),
      listeners: {
        select: function(me, record){
            //console.log('selection changes...' + record.getData().panelName );
        }
      },
      trackOver: true,
      cls : 'nav-list',
      itemSelector: '.nav-list-item',
      overItemCls: 'nav-list-item-hover',
      tpl : '<tpl for="."><div class="nav-list-item"><img src="{src}" />{caption}</div></tpl>'
    });
    return this.view;
  }
});
