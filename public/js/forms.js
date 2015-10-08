Ext.onReady(function () {

var tab2 = Ext.create('Ext.form.Panel', {
      //  title: 'Inner Tabs',
       // bodyStyle:'padding:5px',
        width: 700,
        url : 'userform',
        border: false,
        fieldDefaults: {
          //  labelAlign: 'left',
            msgTarget: 'side',
            labelWidth: 140
        },
        defaults: {
            anchor: '100%'
        },

        items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth: 0.5,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'First Name',
                    name: 'first',
                    anchor:'95%'
                }, {
                  xtype     : 'radiogroup',
                  fieldLabel: 'Gender',
                  // Arrange radio buttons into two columns, distributed vertically
                  columns   : 2,
                  vertical  : true,
                  anchor    : '90%',
                  items     : [
                      { boxLabel: 'Male', name: 'gender', inputValue: '1' },
                      { boxLabel: 'Female', name: 'gender', inputValue: '2', checked: true}
                  ]
                },{
                    fieldLabel: 'Driver\'s License Number',
                 //   xtype : 'datefield',
                    name      : 'license_no',
                    anchor    : '80%'
                },{
                    fieldLabel: 'Passport Number',
                    name: 'passport',
                    anchor:'95%'
                },]
            },{
                columnWidth:.5,
                border:false,
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Last Name',
                    name: 'last_name',
                    anchor:'95%'
                },{
                    fieldLabel: 'Marital Status',
                    name: 'merital_status',
                    anchor:'95%'
                },{
                    fieldLabel: 'License Expiry Date',
                    xtype     : 'datefield',
                    name      : 'exp_date',
                    anchor    : '85%'
                },{
                    fieldLabel: 'Nationality',
               //     xtype : 'datefield',
                    name: 'nationality',
                    anchor:'95%'
                }]
            }]
        }/*, {
                xtype: 'fieldset',
                title: 'Mailing Address',
                defaultType: 'textfield',
                 collapsible: true,
                //collapsed : true,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'Street Address',
                    name: 'mailingStreet',
                    listeners: {},
                    billingFieldName: 'billingStreet',
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'City',
                        name: 'mailingCity',
                        listeners: {},
                       // billingFieldName: 'billingCity',
                      //  flex: 1,
                     //   width: 50,
                        allowBlank: false
                    }, {xtype: 'splitter'},{
                        xtype: 'combobox',
                       // name: 'mailingState',
                        listeners: {},
                      //  billingFieldName: 'billingState',
                        fieldLabel: 'State',
                        labelWidth: 50,
                        width: 160,
                        store: {
                          fields: ['abbr', 'name'],
                          data : [
                              {"abbr":"AL", "name":"Alabama"},
                              {"abbr":"AK", "name":"Alaska"},
                              {"abbr":"AZ", "name":"Arizona"}
                          ]
                        },
                        valueField: 'abbr',
                        displayField: 'name',
                        typeAhead: true,
                        queryMode: 'local',
                    //    allowBlank: false,
                        forceSelection: true
                    }, {xtype: 'splitter'},{
                        xtype: 'textfield',
                        fieldLabel: 'Postal Code',
                        labelWidth: 80,
                        name: 'mailingPostalCode',
                        listeners: {},
                        billingFieldName: 'billingPostalCode',
                        width: 175,
                        allowBlank: false,
                        maxLength: 10,
                        enforceMaxLength: true,
                        maskRe: /[\d\-]/,
                        regex: /^\d{5}(\-\d{4})?$/,
                        regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
                    }]
                }]
            },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:160,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'Phone Details',
             //   defaults: {width: 230},
                defaultType: 'textfield',
                 items :[{
                      fieldLabel: 'Home',
                      name: 'home',
                      value: '(888) 555-1212'
                  },{
                      fieldLabel: 'Business',
                      name: 'business'
                  },{
                      fieldLabel: 'Mobile',
                      name: 'mobile'
                  },{
                      fieldLabel: 'Fax',
                      name: 'fax'
                  }]
            },{
                title:'Contact Details',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'First Name',
                    name: 'first',
                    allowBlank:false,
                    value: 'Jamie'
                },{
                    fieldLabel: 'Last Name',
                    name: 'last',
                    value: 'Avins'
                },{
                    fieldLabel: 'Company',
                    name: 'company',
                    value: 'Ext JS'
                }, {
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype:'email'
                }]
            },{
                title:'Qualifications',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: 'Home',
                    name: 'home',
                    value: '(888) 555-1212'
                },{
                    fieldLabel: 'Business',
                    name: 'business'
                },{
                    fieldLabel: 'Mobile',
                    name: 'mobile'
                },{
                    fieldLabel: 'Fax',
                    name: 'fax'
                }]
            }]
        }*/],

        buttons: [{
            text: 'Save',
            handler : function(me) {
              var form = me.up('.form').getForm();
              values = form.getValues();
              form.submit(function(me) {
                console.log('success..............');
              });
              console.log('ssss..........');
            }
        },{
            text: 'Cancel'
        }]
    });

    tab2.render('output');


});