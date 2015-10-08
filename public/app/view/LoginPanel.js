Ext.define('SysTech.view.LoginPanel', {
  extend  : 'Ext.window.Window',
  alias   : 'widget.loginpanel',
  bodyPadding: 0,
  closable: false,
  width   : 380,
  height  : 200,
  autoShow: true,
  modal   : true,
  frame   : true,
	title	  : 'Login',
  icon    : 'images/icon_users.png',
	items	  : [{
    xtype : 'container',
    height: 50,
    layout: {
      type: 'hbox'
    },
    width : 370,
    style : {
      paddingTop  : '10px',
      paddingLeft : '10px',
      paddingBottom: '10px',
      borderWidth : '0px',
      backgroundColor: '#F5F5F0'
    },
    items : [{
      xtype : 'container',
      width : 300,
      html  : '<b>This time zone converter lets you visually and very quickly convert IST to BST and vice-versa.</b>'
    },{
      xtype :'box',
      height: 50,
      autoEl:{
        tag : 'div', 
        children  : [{
          tag : 'img',
          src : 'images/software.png'
        }]
      }
    }]
  },{
    xtype : 'form',
    id    : 'loginForm', 
    bodyPadding: 10,
    width : 370,
    bodyStyle : {
      backgroundColor: '#fff',
      borderWidth: '0px'
    },
    items: [{
        xtype       : 'textfield',
        name        : 'user_name',
        allowBlank  : false,
        labelAlign  : 'right',
        size        : 40,
        msgTarget   : 'side',
        fieldLabel  : 'User Name',
        value       : 'khan123' 
      },{
        xtype       : 'textfield',
        id          : 'password',
        name        : 'password',
        labelAlign  : 'right',
        allowBlank  : false,
        msgTarget   : 'side',
        size        : 100,
        minLength   : 3,
        fieldLabel  : 'Password',
        inputType   : 'password',
        value       : 'khan123'
      },{
        xtype       : 'displayfield',
        fieldLabel  : '&nbsp;',
        labelSeparator: '',
        value       : '<a href="#" style="text-decoration:none;float:right;">Forgot password ?</a>'
      }]
    }],
    dockedItems: [{
      xtype   : 'toolbar',
      padding : '2 0 2 0',
      dock    : 'bottom',
      ui      : 'footer',
      items   : [{
        xtype : 'tbfill'
      },{
        text  : 'Cancel',
        action: 'cancel',
        iconCls: 'nav-remove'
      },{
        text  : 'Authenticate User',
        action: 'auth',
        iconCls: 'nav-login'
      }]
    }]
	});