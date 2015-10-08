Ext.define('SysTech.store.hrms.JobTitle', {
  extend  : 'Ext.data.Store',
  storeId : 'jobTitleStore',
  fields  : ['id', 'job_title', 'job_description'],
  proxy   : {
    type  : 'ajax',
    url   : 'payroll/load_job_titles',
      reader: {
        type: 'json',
        root: 'data'
      }
  },
  autoLoad: false //make it false later
});
//create store
Ext.create('SysTech.store.hrms.JobTitle');