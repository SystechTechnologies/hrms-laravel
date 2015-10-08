Ext.define('SysTech.view.Heading', {
  extend: 'Ext.Component',
  alias : 'widget.heading',
  width : 610,
  cls   : 'heading', 
  height: 60, 
  tpl   : '{text}', 
  data  : { text: ''} 
});