//Ext.Loader.setConfig({enabled : true});
//Ext.require('employeeform');
Ext.onReady(function () {
  
	Ext.define('org.techzoo.LoginForm', {
		extend	: 'Ext.window.Window',
    bodyPadding: 0,
    closable: false,
    width: 380,
    height: 200,
    autoShow: true,
    modal: true,
    frame : true,
		title	: 'Login',
    icon  : 'images/icon_users.png',
		items	: [{
      xtype: 'container',
      height: 50,
      layout: {
        type: 'hbox'
      },
      width: 370,
      style: {
        paddingTop: '10px',
        paddingLeft: '10px',
        paddingBottom: '10px',
        borderWidth : '0px',
        backgroundColor: '#F5F5F0'
      },
      items: [{
        xtype: 'container',
        width: 300,
        html: '<b>This time zone converter lets you visually and very quickly convert IST to BST and vice-versa.</b>'
      },{
        xtype:'box',
        height: 50,
        autoEl:{
          tag:'div', 
          children:[{
            tag:'img',
            src:'images/software.png'
          }]
        }
      }]
    },{
      xtype: 'form',
      bodyPadding: 10,
      width: 370,
      bodyStyle : {
        backgroundColor: '#fff',
        borderWidth: '0px'
      },
      items: [{
      xtype       : 'textfield',
      id          : 'name',
      allowBlank  : false,
      labelAlign: 'right',
      size: 40,
      msgTarget   : 'side',
      fieldLabel  : 'User Name'
		},{
      xtype       : 'textfield',
      id          : 'password',
       labelAlign: 'right',
      allowBlank  : false,
      msgTarget   : 'side',
      size: 100,
      minLength   : 6,
      fieldLabel  : 'Password',
      inputType   : 'password'
    },{
      xtype : 'displayfield',
      fieldLabel  : '&nbsp;',
      labelSeparator: '',
      value  : '<a href="#" style="text-decoration:none;float:right;">Forgot password ?</a>'
    }]
  }],
    dockedItems: [{
      xtype   : 'toolbar',
      padding : '2 0 2 0',
      dock    : 'bottom',
      ui      : 'footer',
      items   : [{
        xtype: 'tbfill'
      },{
        text: 'Cancel',
        iconCls: 'nav-remove'
      },{
        text: 'Authenticate User',
        iconCls: 'nav-login'
      }]
    }]
	});
 // Ext.create('org.techzoo.LoginForm', {renderTo : Ext.getBody()});
  
  
  Ext.widget('button', {
        text: 'Click Me',
        renderTo: 'output',
        handler: function () {
            Ext.create('org.techzoo.LoginForm', {renderTo : Ext.getBody()});
        }
    });
});