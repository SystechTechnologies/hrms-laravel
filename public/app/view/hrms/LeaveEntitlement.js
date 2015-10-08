Ext.define('SysTech.view.hrms.LeaveEntitlement', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.leaveentitlement',
  //width     : 700,
  border    : false,
  requires  : [
    'SysTech.view.hrms.ApplyLeave',
    'SysTech.view.hrms.LeaveHistoryGrid',
    'SysTech.view.hrms.LeaveApprovalGrid'
  ],
  items: [{
    xtype   : 'container',
    height  : 80,
    width   : 700,
    layout  : 'hbox',
    items   : [{
      xtype : 'component',
      autoEl  : {
        tag : 'img',
        src : 'images/teamspace.png'
      }
    },{
      xtype : 'component',
      width : 600,
      style : {paddingLeft: '10px', wordWrap: 'normal', lineHeight: '20px'},
      tpl   : 'Dear, <b>{name}</b> <br />He is {age} years old and lives in {location}, XTemplates do not HTML encode values by default. However, it\'s easy to pass values through Ext.util.Format.htmlEncode from within a template', 
      data  : { 
        age : 26, 
        location: 'Italy', 
        name  : 'Tousif Khan'
      }
    }]
  },{
    xtype : 'panel',
    width : 700,
    height: 450,
    plain : true,
    tbar  : [
      { xtype: 'button', text: 'Apply Leaves ', iconCls : 'history',
        handler: function(btn) {
          var panel = btn.up('panel');
          panel.removeAll();
          var applyleave = Ext.widget('applyleave');
          panel.add(applyleave);
        }
      },
      { xtype: 'button', text: 'My Leave History', iconCls: 'summary', 
        handler: function(btn) {
          var panel = btn.up('panel');
          panel.removeAll();
          var leaveHistory = Ext.create('SysTech.view.hrms.LeaveHistoryGrid');
          var store = leaveHistory.getStore();
          var proxy = store.getProxy();
          proxy.url = 'leave/show_leave_history';
          leaveHistory.getStore().load();
          panel.add(leaveHistory);
        }
      },
      { xtype: 'button', text: 'Approve Leaves', iconCls: 'tick',
        handler: function(btn) {
          var panel = btn.up('panel');
          panel.removeAll();
          var approval = Ext.create('SysTech.view.hrms.LeaveApprovalGrid');
          var store = approval.getStore();
          var proxy = store.getProxy();
          proxy.url = 'leave/show_approve_request';
          approval.getStore().load();
          panel.add(approval);
        }
      }
    ],
    items   : [{
      xtype : 'applyleave'
    }]
  }],
  listeners : {
    beforerender : function(me) {
    }
  }
});
