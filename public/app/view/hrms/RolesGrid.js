Ext.define('SysTech.view.hrms.RolesGrid', {
  extend  : 'Ext.grid.Panel',
//  title   : 'User Roles Grid',
  alias   : 'widget.rolesgrid',
  width   : 590,
  height  : 300,
  requires: [
    'SysTech.store.hrms.Role'
  ],
//  padding: 10,
  //border: false,
  style : {
    paddingTop: '10px'
  },
  store   : Ext.StoreMgr.lookup('roleStore'),
  columns : [
    { text: 'Role Name',  dataIndex: 'name' },
    { text: 'Role Descriptions', dataIndex: 'description', flex: 1 },
    { text: 'Action',
      xtype : 'actioncolumn',
      width : 50,
      items: [{
        icon    : 'images/cross.png',
        tooltip : 'Delete Roles',
        text    : 'Delete',
        handler : function(grid, rowIndex, colIndex) {
          var rec = grid.getStore().getAt(rowIndex);
          var window = grid.up('window');
          if(window == undefined) {
            // don't allow anyone to delete system's roles
            if (rec.get('type') == 'system') {
              Ext.Msg.show({
                title : 'Error',
                msg   : rec.get('name') +' is system roles, You can\'t delete it.',
                width : 300,
                buttons: Ext.Msg.OK,
                icon  : Ext.MessageBox.ERROR
              });
              return false;
            }
            //if its not a system role then... delete it.
            Ext.Msg.show({
              title : 'Confirmation',
              msg   : 'Are you sure you want to delete this Role ?',
              width : 300,
              buttons: Ext.Msg.OKCANCEL,
              fn    : function(btn) {
                if(btn == 'ok') {
                  Ext.Ajax.request({
                    url : 'roles/delete',
                    params: {
                      id: rec.get('id')
                    },
                    success: function(response){
                      var text = response.responseText;
                      Ext.Msg.show({
                        title : 'Confirmation',
                        msg   : 'Role successfully deleted.',
                        width : 300,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                          var store = Ext.getStore('roleStore');
                          store.load();
                        },
                        icon: Ext.window.MessageBox.INFO
                      });
                    }
                  });
                }
              },
              icon: Ext.window.MessageBox.INFO
            });
          }//if
          else {
            //code for deleting assign role to user.
            var frm = Ext.ComponentQuery.query('assignroles > form')[0];
            var cmb = frm.down("combo[name='user_id']");
            var uid = cmb.getValue();
            Ext.Msg.show({
              title : 'Confirmation',
              msg   : 'Are you sure you want to delete user Role ?',
              width : 300,
              buttons: Ext.Msg.OKCANCEL,
              fn    : function(btn) {
                if(btn == 'ok') {
                  Ext.Ajax.request({
                    url : 'roles/delete_user_role',
                    params: {
                      user_id : cmb.getValue(),
                      role_id : rec.get('id')
                    },
                    success: function(response){
                      Ext.Msg.show({
                        title : 'Confirmation',
                        msg   : 'Role successfully deleted.',
                        width : 300,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                          var store = Ext.getStore('roleStore');
                          store.load();
                        },
                        icon: Ext.window.MessageBox.INFO
                      });
                    }
                  });
                }
              },
              icon: Ext.window.MessageBox.INFO
            });
          }
        }
      }]
    }
  ]
});