Ext.define('SysTech.view.hrms.tabs.TrainingServicesTab', {
  extend  : 'SysTech.view.BaseTabPanel',
  alias   : 'widget.training_services_tab',
  title   : 'Training Services',
  itemId  : 'training_services_tab',
  requires:[
    'SysTech.store.hrms.Role',
    'SysTech.view.hrms.CourseList',
    'SysTech.view.hrms.CreateSession',
    'SysTech.view.hrms.UserEnrollmentPanel'
  ],
  config  : {
    menu  : '', //current selected menu
    tab   : '' // current selected button
  },
  tbar    : [
    /** Course List - Admin, HR **/ 
    { xtype   : 'splitbutton',
      text    : 'Courses List',
      iconCls : 'hr-user-list',
      action  : 'course_list',
      menu    : new Ext.menu.Menu({
        width: 160,
        items: [
          {text: 'Add new Course', iconCls: 'hr-add-user', action : 'new_course'},
          {text: 'Create Session', iconCls: 'hr-create-role', action : 'new_session'},
          {text: 'Assign Training', iconCls: 'hr-assign-role', action : 'assign_training'}
        ]
      })
    },{
      xtype   : 'button',
      text    : 'View Training details',
      iconCls : 'hr-user-list',
      action  : 'view_user_training'
    },{
      xtype   : 'button',
      text    : 'Enroll Training',
      iconCls : 'hr-user-list',
      action  : 'enroll_user_training'
    }
  ],
  items   : [/*{
    xtype : 'courselist'
  }*/],
  listeners : {
    beforerender : function(me) {
      var isAdmin = global.getController('BaseController').isAdmin();
    //  console.log('------ isAdmin : ' + isAdmin);
    //  console.log('-------- beforerender ----------');
      var tbar = me.down('toolbar');
      var sptmenu = tbar.down("splitbutton[action='course_list']");
      if(isAdmin) {
        me.add({xtype : 'courselist'});
      }
      else {
        sptmenu.hide();
        me.add({xtype : 'userenrollmentpanel'});
      }
    },
    beforeshow : function(me) {
    //  console.log('-------- beforeshow ----------');
    }
  }
});