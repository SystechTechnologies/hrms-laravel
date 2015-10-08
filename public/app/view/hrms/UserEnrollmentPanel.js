Ext.define('SysTech.view.hrms.UserEnrollmentPanel', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.userenrollmentpanel',
  //width     : 700,
  border    : false,
  requires  : [
    'SysTech.view.hrms.Session',
    'SysTech.view.hrms.EnrollGrid'
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
    xtype : 'grid',
    width : 840,
    height: 300,
    store : Ext.getStore('enrollStore'),
    viewConfig : {
      emptyText : '<span style="color:red;padding:10px;font-weight:bold;">You corrently don\'t have any active training enrollment.</span>'
    },
    columns: [
      { text  : 'Course Name', dataIndex: 'course_name'},
      { text  : 'Session Name',  dataIndex: 'sassion_name' , width: 120},
      { text  : 'Schedule Date/Due Date', xtype: 'templatecolumn', tpl: '{schedule_date} / {due_date}', width: 140},
      { text  : 'Delivery Method', dataIndex: 'delivery_method'},
      { text  : 'User Name', dataIndex: 'user_name'/*, renderer: function(name, meta, record) {
        meta.tdCls = 'user'; 
        return name; 
        }*/
      },
      { text  : 'Status', dataIndex: 'status', width: 100 },
      { text  : 'Capacity', dataIndex: 'capacity', width: 60}
    ]
  }],
  listeners : {
    beforerender : function(me) {
      var isAdmin = global.getController('BaseController').isAdmin();
      console.log('------ isAdmin : ' + isAdmin);
      console.log('-------- beforerender ----------');
      var grid = me.down('grid');
      var store = grid.getStore();
      store.load();
      //var url = store.getProxy().url;
    },
    beforeshow : function(me) {
      //console.log('-------- beforeshow ----------');
    }
  }
});
