Ext.QuickTips.init();
Ext.define('SysTech.controller.hrms.HRMSController', {
  extend  : 'SysTech.controller.BaseController',
  stores  : ['hrms.Role', 'hrms.Session', 'hrms.Course', 'hrms.Enroll'],
  
  views   : ['hrms.UserForm', 'hrms.UserGrid', 'hrms.EmployeeList', 'hrms.UserSearch',
    'hrms.CreateRoles','hrms.AssignRoles', 'hrms.UserForm', 'hrms.RolesGrid',
    /** Training **/
    'hrms.CreateSession', 'hrms.CourseList', 'hrms.Course', 'hrms.Session', 'hrms.SessionGrid',
    'hrms.Enroll', 'hrms.CreateEnroll', 'hrms.CourseGrid', 'hrms.EnrollGrid', 'hrms.UserEnrollmentPanel',
    
    /** Leave Management **/
    'hrms.LeaveCalender', 'hrms.LeaveEntitlement', 'hrms.Entitlement', 'hrms.LeaveApprovalGrid',
    
    /** Payroll Management **/
    'hrms.PayrollPanel'
  ],
  refs    : [{
    ref   : 'navMenu',
    xtype : 'navmenupanel',
    selector: 'navmenupanel'
  },{
    ref   : 'manageEmpTab',
    xtype : 'manage_employee_tab',
    selector : 'manage_employee_tab'
  },{
    ref   : 'trainingTab',
    xtype : 'training_services_tab',
    selector : 'training_services_tab'
  },{
    ref   : 'leaveTab',
    xtype : 'leave_management_tab',
    selector : 'leave_management_tab'
  }],
  init: function () {
    this.control({
      'navmenupanel dataview ': {
        select: this.selectNavMenu
      },
      'manage_employee_tab menuitem' : {
        click: this.clickManageEmpMenuBtn
      },
      'manage_employee_tab > toolbar > button' : {
        click: this.clickManageEmpTbarBtn
      },
      'training_services_tab menuitem' : {
        click: this.clickTrainingMenuBtn
      },
      'training_services_tab > toolbar > button' : {
        click: this.clickTrainingServiceTbarBtn
      },
      /* LeaveManagement Tab */
      'leave_management_tab menuitem' : {
        click: this.clickLeaveMenuBtn
      },
      'leave_management_tab > toolbar > button' : {
        click: this.clickLeaveServiceTbarBtn
      },
      'createroles > form  button' : {
        click : this.btnRoleClick
      },
      'userform > toolbar > button' : {
        click : this.btnUserFormClick
      },
      'employeelist' : {
        beforerender: function(me) {
          console.log('## employeelist ##');
          Ext.getStore('userStore').load();
        }
      },
      'courselist' : {
        afterrender: function(me) {
          console.log('## courselist ##');
          me.down('.coursegrid').getStore().load();
         // Ext.getStore('courseStore').load();
        }
      },
      'course  button': {
        click : this.createCourse
      },
      'session  button': {
        click : this.createSession
      },
      'enroll  button': {
        click : this.enrollUserToTraining
      },
      'assignroles button' : {
        click: this.assignRolesToUser
      }
    });
  },
  //when user click authenticate button from loginpanel
  selectNavMenu: function(me, record) {
  },
  //create roles.
  btnRoleClick : function(btn) {
    console.log('btnRoleClick...' + btn.action);
    var me = this;
    
    var form = btn.up('form').getForm();
    if(form.isValid()) {
      form.submit({
        url: 'roles/create',
        success: function(form, action) {
          var response = action.result.data;
          Ext.Msg.show( {
            title : 'Confirmation',
            msg   : response.msg,
            width : 300,
            buttons: Ext.Msg.OK,
            fn: function(btn) {
              if(btn == 'ok') {
                Ext.getStore('roleStore').load();
              }
            },
            icon: Ext.window.MessageBox.INFO
          });
          form.reset();
        },
        failure: function(form, action) {
          Ext.Msg.alert('Failure', action.result.data.msg);
        }
      });
    }
  },
  //called when user click on any menuitem on Manage Employee
  clickManageEmpMenuBtn: function(me) {
  
    var met = this.getManageEmpTab();
    if(me.action == met.getMenu()) return false;
    else met.setMenu(me.action);
    
    console.log( 'Text : ' +me.text + '\taction : '+me.action);
    if(me.action == 'add_emp') {
      met.removeAll(true);
      met.add(this.getHrmsUserFormView());
    }
    else if(me.action == 'create_roles') {
      console.log('Has permission : >> ' + this.hasPermission('Manager'));
      met.removeAll(true);
      met.add(this.getHrmsCreateRolesView());
      met.down('.rolesgrid').getStore().load();
    }
    else if(me.action == 'assign_roles') {
      met.removeAll(true);
      met.add(this.getHrmsAssignRolesView());
    }
  },
  
  //called when user click on any button on managed employee toolbar
  clickManageEmpTbarBtn: function(me) {
    console.log('clickManageEmpTbarBtn : ' +me.text);
    var met = this.getManageEmpTab();
    if(me.action == 'payroll_panel') {
      met.removeAll(true);
      met.add(this.getHrmsPayrollPanelView());
    }
    if(me.action == 'emp_list') {
      met.removeAll(true);
      met.add(this.getHrmsEmployeeListView());
    }
  },
  
  /***
   *  when click on Training services MenuItem
   */
  clickTrainingMenuBtn: function(me) {
    
   // var action = me.action;
    var tab = this.getTrainingTab();
    if(me.action == tab.getMenu()) return false;
    else tab.setMenu(me.action);
    console.log( 'Text : ' +me.text + '\taction : '+me.action);
    //if action =='add_emp' then add employee form
    if(me.action == 'new_session') {
      tab.removeAll(true);
      tab.add(this.getHrmsCreateSessionView());
      tab.down('sessiongrid').getStore().load();
      //load session grid.
      //var sessionGridView = this.getHrmsSessionGridView();
      //var sessionStore = Ext.getStore('sessionStore');
      //sessionGridView.setStore(this.getHrmsSessionStore().load());
    }
    if(me.action == 'new_course') {
      tab.removeAll(true);
      tab.add(this.getHrmsCourseView());
    }
    
    else if(me.action == 'assign_training') {
      tab.removeAll(true);
      tab.add(this.getHrmsCreateEnrollView());
      //tab.down('enrollgrid').getStore().load();
    }
    /*
    else if(action == 'assign_roles') {
      met.removeAll(true);
      met.add(this.getHrmsAssignRolesView());
    }
    */
  },
  
  /***
  *
  */
  clickTrainingServiceTbarBtn: function(me) {
    console.log('clickTrainingServiceTbarBtn : ' +me.text);
    
    var tab = this.getTrainingTab();
    if(me.action == tab.getMenu()) return false;
    else tab.setMenu(me.action);
    console.log( 'Text : ' +me.text + '\taction : '+me.action);
    
    //if action =='add_emp' then add employee form
    if(me.action == 'course_list') {
      tab.removeAll(true);
      tab.add(this.getHrmsCourseListView());
      var coursegrid = tab.down('.coursegrid');
      coursegrid.getStore().load();
    }
    else if(me.action == 'enroll_user_training') {
      tab.removeAll(true);
      
    }
    else if(me.action == 'view_user_training') {
      tab.removeAll(true);
      tab.add(this.getHrmsUserEnrollmentPanelView());
   //   var grid = tab.down('grid');
   //   grid.getStore().load();
    }
  },
  
  /***
   *  when click on LeaveManagement MenuItem
   */
  clickLeaveMenuBtn: function(me) {
   // var action = me.action;
    var tab = this.getLeaveTab();
    if(me.action == tab.getMenu()) return false;
    else tab.setMenu(me.action);
    console.log( 'Text : ' +me.text + '\taction : '+me.action);
    //if action =='add_emp' then add employee form
    if(me.action == 'leave_cal') {
      tab.removeAll(true);
      tab.add(this.getHrmsLeaveCalenderView());
    //  tab.down('sessiongrid').getStore().load();
    }
    else if(me.action == 'leave_type') {
      tab.removeAll(true);
      tab.add(this.getHrmsEntitlementView());
    }
  },
  
  /***
  *
  */
  clickLeaveServiceTbarBtn: function(me) {
    console.log('clickLeaveMgmtTbarBtn : ' +me.text);
    
    var tab = this.getLeaveTab();
    if(me.action == tab.getMenu()) return false;
    else tab.setMenu(me.action);
    console.log( 'Text : ' +me.text + '\taction : '+me.action);
    
    //if action =='add_emp' then add employee form
    if(me.action == 'course_list') {
      tab.removeAll(true);
      tab.add(this.getHrmsCourseListView());
      var coursegrid = tab.down('.coursegrid');
      coursegrid.getStore().load();
    }
    else if(me.action == 'enroll_user_training') {
      tab.removeAll(true);
      
    }
    else if(me.action == 'leave_entitlement') {
      tab.removeAll(true);
      tab.add(this.getHrmsLeaveEntitlementView());
   //   var grid = tab.down('grid');
   //   grid.getStore().load();
    }
  },
  /**
    create or reset button for userform
  */
  btnUserFormClick : function (btn) {
    console.log('btnUserFormClick : ' + btn.text);
    var me  = this,
    form    = btn.up('form').getForm();
    
    if(btn.action == 'reset') {
      form.reset();
    }
    else if(btn.action == 'save') {
      if(form.isValid()) {
        form.submit({
          url: 'users/create',
          success: function(form, action) {
            var response = action.result.data;
            Ext.Msg.show( {
              title : 'Confirmation',
              msg   : response.msg,
              width : 300,
              buttons: Ext.Msg.OK,
              fn: function(btn) {
                if(btn == 'ok') {
                  form.reset();
                 // Ext.getStore('roleStore').load();
                }
              },
              icon: Ext.window.MessageBox.INFO
            });
          },
          failure: function(form, action) {
            Ext.Msg.alert('Failure', action.result.data.msg);
          }
        });
      }
    }
    
  },
  /**
  * create courses
  */
  createCourse : function(btn) {
    console.log('**** create course *****' + btn.action);
    
    var me = this,
    form = btn.up('.course').getForm();
    
    if(btn.action == 'create') {
      if(form.isValid()) {
        form.submit({
          url: 'training/create_course',
          success: function(form, action) {
            var response = action.result.data;
            Ext.Msg.show( {
              title : 'Confirmation',
              msg   : response.msg,
              width : 300,
              buttons: Ext.Msg.OK,
              fn: function(btn) {
                if(btn == 'ok') {
                  form.reset();
                  Ext.getStore('courseStore').load();
                }
              },
              icon: Ext.window.MessageBox.INFO
            });
          },
          failure: function(form, action) {
            Ext.Msg.alert('Failure', action.result.data.msg);
          }
        });
      }
    }
    else if(btn.action == 'reset') {
      form.reset();
    }
  },
  //create new session
  /**
  * create courses
  */
  createSession : function(btn) {
    console.log('**** create session *****' + btn.action);
    
    var me = this,
    form = btn.up('.session').getForm();
    
    if(btn.action == 'create') {
      if(form.isValid()) {
        form.submit({
          url: 'training/create_session',
          success: function(form, action) {
            var response = action.result.data;
            Ext.Msg.show({
              title : 'Confirmation',
              msg   : response.msg,
              width : 300,
              buttons: Ext.Msg.OK,
              fn: function(btn) {
                if(btn == 'ok') {
                  form.reset();
                  //load session grid
                  Ext.getStore('sessionStore').load();
                }
              },
              icon: Ext.window.MessageBox.INFO
            });
          },
          failure: function(form, action) {
            Ext.Msg.alert('Failure', 'Fail to create session');
          }
        });
      }
    }
    else if(btn.action == 'reset') {
      form.reset();
    }
  },
  enrollUserToTraining: function(btn) {
   // console.log('**** assing training to users *****' + btn.action);
    var me = this,
    form = btn.up('.enroll').getForm();
    
    if(btn.action == 'create') {
      if(form.isValid()) {
        form.submit({
          url : 'training/enroll_user',
          success : function(form, action) {
            var response = action.result;
            var success = response.success == 'success' ? 'Confirmation': 'Error';
            var icon = response.success == 'success' ? Ext.MessageBox.INFO : Ext.MessageBox.ERROR;
            Ext.Msg.show({
              title : success,
              msg   : response.data.msg,
              width : 300,
              buttons: Ext.Msg.OK,
              fn: function(btn) {
                if(btn == 'ok') {
                  form.reset();
                  //load session grid
                  //Ext.getStore('enrollStore').load();
                }
              },
              icon  : icon
            });
          },
          failure: function(form, action) {
            Ext.Msg.alert('Failure', action.result.data.msg);
          }
        });
      }
    }
    else if(btn.action == 'reset') {
      form.reset();
    }
  },
  
  //function used to send request to server to assign roles to user
  assignRolesToUser: function(btn) {
  
    console.log('**** assing roles to users *****' + btn.action);
    var me = this,
      form = btn.up('.form').getForm();
    
    if(btn.action == 'assign') {
      if(form.isValid()) {
        //
        var combo = btn.up('.form').down("combobox[name='role_id']");
        var roleIdsArray = combo.getValue(), rolesId = '';
        Ext.each(roleIdsArray, function(id) {
          rolesId += id +',';
        });
        
       // console.log(rolesId.substring(0,rolesId.length-1));
        var user_combo = btn.up('.form').down("combobox[name='user_id']")
        Ext.Ajax.request({
          url : 'roles/assign_roles',
          method: 'POST',
          params: {
            user_id : user_combo.getValue(),
            role_id : rolesId.substring(0, rolesId.length-1)
          },
          success: function(response) {
            var resp = Ext.JSON.decode(response.responseText);
            Ext.Msg.show({
              title : 'Confirmation',
              msg   : resp.data.msg,
              width : 400,
              buttons: Ext.Msg.OK,
              fn: function(btn) {
                if(btn == 'ok') {
                  form.reset();
                  //load session grid
                  //Ext.getStore('sessionStore').load();
                }
              },
              icon  : Ext.MessageBox.INFO
            });
          },
          failure: function(response) {
            Ext.Msg.alert('Failure', 'Failed to assign Roles to user.');
          }
        });
      }
    }
    else if(btn.action == 'reset') {
      form.reset();
    }
    else if(btn.action == 'view_roles') {
      var combo = btn.up('.form').down("combo[name='user_id']");
      var user_id = combo.getValue();
      if(user_id == null) {
        Ext.Msg.alert('Failure', 'Please select User first before proceeding.');
        return false;
      }
      //if user is not selected then show error message, ask to select user
      // focus on combo
      var grid = Ext.create('SysTech.view.hrms.RolesGrid', {title : '', style : { paddingTop : '0px'}});
      var store = grid.getStore();
      var proxy = store.getProxy();
      proxy.url = "roles/view_user_role/" + user_id;
      store.load();
      var window = Ext.create('Ext.window.Window', {
        modal : true,
        height: 200,
        width : 400,
        layout: 'fit',
        listeners : {
          close : function(w) {
            console.log('load. role store here....');
            proxy.url = "roles";
            store.load();
          }
        }
      });
      window.setTitle(combo.getRawValue() + ' assigned roles');
      window.add(grid);
      window.show();
    }
  }
  
});
