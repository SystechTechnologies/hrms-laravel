Ext.define('SysTech.view.Viewport', {
    renderTo: Ext.getBody(),
    extend: 'Ext.container.Viewport',
    id  : 'MainViewport',
    requires:[
      'Ext.tab.Panel',
      'Ext.layout.container.Border',
      'SysTech.view.nav.NavMenu',
      
      'SysTech.view.hrms.UserForm',
        
      'SysTech.view.hrms.tabs.LeaveManagementTab',
      'SysTech.view.hrms.tabs.ManageEmployeeTab',
      'SysTech.view.hrms.tabs.PayrolDetailsTab',
      'SysTech.view.hrms.tabs.TrainingServicesTab',
        
      'SysTech.view.hrms.UserSearch',
      'SysTech.view.hrms.UserGrid'
    ],

    layout: {
      type: 'border'
    },
    items: [/*{
      region  : 'north',
      margins : '5 5 0 5',
      height  : 100,
      html    : '<img src="images/taas_header.jpg" />'
    },*/{
      xtype   : 'navmenu',
      margins : '5 0 5 5',
      region  : 'west',
      width   : 250
    },{
      itemId  : 'tabs',
      xtype   : 'tabpanel',
      plain   : true,
	/* 
	 header	: 'some header',
	  tools		:[{
    	type:'refresh',
    	tooltip: 'Refresh form Data',
    	// hidden:true,
    	handler: function(event, toolEl, panel){
        // refresh logic
    	}
	  },
	  {
    	type:'help',
    	tooltip: 'Get Help',
    	handler: function(event, toolEl, panel){
        // show help here
    	}
		}],
	  tbar: [
  { xtype: 'button', text: 'Button 1' }
],*/
    //  id      : 'mainTabPanel',
      region  : 'center',
      margins : '5 5 5 5',
      items   : [{
        xtype : 'manage_employee_tab',
        id    : 'manage_employee_tab'
      }]
  }]
});