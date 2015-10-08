Ext.define('SysTech.store.hrms.JobCategory', {
  extend  : 'Ext.data.Store',
  storeId : 'jobCategoryStore',
  fields  : ['id', 'job_category', 'job_description'],
  proxy   : {
    type  : 'ajax',
    url   : 'payroll/load_job_categories',
      reader: {
        type: 'json',
        root: 'data'
      }
  },
  autoLoad: false //make it false later
});
//create store
Ext.create('SysTech.store.hrms.JobCategory');