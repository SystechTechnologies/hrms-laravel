Ext.define('SysTech.controller.BaseController', {
  extend  : 'Ext.app.Controller',
  stores  : [], //TODO create a user store 
  views   : [ 'Permission'],
  refs    : [{
    ref   : 'loginpanel',
    xtype : 'loginpanel',
    selector: 'loginpanel'
  }],
  init: function () {
  /* this.addEvents('permission');
    this.on('permission', function(role) {
      console.log('checking ' + role + ' permission');
      return role == 'Admin';
    }, this);
    */
    this.control({
      'loginpanel button[action=auth]': {
        click: this.authenticateUser
      },
      'permission': {
        hasPermission : this.checkUserPermissions
      }
    });
  },
  
  checkUserPermissions : function(role) {
    console.log('calling handlers....' + role);
    return this.hasPermission(role);
  },
  //when user click authenticate button from loginpanel
  authenticateUser: function() {
  //  console.log('Authenticate...');
    var me = this,
    form = me.getLoginpanel().down('#loginForm');
    
    var authForm = form.getForm();
    var values = authForm.getValues();
    if(authForm.isValid()) {
      authForm.submit({
        url: 'login/check_user',
        success: function(form, action) {
          var response = action.result
          if(response.success == 'fail') {
            Ext.Msg.show({
              title : 'Error',
              msg   : response.data.msg,
              width : 300,
              buttons: Ext.Msg.OK,
              fn    : function(btn) {
                if(btn == 'ok') {
                  authForm.reset();
                }
              },
              icon  : Ext.MessageBox.ERROR
            });
          }
          else if(response.success == 'success') {
            var authUser = Ext.create('SysTech.model.AuthUser', response.data);
            var store = Ext.getStore('authStore') || Ext.create('SysTech.store.Auth');
            store.removeAll();
            store.add(authUser);
            me.getLoginpanel().destroy();
            Ext.create('SysTech.view.Viewport');
          }
        },
        failure: function(form, action) {
          Ext.Msg.alert('Failure', "Failure....");
        }
      });
    }
  },
  
  /**
  * utility method to check if user has required permissions or not
  */
  hasPermission: function(permission) {
  //  console.log('checking user permission :' + permission);
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    var roles = data['roles'];
    var checkPer = false;
    for(var x = 0; x < permission.length; x++) {
      Ext.each(roles, function(role) {
        if (permission[x] === role['name']) {
          checkPer = true;
        }
      });
    }
    return checkPer;
  },
  isAdmin: function() {
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    var roles = data['roles'];
    var admin = false;
    Ext.each(roles, function(role) {
      if (role['name'] == 'Admin') {
        admin = true;
      }
    });
    return admin;
  },
  /****
  * utility method used to check if the authenticated user has only 'Employee' role
  */
  isEmployee : function() {
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    var roles = data['roles'];
    if(roles.length == 1 && roles[0].name === 'Employee')
      return true;
    else 
      return false;
  },
  getUserName : function() {
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    var uname = data['first_name']  +' '+data['last_name'];
    return uname;
  },
  /**
   * utility method to get authanticated user Id
   */
  getUserId: function() {
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    return data['id'];
  },
  getManager : function() {
    var user = Ext.getStore('authStore').getAt(0);
    var data = user.getData();
    var mgr = data['manager'];
    return mgr;
  }
  
});
