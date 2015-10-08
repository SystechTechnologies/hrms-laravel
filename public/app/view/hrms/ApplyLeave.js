Ext.define('SysTech.view.hrms.ApplyLeave', {
  bodyStyle : 'padding:10px',
  extend    : 'Ext.form.Panel',
  alias     : 'widget.applyleave',
 // width     : 500,
  border    : false,
 // title     : 'Apply Leaves',
  requires  : [
   // 'SysTech.view.hrms.RolesGrid', 
   // 'SysTech.store.hrms.Role' 
  ],
  url : 'leave/apply_leave',
  fieldDefaults : {
    msgTarget   : 'side',
    allowBlank  : false,
    labelWidth  : 140//,
  //  labelAlign  : 'right'
  },
  defaultType : 'textfield',
  defaults  : {
    anchor  : '50%',
    afterLabelTextTpl : "<span style='color:red;'>*</span>"
  },
  items   : [{
    fieldLabel  : 'Leave Type',
    xtype       : 'combobox',
    name        : 'entitlement_id',
    anchor      : '60%',
    valueField  : 'id',
    listeners   : {},
    editable    : false,
    store       : {
      fields    : ['id', 'name', 'no_of_days'],
      proxy     : {
        type   : 'ajax',
        url    : 'leave/load_leave_entitlement',
        reader : {
          type  : 'json',
          root  : 'data'
        }
      },
      autoLoad: true
    },
    tpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
        '<div class="x-boundlist-item">{name} - ({no_of_days} days)</div>',
      '</tpl>'
    ),
    displayTpl: Ext.create('Ext.XTemplate',
      '<tpl for=".">',
        '{name} - ({no_of_days} days)',
      '</tpl>'
    ),
    displayField: 'name',
    typeAhead   : true,
    queryMode   : 'local',
    forceSelection: true
  },{
    fieldLabel  : 'To',
    xtype       : 'datefield',
    name        : 'to_date',
    itemId      : 'to_date',
    anchor      : '50%',
    format      : 'm-d-Y',
    disabledDays:  [0, 6],
    editable    : false
  },{
    fieldLabel  : 'From',
    xtype       : 'datefield',
    name        : 'from_date',
    itemId      : 'from_date',
    anchor      : '50%',
    disabledDays:  [0, 6],
    //http://www.developersnippets.com/2009/06/24/date-range-using-extjs-date-field-and-advanced-vtype/
    editable    : false,
    format      : 'm-d-Y',
    listeners   : {
      change    : function (me, n, o) {
        var form = me.up('form');
        var to = form.getComponent('to_date');
        var from = form.getComponent('from_date');
        var no_of_days = form.getComponent('no_of_days');
        if(to.getValue() == null || to.getValue() == '') {
          Ext.Msg.alert('Error', 'Please select To date first.');
          to.focus();
          return;
        }
        var toDate = new Date(to.getValue()), fromDate = new Date(from.getValue());
        var noOfDays = form.calcBusinessDays(toDate, fromDate);
        if(noOfDays == -1) {
          Ext.Msg.alert('Error', 'From date can not be before To date, Please select a valid date.');
          return;
        }
        no_of_days.setValue(noOfDays);
      }
    }
  },{
    fieldLabel  : 'Working Days Applied',
    name        : 'no_of_days',
    itemId      : 'no_of_days',
    anchor      : '30%',
    readOnly    : true,
    allowBlank  : true
  },{
    fieldLabel  : 'Approving Officer',
    name        : 'mgr_id',
    readOnly    : true
  },{
    fieldLabel  : 'Address while on Leave',
    xtype       : 'textarea',
    name        : 'address_on_leave',
    anchor      : '70%',
    emptyText   : 'Address while on Leave',
    blankText   : 'Please enter your contact address when you are on leave.'
  },{
    fieldLabel  : "Remarks:<br/><small style='color:blue;'>(max 200 chars)</small>",
    xtype       : 'textarea',
    name        : 'remarks',
    labelSeparator  : '',
    anchor      : '70%',
    emptyText   : 'Your remarks...',
    blankText   : 'Please write your remarks here...'
  }],
  listeners : {
    afterrender : function(me) {
      var manager = global.getController('BaseController').getManager();
      var tf = me.down("textfield[name='mgr_id']");
      //tf.setDisabled(true);
      var mgr_name = manager.first_name + ' ' + manager.last_name;
      tf.setValue(mgr_name);
    }
  },
  dockedItems: [{
    xtype   : 'toolbar',
    padding : '2 0 2 10',
    dock    : 'bottom',
    ui      : 'footer',
    items   : [{
      text    : 'Reset Form',
      iconCls : 'reset',
      handler : function() {
        this.up('form').getForm().reset();
      }
    },{
      text    : 'Apply for Leave',
      iconCls : 'save',
      handler : function() {
        var form = this.up('form').getForm();
        //check before submitting, if the user applied to more days leave then leave type contains.
        if (form.isValid()) {
          form.submit({
            success: function(form, action) {
              var res = action.result.success === 'success' ? 'Success' : 'Fail';
              if (res === 'Success') {form.reset();}
              Ext.Msg.alert(res , action.result.data.msg);
            },
            failure: function(form, action) {
              Ext.Msg.alert('Failed', 'Failed to apply for leave, please try again.');
            }
          });
        }
      }
    }]
  }],
  calcBusinessDays: function(dDate1, dDate2) { // input given as Date objects
    var iWeeks, iDateDiff, iAdjust = 0;
    if (dDate2 < dDate1) return -1;// error code if dates transposed
    var iWeekday1 = dDate1.getDay();// day of week
    var iWeekday2 = dDate2.getDay();

    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1;// change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;

    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend

    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1;// only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;
    // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
    iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)
    if (iWeekday1 <= iWeekday2) {
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }
    iDateDiff -= iAdjust// take into account both days on weekend
    return (iDateDiff + 1);// add 1 because dates are inclusive
  }
});  
