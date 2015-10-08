Ext.onReady(function () {
  Ext.define('MyView',{
    extend: 'Ext.view.View',
    autoEl: 'ul', 
    width: 300,
   // autoEl: 'ul', 
        trackOver: true,
        cls: 'nav-list',
        itemSelector: '.nav-list-item',
        overItemCls: 'nav-list-item-hover',
   // overItemCls: 'nav-list-item-hover',
    simpleSelect: true, 
    trackOver: true,
    menuData : [],
    constructor: function(config){ 
        config = config || {}; 
       /*
       
       Ext.apply(config, { 
            //stuff 
        });
*/        
        this.store.data = config.menuData;
        this.callParent(arguments);
        console.info('constructor...' + + config.renderTo);
    }, 
    //this.storeData : [],
    // An ExtJS store or store config 
    store: { 
        data: [], 
        fields: ['city', 'img'] 
    }, 
   /* tpl: [ 
        '<tpl for=".">', 
            '<li class="list-row"><img src="images/{img}" />{city}</li>', 
        '</tpl>' 
    ] 
    ,*/
    tpl: '<tpl for="."><div class="nav-list-item"><img src="images/{img}" />{city}</div></tpl>'
  });
  Ext.create('MyView', {renderTo: 'output', 
    menuData: [
      {city: 'Jalgaon', img: 'user_add.png'},
      {city: 'Paris', img: 'bullet_wrench.png'},
      {city: 'Bhusawal',img: 'search.png'}]} );
      
});