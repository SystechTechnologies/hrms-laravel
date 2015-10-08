Ext.define('SysTech.store.hrms.SalaryComponent', {
  extend  : 'Ext.data.Store',
  storeId : 'salaryComponentStore',
  fields  : ['id', 'name', 'type', 'total_payable', 'ctc'],
  proxy   : {
    type  : 'ajax',
    url   : 'payroll/load_salary_comp',
      reader: {
        type: 'json',
        root: 'data'
      }
  },
  autoLoad: false //make it false later
});
//create store
Ext.create('SysTech.store.hrms.SalaryComponent');