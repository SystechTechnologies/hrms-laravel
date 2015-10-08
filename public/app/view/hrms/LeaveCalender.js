Ext.define('SysTech.view.hrms.LeaveCalender', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.leavecalender',
  width     : 700,
  border    : false,
 // title     : 'Apply Leaves',
  requires  : [
   // 'SysTech.view.hrms.RolesGrid', 
   // 'SysTech.store.hrms.Role' 
  ],
 // url : 'save-form.php',
  items : [{
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
    xtype   : 'form',
    width   : 500,
    border  : false,
    fieldDefaults : {
      msgTarget   : 'side',
      allowBlank  : false,
      labelWidth  : 140//,
    //  labelAlign  : 'right'
    },
    url : 'leave/create_leave_calender',
    defaultType : 'textfield',
    defaults  : {
      anchor  : '70%',
      afterLabelTextTpl : "<span style='color:red;'>*</span>"
    },
    items   : [{
      fieldLabel  : 'Leave/Occation Name',
      anchor      : '80%',
      name        : 'name',
    },{
      fieldLabel  : 'Leave Date',
      name        : 'date',
      xtype       : 'datefield',
      name        : 'leave_date',
      anchor      : '65%',
      format      : 'd-m-Y'
    },{
      fieldLabel  : 'Leave Type',
      xtype       : 'combobox',
      name        : 'type',
      anchor      : '70%',
      listeners   : {},
      editable    : false,
      store       : {
        fields    : ['abbr', 'name'],
        data      : [
          {"abbr":"bank_holiday", "name":"Bank Holiday"},
          {"abbr":"national_holiday", "name":"National Holiday"},
          {"abbr":"public_holiday", "name":"Public Holiday"}
        ]
      },
      valueField  : 'abbr',
      displayField: 'name',
      typeAhead   : true,
      queryMode   : 'local',
      forceSelection: true
    },{
      fieldLabel  : 'Comments',
      xtype       : 'textarea',
      name        : 'comments',
      allowBlank  : true,
      anchor      : '100%',
      emptyText   : 'Leave day description'
    }],
    buttons : [{
      text  : 'Reset',
      handler : function() {
        this.up('form').getForm().reset();
      }
    },{
      text  : 'Create Leave Entitlement',
    //  formBind: true, //only enabled once the form is valid
     // disabled: true,
      handler: function() {
        var form = this.up('form').getForm();
        if (form.isValid()) {
          form.submit({
            success: function(form, action) {
              Ext.Msg.alert('Success', 'Leave successfully created.');
              form.reset();
              var grids = Ext.ComponentQuery.query("grid[name='leave_calender']")[0];
              grids.getStore().load();
            },
            failure: function(form, action) {
              Ext.Msg.alert('Failed', 'Failed to create leave.');
            }
          });
        }
      }
    }]
  },{
    xtype : 'grid',
    name  : 'leave_calender',
    style : {
      paddingTop: '10px'
    },
    columns: [
      { text  : 'Entitlement',  dataIndex: 'name', flex: 1 },
      { text  : 'Type', dataIndex: 'type', flex: 1 },
      { text  : 'Date', dataIndex: 'leave_date' },
      { text  : 'Comments', dataIndex: 'comments', flex: 1 },
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
                    url   : 'leave/delete_leave_calender',
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
                          var grids = Ext.ComponentQuery.query("grid[name='leave_calender']")[0];
                          grids.getStore().load(); 
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
        }/*,{
          icon    : 'images/information.png',
          tooltip : 'View Information',
          width   : 50,
          handler : function(grid, rowIndex, colIndex) {}
        }*/]
      }
    ],
    store : {
      fields  : ['id', 'name', 'type', 'leave_date', 'comments'],
      proxy   : {
        type  : 'ajax',
        url   : 'leave/load_leave_calender',
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
