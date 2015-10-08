Ext.onReady(function () {
  Ext.widget('form', {
    title: 'Upload Demo',
    width: 400,
    bodyPadding: 10,
    items: [{
      xtype: 'filefield',
      name: 'file',
      fieldLabel: 'File',
      labelWidth: 50,
      anchor: '100%',
      buttonText: 'Select File...'
    }],
    buttons: [{
      text: 'Upload',
      handler: function () {
        var form = this.up('form').getForm();
        if (form.isValid()) {
          form.submit({
            url: '/extjs-tutorials/upload.php',
            waitMsg: 'Uploading your file...',
            success: function (f, a) {
              var result = a.result, data = result.data,
                name = data.name, size = data.size,
              message = Ext.String.format('<b>Message:</b> {0}<br>' +
                '<b>FileName:</b> {1}<br>' +
                '<b>FileSize:</b> {2}',
                result.msg, name, size);
              Ext.Msg.alert('Success', message);
            },
            failure: function (f, a) {
              Ext.Msg.alert('Failure', a.result.msg);
            }
          });
        }
      }
    }],
    renderTo: 'output'
  });
});