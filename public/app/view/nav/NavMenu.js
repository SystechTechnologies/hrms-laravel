Ext.define('SysTech.view.nav.NavMenu', {
    extend  : 'Ext.form.Panel',
    alias   : 'widget.navmenu',
  //  name    : 'mynavmenu',
    //collapsible: true,
   // width: 250,
    layout: 'fit',
    requires : [ 'SysTech.view.nav.MenuPanel', 'SysTech.view.BasePanel'],
    defaults: {
        bodyStyle: 'padding:5px',
        borderWidth: '0px'
    },
   // width: 250,
   // height: 40,
    layout: {
      type: 'accordion',
      titleCollapse: false,
      animate: true,
      activeOnTop: true
    },
    items: [{
      xtype : 'navmenupanel',
      width : 240,
      maxHeight: 150,
      icon  : 'images/icon_users.png',
      title : '<span class="accHeading">Human Resource Management</span>'
    },{
      xtype : 'basepanel',
      maxHeight: 200,
      icon  : 'images/money.png',
      title : '<span class="accHeading">Revenue Management</span>',
      html  : '<img src="images/teamspace.png" style="float:left;margin-right:10px;" /><span class="arial">User Management is an authentication feature that provides administrators with the ability to identify and control the state of users logged into the network.</span>'
    },{
      xtype : 'basepanel',
      maxHeight: 200,
      title : '<span class="accHeading">Asset Management</span>',
      icon  : 'images/server_software.png',
      html  : '<img src="images/software.png" style="float:left;margin-right:10px;" /><span class="arial">Software Project Management is the art and science of planning and leading software projects.It is a sub-discipline of project management in which software projects are planned, implemented, monitored and controlled.</span>'
    },{
      xtype : 'basepanel',
      maxHeight: 200,
      title : '<span class="accHeading">Search Projects</span>',
      icon  : 'images/search.png',
      items : [{
        xtype     : 'textfield',
        fieldLabel: '<span class="arial">Project Name</span>'
      },{
        xtype     : 'textfield',
        fieldLabel: '<span class="arial">Manager Name</span>'
      },{
        xtype : 'button',
        text  : 'Search Now'
      }]
    }]
  });