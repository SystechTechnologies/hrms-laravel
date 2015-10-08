Ext.define('SysTech.view.hrms.CourseGrid', {
  extend  : 'Ext.grid.Panel',
//  title   : 'Course details List',
  alias   : 'widget.coursegrid',
  width   : 600,
  requires:[
    'SysTech.store.hrms.Course'
  ],
//  padding : 10,
  style   : {
    paddingTop: '10px'
  },
  store   : Ext.StoreMgr.lookup('courseStore'),
  columns : [
    { text  : 'Course Name',  dataIndex: 'course_name' , width: 140},
    { text  : 'Sessions', dataIndex: 'course_name'},
    { text  : 'Status',  dataIndex: 'status', width: 80},
    { text  : 'Duration', dataIndex: 'duration'},
    { text  : 'Attachments', dataIndex: 'attachment', width: 100},
    { text  : 'Description', dataIndex: 'description'/*, 
      renderer : function(val, meta, rec, rowIndex, colIndex, store) {
        meta.tdAttr = 'data-qtip="Icon Tip"';
        return val;
      }*/
    },
    { text  : 'Action',
      xtype : 'actioncolumn',
      width : 80,
      items : [{
        icon    : 'images/cross.png',
        tooltip : 'Delete Course',
        width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
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
      console.log(record.getData());
      me.up('form').setValues(record.getData());
    }
  },
  dockedItems: [{
    xtype : 'pagingtoolbar',
    store : Ext.StoreMgr.lookup('courseStore'),
    dock  : 'bottom',
    displayInfo: true
  }]
});