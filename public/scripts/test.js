Ext.onReady(function () {
  Ext.define('Heading',{
    extend: 'Ext.Component',
    cls: 'heading', 
    height: 60, 
    width: 600,
    tpl: '{name} is {age} years old and lives in {location}', 
    data: { 
        age: 26, 
        location: 'Italy', 
        name: 'Mario' 
    } 
  });
  Ext.create('Heading', {renderTo: 'output', data : {age: 33, location: 'Jalgaon', name: 'Tousif Khan'}});
});