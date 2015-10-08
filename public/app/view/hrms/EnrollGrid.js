Ext.define('SysTech.view.hrms.EnrollGrid', {
  extend  : 'Ext.grid.Panel',
//  title   : 'Enrollment detail Grid',
  alias   : 'widget.enrollgrid',
  width   : 600,
  requires:[
    'SysTech.store.hrms.Enroll',
    'SysTech.view.common.Component'
  ],
//  padding : 10,
  style   : {
    paddingTop  : '10px'
  },
  viewConfig : {
    emptyText : '<span style="color:red;padding:10px;font-weight:bold;">No enrollment found. Please select currect session.</span>'
  },
  store   : Ext.getStore('enrollStore'),
  columns : [
    { text  : 'Course Name', dataIndex: 'course_name'},
  //  { text  : 'Session Name',  dataIndex: 'sassion_name' , width: 120},
    { text  : 'Schedule Date/Due Date', xtype: 'templatecolumn', tpl: '{schedule_date} / {due_date}', width: 140},
    { text  : 'Delivery Method', dataIndex: 'delivery_method'},
    { text  : 'User Name', dataIndex: 'user_name'/*, renderer: function(name, meta, record) {
      meta.tdCls = 'user'; 
      return name; 
      }*/
    },
    { text  : 'Status', dataIndex: 'status', width: 100 , xtype: 'componentcolumn', 
      renderer: function(status) { 
        return { 
          store: ['Request', 'Approved', 'Reject', 'Cancel'], 
          value: status, 
          xtype: 'combobox',
          listeners : {
            change: function(me, n, o) {
              me.setValue(n);
            }
          }
        }; 
      }
    },
    { text  : 'Capacity', dataIndex: 'capacity', width: 60, summaryType: 'count',
      summaryRenderer: function(value, summaryData, dataIndex) {
        return Ext.String.format('Total: <span style="color:greed;">{0}</span>', value); 
      }
    },
    { text  : 'Action',
      xtype : 'actioncolumn',
      width : 60,
      items : [{
        icon    : 'images/cross.png',
        tooltip : 'Delete Session',
      //  width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
      },{
        icon    : 'images/information.png',
        tooltip : 'View Information',
      //  width   : 50,
        handler : function(grid, rowIndex, colIndex) {}
      }]
    },
    { xtype : 'componentcolumn', width : 120,
      renderer: function(value, meta, record, rIdx, cIdx) {
      //  m.tdCls = 'user';
        /*
        if (Ext.isDefined(value)) { 
          setTimeout(function() { 
          // This works because calling set() causes a view refresh 
          record.set('downloading', value + 5); 
          }, 250); 
          return { 
            animate: false, 
            value: value / 100, 
            xtype: 'progressbar' 
          }; 
        }
        */
        return { 
          text  : 'Approve Now', 
          xtype : 'button', 
          iconCls : 'tick',
          handler: function(btn) { 
            //var status = record.get('status');
            //var val = btn.up('grid').down('componentcolumn').down('combo').getValue();
            var idx = btn.up('grid').getSelectionModel().getSelection()[0].index;
            var cbx = btn.up('grid').down('componentcolumn').query('combo')[idx];
            var val = cbx.getValue();
            
            if(val != 'Approved') {
              Ext.Msg.alert('Alert', 'Enrollment is in ' + val +' status. Please change to Approve');
              return false;
            }
            if(val == 'Approved') {
              Ext.Ajax.request({
                url : 'training/approve_enrollment',
                method  : 'POST',
                params  : {
                  id : record.get('id'),
                },
                success: function(response) {
                  btn.setText('Approved');
                  btn.setDisabled(true);
                  var resp = Ext.JSON.decode(response.responseText);
                  Ext.Msg.show({
                    title : 'Confirmation',
                    msg   : resp.data.msg,
                    width : 400,
                    buttons: Ext.Msg.OK,
                    fn    : Ext.emptyFn,
                    icon  : Ext.MessageBox.INFO
                  });
                },
                failure: function(response) {
                  Ext.Msg.alert('Failure', 'Failed to approve User enrollment.');
                }
              });
            }
          }
        }; 
      }
    }
  ],
   features : [{
    ftype   : 'groupingsummary',
    groupHeaderTpl: 'Session: {name}',
  }],
  listeners : {
    itemdblclick: function(me, record, item, index, e, eOpts ) {
    
    }
  },
  tbar  : [
    {
      xtype       : 'combobox',
      fieldLabel  : 'Session Name',
      name        : 'sassion_id',
      emptyText   : 'Session name',
      hideTrigger : true,
      minChars    : 2, 
      width       : 300,
      allowBlank  : false,
      msgTarget   : 'side',
      triggerAction: 'query', 
      typeAhead   : true, 
      displayField: 'sassion_name',
      afterLabelTextTpl : "<span style='color:red;'>*</span>",
      blankText   : 'Session name is required.',
      valueField  : 'id',
      store       : Ext.getStore('SearchSession')    
    },
    { xtype: 'button', text: 'Search Enrollments', iconCls: 'search',
      listeners : {
        click : function(btn) {
          var combo = btn.up('toolbar').down('combobox');
          var value = combo.getValue();
          if(value == null) {
            combo.markInvalid('Please select Session');
            return false;
          }
          //now load session details
          var store = Ext.getStore('enrollStore');
          store.getProxy().extraParams = {sessionId : value};
          btn.up('grid').getStore().load();
        }
      }
    }
  ],
  dockedItems: [{
    xtype : 'pagingtoolbar',
    store : Ext.getStore('enrollStore'),
    dock  : 'bottom',
    displayInfo: true
  }],
  listeners : {
    beforerender : function(me) {
      console.log('------ isAdmin : ' + global.getController('BaseController').isAdmin());
      //console.log('-------- beforerender ----------');
    },
    beforeshow : function(me) {
      //console.log('-------- beforeshow ----------');
    }
  }
});