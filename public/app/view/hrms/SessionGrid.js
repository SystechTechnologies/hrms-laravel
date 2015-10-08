Ext.define('SysTech.view.hrms.SessionGrid', {
  extend  : 'Ext.grid.Panel',
//  title   : 'View training session details',
  alias   : 'widget.sessiongrid',
  width   : 600,
  requires:[
    'SysTech.store.hrms.Session'
  ],
//  padding : 10,
  style   : {
    paddingTop: '10px'
  },
  store   : Ext.StoreMgr.lookup('sessionStore'),
  columns : [
    { text: 'Session Name',  dataIndex: 'sassion_name' , width: 140},
    { text: 'Course', dataIndex: 'course.course_name'},
    { text: 'Schedule Date/Due Date', xtype: 'templatecolumn', tpl: '{schedule_date} / {due_date}', width: 140},
    { text: 'Location', dataIndex: 'location'},
    /*{ text: 'Due Date', dataIndex: 'due_date'},*/
    { text: 'Capacity', dataIndex: 'capacity', width: 60},
    /*
    { text: 'Delivery Method', dataIndex: 'delivery_method'},
    { text: 'Location', dataIndex: 'location'},
    */
    { text  : 'Delivery Method', dataIndex: 'delivery_method'},
    { text  : 'Status', dataIndex: 'status'},
    { text  : 'Action',
      xtype : 'actioncolumn',
      width : 80,
      items : [{
        icon    : 'images/cross.png',
        tooltip : 'Delete Session',
        width   : 50,
        handler : function(grid, rowIndex, colIndex) {
          //first check the permission
          var per = global.getController('BaseController').hasPermission(['Admin']);
          if(!per) {
            Ext.Msg.show({
              title: 'Error !', 
              msg   : 'You don\'t have permission to delete Sessions',
              width : 300,
              buttons: Ext.Msg.OK,
              icon  : Ext.MessageBox.ERROR
            });
            return false;
          }
        }
      },{
        icon    : 'images/information.png',
        tooltip : 'View Information',
        width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
      }]
    } 
  ],
  listeners : {
    itemdblclick: function(me, record, item, index, e, eOpts ) {
    
    }
  },
  dockedItems: [{
    xtype : 'pagingtoolbar',
    store : Ext.StoreMgr.lookup('sessionStore'),
    dock  : 'bottom',
    displayInfo: true
  }]
  /*
  bbar: Ext.create('Ext.PagingToolbar', {
    store: Ext.StoreMgr.lookup('sessionStore'),
    displayInfo: true,
    displayMsg: '{0} - {1} of {2}',
    emptyMsg: "No topics to display"
  })
  */
});