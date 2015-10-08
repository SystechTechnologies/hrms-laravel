Ext.define('SysTech.view.hrms.PayrollPanel', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.panel.Panel',
  alias     : 'widget.payrollpanel',
  //width   : 700,
  border    : false,
  layout    : 'vbox',
  requires  : [],
  items: [{
    xtype   : 'container',
    height  : 100,
    width   : 700,
    layout  : 'hbox',
    items   : [{
      xtype : 'component',
      autoEl  : {
        tag : 'img',
        style : 'width:50px;',
        src : 'images/jobcategory.png'
      }
    },{
      xtype : 'component',
      width : 600,
      style : {paddingLeft: '10px', wordWrap: 'normal', lineHeight: '20px'},
      html  : '<b style="font-size:14px;"><a id="newJobCategory" href="#" style="color:red;">Jobs Categories</a></b><br />Create a Job category in your Organization. Job category will help you in organizing your employee hierarchy.',
      listeners : {
        afterrender : function() {
          var newJ = Ext.get('newJobCategory').on('click', function() {
            var panel = Ext.ComponentQuery.query('.manage_employee_tab')[0];
            panel.removeAll(true);
            var jobPanel = Ext.create('SysTech.view.hrms.JobCategories');
            panel.add(jobPanel);
          });
        }
      }
    }]
  },{
    xtype   : 'container',
    height  : 100,
    width   : 700,
    layout  : 'hbox',
    items   : [{
      xtype : 'component',
      autoEl  : {
        tag : 'img',
        style : 'width:50px;',
        src : 'images/payment.png'
      }
    },{
      xtype : 'component',
      width : 600,
      style : {paddingLeft: '10px', wordWrap: 'normal', lineHeight: '20px'},
      html  : '<b style="font-size:14px;"><a id="salaryComponents" href="#" style="color:red;">Salary Components</a></b><br />Create a Job category in your Organization. Job category will help you in organizing your employee hierarchy.',
      listeners : {
        afterrender : function() {
          var newJ = Ext.get('salaryComponents').on('click', function() {
            var panel = Ext.ComponentQuery.query('.manage_employee_tab')[0];
            panel.removeAll(true);
            var jobPanel = Ext.create('SysTech.view.hrms.SalaryComponents');
            panel.add(jobPanel);
          });
        }
      }
    }]
  },{
    xtype   : 'container',
    height  : 100,
    width   : 700,
    layout  : 'hbox',
    items   : [{
      xtype : 'component',
      autoEl  : {
        tag   : 'img',
        style : 'width:50px;',
        src   : 'images/job_title.jpg'
      }
    },{
      xtype : 'component',
      width : 600,
      style : {paddingLeft: '10px', wordWrap: 'normal', lineHeight: '20px'},
      html  : '<b style="font-size:14px;"><a id="salaryTitles" href="#" style="color:red;">Job Titles</a></b><br />Create a Job category in your Organization. Job category will help you in organizing your employee hierarchy.',
      listeners : {
        afterrender : function() {
          var newJ = Ext.get('salaryTitles').on('click', function() {
            var panel = Ext.ComponentQuery.query('.manage_employee_tab')[0];
            panel.removeAll(true);
            var jobPanel = Ext.create('SysTech.view.hrms.JobTitle');
            panel.add(jobPanel);
          });
        }
      }
    }]
  }],
  listeners : {
    beforerender : function(me) {
    }
  }
});
