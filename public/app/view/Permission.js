Ext.define('SysTech.view.Permission', {
  extend  : 'Ext.Component',
  id      : 'per',
  alias   : 'widget.permission',
  initComponent : function() {
    this.callParent(arguments);
    this.addEvents(
      'hasPermission' //add more events later
    );
  }//,
  //Let’s say you have following functions
  //There you start fireEvent
  /*onWar : function() {
    console.log('onWar.....');
    me.fireEvent('fireInTheHole', this);
  }*/
})
Ext.create('SysTech.view.Permission');