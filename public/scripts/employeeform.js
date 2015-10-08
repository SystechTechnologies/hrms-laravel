Ext.Loader.setConfig({enabled : true});
//Ext.require('employeeform');
Ext.onReady(function () {
	Ext.widget('panel', {
		border: false,
		width: 300,
		html: 'Panel without border',
		bodyStyle: {
			'padding': '20px',
			'color': '#24637B',
			'background-color': '#C8EDFB'
		},
		renderTo: 'output'
	});
});