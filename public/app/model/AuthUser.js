Ext.define('SysTech.model.AuthUser', {
  extend: 'Ext.data.Model',
  fields: [
    {name: 'id',  type: 'int'},
    {name: 'first_name',  type: 'string'},
    {name: 'last_name',   type: 'string'},
    {name: 'user_name',   type: 'string'},
    //{name: 'age',         type: 'int'},
    {name: 'email',       type: 'string'},
    {name: 'manager_id',  type: 'int'},
    {name: 'manager',     type: 'auto'},
    {name: 'roles',       type: 'auto'}
  ]
});