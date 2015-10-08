Ext.define('SysTech.view.hrms.Entitlement', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.entitlement',
  border    : false,
  requires  : [
   // 'SysTech.view.hrms.RolesGrid', 
   // 'SysTech.store.hrms.Role' 
  ],
  items   : [{
    xtype   : 'form',
    border  : false,
    url     : 'leave/create_entitlement',
    fieldDefaults : {
      msgTarget   : 'side',
      allowBlank  : false,
      labelWidth  : 140
    },
    defaultType : 'textfield',
    defaults  : {
      anchor  : '50%',
      afterLabelTextTpl : "<span style='color:red;'>*</span>"
    },
    items   : [{
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
      fieldLabel  : 'Entitlement Name',
      name        : 'name',
      xtype       : 'textfield',
      anchor      : '40%'
    },{
      fieldLabel  : 'Number of Days',
      name        : 'no_of_days',
      xtype       : 'numberfield',
      anchor      : '20%'
    },{
      fieldLabel  : 'Calender Year',
      name        : 'calender',
      anchor      : '30%'
    }],
    dockedItems: [{
      xtype   : 'toolbar',
      padding : '2 0 2 0',
      dock    : 'bottom',
      ui      : 'footer',
      items   : [{
        text    : 'Reset',
        iconCls : 'reset',
        handler : function() {
          this.up('form').getForm().reset();
        }
      },{
        text    : 'Create Entitlements',
        iconCls : 'save',
        handler : function() {
          var form = this.up('form').getForm();
          if (form.isValid()) {
            form.submit({
              success: function(form, action) {
                var entitlement = Ext.ComponentQuery.query("entitlement")[0];
                var grid = entitlement.down('grid');
                var res = action.result.success === 'success' ? 'Success' : 'Fail';
                if (res == 'success') {form.reset();}
                Ext.Msg.alert(res , action.result.data.msg);
                grid.getStore().load();
              },
              failure: function(form, action) {
                Ext.Msg.alert('Failed', 'Failed to create Entitlement');
              }
            });
          }
        }
      }]
    }]
  },{
    xtype : 'grid',
    style : {
      paddingTop: '10px'
    },
    columns: [
      { text  : 'Entitlement',  dataIndex: 'name', flex: 1 },
      { text  : 'Number of Days', dataIndex: 'no_of_days', flex: 1 },
      { text  : 'Calender Year', dataIndex: 'calender' },
      { text  : 'Action', xtype : 'actioncolumn',
        width : 80,
        items : [{
          icon    : 'images/cross.png',
          tooltip : 'Delete Entitlement',
          width   : 50,
          text    : 'Delete',
          handler : function(grid, rowIndex, colIndex) {
            var row = grid.getStore().getAt(rowIndex);
            var data = row.getData();
            Ext.Msg.show({
              title : 'Confirmation',
              msg   : 'Are you sure you want to delete this Entitlement ?',
              width : 400,
              buttons: Ext.Msg.OKCANCEL,
              fn    : function(btn) {
                if(btn == 'ok') {
                  Ext.Ajax.request({
                    url   : 'leave/delete_leave_entitlement',
                    method: 'POST',
                    params  : {
                      id : data['id']
                    },
                    success: function(response) {
                      Ext.Msg.show({
                        title : 'Confirmation',
                        msg   : 'Entitlement successfully deleted.',
                        width : 340,
                        buttons: Ext.Msg.OK,
                        fn: function(btn) {
                          var entitlement = Ext.ComponentQuery.query("entitlement")[0];
                          var grid = entitlement.down('grid');
                          grid.getStore().load();
                        },
                        icon  : Ext.MessageBox.INFO
                      });
                    },
                    failure: function(response) {
                      Ext.Msg.alert('Failure', 'Failed to delete Entitlement.');
                    }
                  });
                }//if
              },
              icon  : Ext.MessageBox.INFO
            });
          }
        }]
      }
    ],
    store : {
      fields  : ['id', 'name', 'no_of_days', 'calender'],
      proxy   : {
        type  : 'ajax',
        url   : 'leave/load_leave_entitlement',
          reader: {
            type: 'json',
            root: 'data'
          }
      },
      autoLoad: true
    },
    height: 250,
    width : 680
  }]
});  
