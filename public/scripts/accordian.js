Ext.onReady(function () {
  
  Ext.define('org.techzoo.TechZooPanel', {
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.tzpanel',
    listeners: {
      afterrender: function(me, eOpts){
        me.header.el.on('mouseover', function() {
          Ext.defer(function(){
            if (me.collapsed) {me.expand();}
          }, 1000);
        });
      }
    }
  }); 
  
  Ext.create('Ext.panel.Panel', {
    width: 300,
    defaults: {
        bodyStyle: 'padding:5px'
    },
    layout: {
      type: 'accordion',
      titleCollapse: false,
      animate: true,
      activeOnTop: true
    },
    items: [{
      xtype : 'tzpanel',
      height: 180,
      icon  : 'images/icon_module16.png',
      title : '<span class="accHeading">User Management</span>',
      html  : '<img src="images/teamspace.png" style="float:left;margin-right:10px;" /><span class="arial">User Management is an authentication feature that provides administrators with the ability to identify and control the state of users logged into the network.</span>'
    },{
      xtype : 'tzpanel',
      title : '<span class="accHeading">Software Project Management</span>',
      icon  : 'images/server_software.png',
      html  : '<img src="images/software.png" style="float:left;margin-right:10px;" /><span class="arial">Software Project Management is the art and science of planning and leading software projects.It is a sub-discipline of project management in which software projects are planned, implemented, monitored and controlled.</span>'
    },{
      xtype : 'tzpanel',
      title : '<span class="accHeading">Search Projects</span>',
      icon  : 'images/viewmag.png',
      items : [{
        xtype     : 'textfield',
        fieldLabel: '<span class="arial">Project Name</span>'
      },{
        xtype     : 'textfield',
        fieldLabel: '<span class="arial">Manager Name</span>'
      },{
        xtype : 'button',
        text  : 'Login Now'
      }]
    }],
    renderTo: 'output'
  });
});