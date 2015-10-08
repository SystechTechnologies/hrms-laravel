Ext.define('SysTech.view.hrms.UserPayrollDetails', {
  extend  : 'Ext.grid.Panel',
  alias   : 'widget.userpayrolldetails',
  width   : 620,
  height  : 300,
  requires:[
    'SysTech.store.hrms.Enroll',
    'SysTech.view.common.Component'
  ],
  padding : 10,
  style   : {
//    paddingTop  : '10px'
  },
  viewConfig : {
    emptyText : '<span style="color:red;padding:10px;font-weight:bold;">No enrollment found. Please select currect session.</span>'
  },
  store   : {
    fields  : [
      {name : 'id',   type: 'int'},
      {name : 'name', type: 'string'},
      {name : 'type', type: 'string', 
        convert: function(v,r) { 
          if(v == 'earning') return 'Earning';
          else return 'Deduction';
        }
      },
      {name : 'ctc',  type: 'string',
        convert: function(v,r) { 
          if(v == 'yes') return 'Yes';
          else return 'No';
        }
      },
      {name : 'total_payable',  type: 'string',
        convert: function(v,r) { 
          if(v == 'yes') return 'Yes';
          else return 'No';
        }
      }
    ],
    data    : [
      {id: 1, name: 'Annual Basic Payment', type: 'earning', total_payable: 'yes', ctc: 'yes'},
      {id: 2, name: 'Pension Fund', type: 'deduction', total_payable: 'yes', ctc: 'no'},
      {id: 3, name: 'Cal Allowance', type: 'earning', total_payable: 'no', ctc: 'no'},
      {id: 4, name: 'EPF', type: 'deduction', total_payable: 'no', ctc: 'no'}
    ],
    proxy   : {
     // type  : 'ajax',
      type  : 'memory',
    //  url   : 'payroll/search_course',
      reader: {
        type: 'json'//,
      //  root: 'data'
      }
    }
  },
  columns : [
    { text  : 'Name', dataIndex: 'name', width: 160},
    { text  : 'Type', dataIndex: 'type', width: 80},
    { text  : 'Total Payable', dataIndex: 'total_payable'},
    { text  : 'CTC', dataIndex: 'ctc', width: 60},
    { text  : 'Status', dataIndex: 'status', width: 80, xtype: 'componentcolumn', 
      renderer: function(status) { 
        return { 
          xtype : 'textfield',
          width : 80
        }; 
      }
    },
    { xtype : 'componentcolumn', width : 100,
      renderer: function(value, meta, record, rIdx, cIdx) {
        return { 
          text  : 'Update Now', 
          xtype : 'button', 
        //  iconCls : 'tick',
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
        fieldLabel: 'User Name',
        name      : 'user_id',
        xtype     : 'combobox',
        width     : 300,
        emptyText : 'user name',
        hideTrigger: true,
        minChars  : 2, 
        triggerAction: 'query', 
        typeAhead : true, 
        displayField: 'name',
        valueField: 'id',
        store     : Ext.getStore('SearchUser')
      },
    { xtype: 'button', text: 'View User Payroll', iconCls: 'search',
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
  listeners : {
    beforerender : function(me) {
     // console.log('------ isAdmin : ' + global.getController('BaseController').isAdmin());
      //console.log('-------- beforerender ----------');
    },
    beforeshow : function(me) {}
  }
});