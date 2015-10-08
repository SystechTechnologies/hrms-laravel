Ext.define('SysTech.view.hrms.tabs.LeaveManagementTab', {
  extend  : 'SysTech.view.BaseTabPanel',
  alias   : 'widget.leave_management_tab',
  title   : 'Manage Leaves',
  itemId  : 'leave_management_tab',
  closable: true,
  requires:[
    'SysTech.view.hrms.LeaveEntitlement',
    'SysTech.view.hrms.LeaveCalender',
    'SysTech.view.hrms.LeaveHistoryGrid'
  ],
  config  : {
    menu  : '', //current selected menu
    tab   : '' // current selected button
  },
  tbar    : [{ 
    xtype : 'splitbutton',
    text  : 'Leave Entitlement',
    iconCls : 'hr-leaves',
    action: 'leave_entitlement',
    menu  : new Ext.menu.Menu({
      width : 180,
      items : [
        {text: 'Create Leave Calender', iconCls: 'hr-add-user', action: 'leave_cal' },
        {text: 'Leave Entitlement Types', iconCls: 'hr-create-role', action : 'leave_type'}
      ]
    })
  },{ 
    xtype : 'button',
    text  : 'View Leaves Calender',
    iconCls : 'add-user'
  }/*,{ 
    xtype : 'button',
    text  : 'Apply Leaves',
  //  hidden  : true,
    action  : 'apply_leave',
    iconCls : 'add-user'
  },{ 
    xtype : 'button',
    text  : 'My Leaves History',
  //  hidden  : true,
    action  : 'show_history',
    iconCls : 'summary'
  }*/],
  items : [],
  listeners : {
    beforerender : function(me) {
      var baseCtr = global.getController('BaseController');
      var isAdmin = baseCtr.isAdmin();
      var tbar = me.down('toolbar');
      me.add({xtype : 'leaveentitlement'});
      if(!isAdmin)
      {
        tbar.down("menuitem[action='leave_cal']").hide();
        tbar.down("menuitem[action='leave_type']").hide(); 
      }
      /*
      if(baseCtr.hasPermession(['Manager']))
      {
        me.add({xtype : 'leaveentitlement'});
      }
      if(baseCtr.isEmployee())
      {
        sptmenu.hide();
        tbar.down("button[action='show_history']").show();
        tbar.down("button[action='apply_leave']").show();
        me.add({xtype : 'leavehistorygrid'});
      }
      */
    },
    beforeshow : function(me) {
      //  console.log('-------- beforeshow ----------');
    }
  }
});