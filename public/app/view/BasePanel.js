Ext.define('SysTech.view.BasePanel', {
  extend  : 'Ext.panel.Panel',
  alias   : 'widget.basepanel',
  listeners: {
    afterrender: function(me, eOpts){
      me.header.el.on('click', function() {
        if (me.collapsed) {me.expand();}
        else {me.collapse();}
      });
    }
  }
});