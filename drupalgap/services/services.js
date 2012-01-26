var drupalgap_services_resource_call_result; 
/*
 * 	{
 * 		"resource_path":"system/connect.json",
 * 		"type":"post",
 * 		"dataType":"json",
 * 	}
 */
function drupalgap_services_resource_call (options) {
	try {
		
		if (!options.resource_path) {
			console.log("drupalgap_services_resource_call - no resource_path provided");
			return false;
		}
		
		// set default values for options if non were provided
		if (!options.type) { options.type = "post"; }
		if (!options.data) { options.data = ""; }
		if (!options.dataType) { options.dataType = "json"; }
		
		// build url path to service call
		var service_resource_call_url = drupalgap_settings.services_endpoint_default + "/" + options.resource_path;
		
		// clear previous service call result stored in global var
		drupalgap_services_resource_call_result = null;
		
		// make the service call...
		console.log(service_resource_call_url);
	    $.ajax({
		      url: service_resource_call_url,
		      type: options.type,
		      data: options.data,
		      dataType: options.dataType,
		      async: false,
		      error: function (jqXHR, textStatus, errorThrown) {
	    			drupalgap_services_resource_call_result = {
	    				"jqXHR":jqXHR,
	    				"textStatus":textStatus,
	    				"errorThrown":errorThrown,
	    		};
		      },
		      success: function (data) {
		    	  drupalgap_services_resource_call_result = data;
		      }
	    });
	    console.log(JSON.stringify(drupalgap_services_resource_call_result));
	}
	catch (error) {
		console.log("drupalgap_services_resource_call - " + error);
	}
	return drupalgap_services_resource_call_result;
}