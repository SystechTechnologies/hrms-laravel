Ext.define('SysTech.view.hrms.tabs.PayrolDetailsTab', {
  extend  : 'SysTech.view.BaseTabPanel',
  alias   : 'widget.payrol_details_tab',
  title   : 'Payroll Details',
  itemId  : 'payrol_details_tab',
  requires  : [
    'SysTech.view.hrms.UserEnrollmentPanel',
    'SysTech.view.hrms.UserPayrollDetails'
  ],
  
  tbar    : [
    { xtype: 'button', text: 'Employee', iconCls : 'add-user' }
  ],
  items   : [{
    xtype   : 'container',
    height  : 80,
    width   : 700,
    layout  : 'hbox',
      padding : 10,
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
      tpl   : '<b>User Payroll Details:</b> <br />He is {age} years old and lives in {location}, XTemplates do not HTML encode values by default. However, it\'s easy to pass values through Ext.util.Format.htmlEncode from within a template', 
      data  : { 
        age : 26, 
        location: 'Italy', 
        name  : 'Tousif Khan'
      }
    }]
  },{
    xtype : 'userpayrolldetails'
  }],
  listeners : {
    beforerender : function(me) {
      var baseCtr = global.getController('BaseController');
      var isAdmin = baseCtr.isAdmin();
      var tbar = me.down('toolbar');
    },
    beforeshow : function(me) {
      //  console.log('-------- beforeshow ----------');
    }
  }
});