Ext.onReady(function () {

  Ext.define('MenuPanel', {
    extend: 'Ext.panel.Panel',
    animCollapse: true,
    layout: 'fit',
    title: 'Feeds',
    width: 300,
    height: 300,
    imgData : [],
    initComponent: function(){
      
    console.info('initComponent...');
     Ext.define('Image', {
      extend: 'Ext.data.Model',
      fields: [
          { name:'src', type:'string' },
          { name:'caption', type:'string' }
      ]
    });
    /*
    Ext.create('Ext.data.Store', {
      id:'imagesStore',
      model: 'Image',
      data: [
          { src:'images/server_software.png', caption:'Drawing & Charts' },
          { src:'images/icon_users.png', caption:'Advanced Data' },
          { src:'images/revert.png', caption:'Overhauled Theme' },
          { src:'images/server_software.png', caption:'Performance Tuned' }
      ]
    });
  */
        
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        this.callParent(arguments);
    },
    constructor: function(config){ 
        config = config || {};
        this.imgData = config.imgData;
        this.callParent(arguments);
        console.info('constructor...');
    }, 
    createActions: function(){
        this.addAction = Ext.create('Ext.Action', {
            scope: this,
            handler: this.onAddFeedClick,
            text: 'Add feed',
            iconCls: 'feed-add'
        });

        this.removeAction = Ext.create('Ext.Action', {
            itemId: 'remove',
            scope: this,
            handler: this.onRemoveFeedClick,
            text: 'Remove feed',
            iconCls: 'feed-remove'
        });
    },

    createToolbar: function(){
        this.createActions();
        this.toolbar = Ext.create('widget.toolbar', {
            items: [this.addAction, this.removeAction]
        });
        return this.toolbar;
    },
    createView: function(){
        this.view = Ext.create('widget.dataview', {
           // store: Ext.data.StoreManager.lookup('imagesStore'),
            //store : 'MemoryP
            store: {
              model : 'Image',
              data : this.imgData,
              //field: ['src','caption'],
              proxy: 'memory'
            },
            listeners: {
                select: function(me, record){
                   console.log('selection changes : ' + record.getData().caption);
                }
            },
            trackOver: true,
            cls: 'feed-list',
            itemSelector: '.feed-list-item',
            overItemCls: 'feed-list-item-hover',
            tpl: '<tpl for="."><div class="feed-list-item"><img src="{src}" />{caption}</div></tpl>'
        });
        return this.view;
    }
  });
  Ext.create('MenuPanel', { renderTo: 'output', 
    imgData : [
      { src:'images/server_software.png', caption:'Drawing & Charts-1' },
      { src:'images/icon_users.png', caption:'Advanced Data' },
          { src:'images/revert.png', caption:'Overhauled Theme' },
          { src:'images/server_software.png', caption:'Performance Tuned' }
    ]});
});