Ext.define('SysTech.view.BaseTabPanel', {
  extend  : 'Ext.panel.Panel',
  alias   : 'widget.base_tab',
  closable: true,
  border  : false,
  initComponent  : function() {
    this.addListener({
      beforeclose :{
        fn    : this.onClose,
        scope : this
      }
    });
    this.callParent(arguments);
  },
  
  onClose: function(me) {
    //console.log('closing ' + me.title + '...');
    var bar       = me.up('tabpanel').getTabBar(),
      tabsCount   = bar.items.length;
      
    console.log('tabs count : ' + tabsCount);
    if(tabsCount > 1) {
      Ext.Msg.show({
        title   : 'Confirm',
        msg     : 'Are you sure you want to close \'' + me.title +'\' panel ?<br/><br/>' +
          '<small><span style="color:blue;">(Please make sure to save your data before you close.)</span></small>', 
        width   : 400,
        icon    : Ext.MessageBox.INFO,
        buttons : Ext.MessageBox.OKCANCEL,
        fn      : function(btn){
          switch(btn){
            case 'ok':
              this.ownerCt.remove(me);   // manually removes tab from tab panel
              break;
            case 'yes':
          //    this.saveToFile();
              this.ownerCt.remove(me);
              break;
            case 'cancel':
              // leave blank if no action required on cancel
              break;
          }
        },
        scope: this
      });
    }
    else {
      Ext.Msg.show({
        title   : 'Error !',
        msg     : 'You can\'t delete \'' + me.title +'\' panel.<br/><br/>Application require atleast one panel to be rendered.', 
        width   : 400,
        icon    : Ext.MessageBox.ERROR,
        buttons : Ext.Msg.OK
      });
    }
    return false;// returning false to beforeclose cancels the close event
  }/*,
  
  listeners : {
    beforeclose: function(me) {
      console.log('closing ' + me.title + '...');
      var bar       = me.up('tabpanel').getTabBar(),
        tabsCount   = bar.items.length,
      checkClosable = false;
      
      console.log('tabs count : ' + tabsCount);
      var checkReturn = true;
     // Ext.Msg.alert('Are you sure ?'); 
      //if(tabsCount > 1) {
        Ext.Msg.show({
          title   : 'Confirm',
          msg     : 'Are you sure you want to close \'' + me.title +'\' panel ?', 
          width   : 400,
          icon    : Ext.MessageBox.INFO,
          fn      : function(btn) {
            if(btn == 'ok') {checkClosable = true;}
            else {checkClosable = false;}
          },
          buttons : Ext.Msg.OKCANCEL
        });
      //}
     // return checkClosable;
    }//close
  }*/
});