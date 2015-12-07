//Allow moment.js for formatting with the datetimepicker component (instead of the build in default)

//Remember to remove code in datetimepicker.js under 'Parse and Format Library' when upgrading

//http://xdsoft.net/jqplugins/datetimepicker/

Date.parseDate = function( input, format ){
  return moment(input,format).toDate();
};

Date.prototype.dateFormat = function( format ){
  return moment(this).format(format);
};
