function findCluster(job_title){
	var clusters_dict={
		"Agriculture, Food, and Natural Resources":0,
		"Architecture and Construction": 1,
		"Art, Audio/Video Technology, and Communications": 2,
		"Buisness, Management, and Administration": 3,
		"Education and Training": 4, 
		"Finance": 5,
		"Government and Public Administration": 6,
		"Health Services": 7,
		"Hospitality and Tourism": 8,
		"Human Services": 9,
		"Information Technology": 10,
		"Law, Public Safety, Corrections, and Security": 11,
		"Manufacturing": 12, 
		"Marketing, Sales, and Service":13,
		"Science, Technology, Engineering, and Mathematics": 14,
		"Transportation, Distribution, and Logistics": 15
	}
	job_title = job_title.toLowerCase();
	if ((job_title.indexOf("fire") != -1) ||
		(job_title.indexOf("police") != -1) || 
		(job_title.indexOf("principal inspector") != -1) || 
		(job_title.indexOf("chief inspector") != -1) || 
		(job_title.indexOf("assistant inspector") != -1) || 
		(job_title.indexOf("deputy") != -1) || 
		(job_title.indexOf("sherif") != -1) ||
		(job_title.indexOf("probation") != -1) ||
		(job_title.indexOf("sergeant") != -1) ||
		(job_title.indexOf("court") != -1) ||
		(job_title.indexOf("legal") != -1) ||
		(job_title.indexOf("attorney") != -1) ||
		(job_title.indexOf("security") != -1) ||
		(job_title.indexOf("investigator") != -1) ||
		(job_title.indexOf("criminalist") != -1)||
		(job_title.indexOf("detention") != -1)||
		(job_title.indexOf("crime") != -1) ||
		(job_title.indexOf("inspector general") != -1)||
		(job_title.indexOf("forensic") != -1)||
		(job_title.indexOf("polygraph") != -1)||
		(job_title.indexOf("witness service") != -1)||
		(job_title.indexOf("hearing officer") != -1)||
		(job_title.indexOf("correction") != -1)||
		(job_title.indexOf("fingerprint") != -1)){
 		return clusters_dict["Law, Public Safety, Corrections, and Security"];
 	}
 	else if ((job_title.indexOf("mta") != -1) ||
		(job_title.indexOf("transit") != -1) ||
		(job_title.indexOf("airport") != -1) ||
		(job_title.indexOf("parking") != -1) ||
		(job_title.indexOf("mechanic") != -1) ||
		(job_title.indexOf("automotive") != -1) ||
		(job_title.indexOf("warehouse") != -1) ||
		(job_title.indexOf("truck") != -1)||
		(job_title.indexOf("trucj") != -1) ||
		(job_title.indexOf("delivery driver") != -1) ||
		(job_title.indexOf("traffic officer") != -1) ||
		(job_title.indexOf("automobile") != -1) ||
		(job_title.indexOf("garage") != -1) ||
		(job_title.indexOf("bus") != -1) ||
		(job_title.indexOf("equipment") != -1) ||
		(job_title.indexOf("pilot") != -1) ||
		(job_title.indexOf("drive") != -1) ||
		(job_title.indexOf("dispatch") != -1) ||
		(job_title.indexOf("deck") != -1) ||
		(job_title.indexOf("street service") != -1)||
		(job_title.indexOf("aviation") != -1)||
		(job_title.indexOf("avionic") != -1)||
		(job_title.indexOf("traffic") != -1)||
		(job_title.indexOf("wharf") != -1)||
		(job_title.indexOf("transport") != -1)||
		(job_title.indexOf("port warden") != -1)||
		(job_title.indexOf("captain") != -1)||
		(job_title.indexOf("distribut") != -1) ){
		return clusters_dict["Transportation, Distribution, and Logistics"];
	}
	else if ((job_title.indexOf("anesth") != -1) ||
		(job_title.indexOf("medical") != -1) ||
		(job_title.indexOf("nurs") != -1) ||
		(job_title.indexOf("health") != -1) ||
		(job_title.indexOf("hygienist") != -1) ||
		(job_title.indexOf("radiolog") != -1) ||
		(job_title.indexOf("nutrition") != -1) ||
		(job_title.indexOf("physician") != -1) ||
		(job_title.indexOf("orthopedic") != -1)||
		(job_title.indexOf("pharm") != -1) ||
		(job_title.indexOf("vet") != -1)||
		(job_title.indexOf("animal care technician") != -1)){
		return clusters_dict["Health Services"];
	}
	else if ((job_title.indexOf("architect") != -1)||
		(job_title.indexOf("drafting") != -1)||
		(job_title.indexOf("public works") != -1)||
		(job_title.indexOf("general laborer") != -1) ||
		(job_title.indexOf("construction") != -1) ||
		(job_title.indexOf("carpenter") != -1)||
		(job_title.indexOf("improvement assessor") != -1)||
		(job_title.indexOf("floor finisher") != -1)||
		(job_title.indexOf("tile ") != -1)||
		(job_title.indexOf("upholster") != -1)||
		(job_title.indexOf("carpet") != -1)||
		(job_title.indexOf("protective coating") != -1)||
		(job_title.indexOf("asbestos") != -1)||
		(job_title.indexOf("carpentry") != -1)||
		(job_title.indexOf("cabinet") != -1)||
		(job_title.indexOf("city plan") != -1)||
		(job_title.indexOf("plumb") != -1)||
		(job_title.indexOf("plaster") != -1)||
		(job_title.indexOf("roof") != -1)||
		(job_title.indexOf("lock") != -1)||
		(job_title.indexOf("carto") != -1)||
		(job_title.indexOf("land survey") != -1) ||
		(job_title.indexOf("survey") != -1) ||
		(job_title.indexOf("survey supervisor") != -1)||
		(job_title.indexOf("pipefitter") != -1)||
		(job_title.indexOf("apparatus operator") != -1)){
		return clusters_dict["Architecture and Construction"];
	}
	else if ((job_title.indexOf("mayor") != -1) ||
		(job_title.indexOf("tax") != -1) ||
		(job_title.indexOf("council") != -1)||
		(job_title.indexOf("emergency preparedness coordinator") != -1)||
		(job_title.indexOf("auditor") != -1) ||
		(job_title.indexOf("election") != -1)||
		(job_title.indexOf("legislative") != -1)||
		(job_title.indexOf("refuse crew field") != -1)||
		(job_title.indexOf("property officer") != -1)||
		(job_title.indexOf("meter reader") != -1) ){
		return clusters_dict["Government and Public Administration"];
	}
	else if ((job_title.indexOf("librar") != -1)||
		(job_title.indexOf("vocational worker") != -1)||
		(job_title.indexOf("museum") != -1) ||
		(job_title.indexOf("curator") != -1) ||
		(job_title.indexOf("curator") != -1) ||
		(job_title.indexOf("educat") != -1) || 
		(job_title.indexOf("lecturer") != -1) || 
		(job_title.indexOf("exhibit") != -1)){
		return clusters_dict["Education and Training"];
	}
	else if ((job_title.indexOf("custodia") != -1)||
		(job_title.indexOf("customer service") != -1)||
		(job_title.indexOf("student worker") != -1)||
		(job_title.indexOf("student professional worker") != -1)||
		(job_title.indexOf("recreation") != -1) ||
		(job_title.indexOf("park") != -1) ||
		(job_title.indexOf("personnel") != -1)||
		(job_title.indexOf("golf") != -1)||
		(job_title.indexOf("goft") != -1) ||
		(job_title.indexOf("claims repre") != -1)||
		(job_title.indexOf("child care") != -1)||
		(job_title.indexOf("social worker") != -1) ||
		(job_title.indexOf("ethics") != -1) ||
		(job_title.indexOf("community") != -1)||
		(job_title.indexOf("volunteer") != -1)||
		(job_title.indexOf("event") != -1)||
		(job_title.indexOf("human relations") != -1)||
		(job_title.indexOf("service coordinator") != -1)||
		(job_title.indexOf("cleaner") != -1)||
		(job_title.indexOf("neighborhood empowerment analyst") != -1)||
		(job_title.indexOf("relations") != -1)||
		(job_title.indexOf("psychologist") != -1)||
		(job_title.indexOf("public relations") != -1)
		){
		return clusters_dict["Human Services"];
	}
	else if ((job_title.indexOf("engineer") != -1)||
		(job_title.indexOf("electric") != -1) ||
		(job_title.indexOf("battery") != -1) ||
		(job_title.indexOf("electronic") != -1) ||
		(job_title.indexOf("computer operator") != -1) ||
		(job_title.indexOf("systems aide") != -1) ||
		(job_title.indexOf("ergonomist") != -1) ||
		(job_title.indexOf("heating") != -1) ||
		(job_title.indexOf("materials testing technician") != -1)||
		(job_title.indexOf("chemist") != -1) ||
		(job_title.indexOf("tree surgeon") != -1)||
		(job_title.indexOf("hydrographer") != -1) ||
		(job_title.indexOf("environmental specialist") != -1)||
		(job_title.indexOf("laboratory technician") != -1)||
		(job_title.indexOf("elevator machanic") != -1)||
		(job_title.indexOf("material testing technician") != -1) ||
		(job_title.indexOf("material test technician") != -1) ||
		(job_title.indexOf("building inspector") != -1) ||
		(job_title.indexOf("housing inspector") != -1) ||
		(job_title.indexOf("systems analyst") != -1) ||
		(job_title.indexOf("environmental") != -1) ||
		(job_title.indexOf("waste water") != -1)||
		(job_title.indexOf("water treatment") != -1) ||
		(job_title.indexOf("irrigation") != -1) ||
		(job_title.indexOf("wastewater") != -1)||
		(job_title.indexOf("water service") != -1)||
		(job_title.indexOf("emvironmental") != -1)||
		(job_title.indexOf("aqueduct") != -1)||
		(job_title.indexOf("aquarist") != -1)  ||
		(job_title.indexOf("biologist") != -1)  ||
		(job_title.indexOf("air cond") != -1)  ||
		(job_title.indexOf("astro") != -1)  ||
		(job_title.indexOf("research") != -1))
	{
		return clusters_dict["Science, Technology, Engineering, and Mathematics"];
	}
	else if ((job_title.indexOf("programmer") != -1)||
		(job_title.indexOf("data processing") != -1)||
		(job_title.indexOf("data entry") != -1)||
		(job_title.indexOf("information") != -1)||
		(job_title.indexOf("archivist") != -1)||
		(job_title.indexOf("documentation technician") != -1)||
		(job_title.indexOf("data control") != -1))
	{
		return clusters_dict["Information Technology"];
	}
	else if ((job_title.indexOf("account") != -1)||
		(job_title.indexOf("financ") != -1)||
		(job_title.indexOf("fiscal") != -1)||
		(job_title.indexOf("invest") != -1)||
		(job_title.indexOf("insurance") != -1)||
		(job_title.indexOf("claims agent") != -1)||
		(job_title.indexOf("economic") != -1)){
		return clusters_dict["Finance"];
	}
	else if ((job_title.indexOf("gardener") != -1)||
		(job_title.indexOf("food serv") != -1) ||
		(job_title.indexOf("animal keeper")!= -1) ||
		(job_title.indexOf("animal control")!= -1) ||
		(job_title.indexOf("zoo")!= -1)||
		(job_title.indexOf("cook") != -1) ||
		(job_title.indexOf("agricultur") != -1) ||
		(job_title.indexOf("resource") != -1) ||
		(job_title.indexOf("equine") != -1)){
		return clusters_dict["Agriculture, Food, and Natural Resources"];
	}
	else if ((job_title.indexOf("clerk") != -1)||
		(job_title.indexOf("store") != -1) ||
		(job_title.indexOf("shop") != -1) ||
		(job_title.indexOf("sales repr") != -1) ||
		(job_title.indexOf("commercial") != -1) ||
		(job_title.indexOf("title") != -1) ||
		(job_title.indexOf("real estate") != -1) ){
		return clusters_dict["Marketing, Sales, and Service"];
	}
	else if ((job_title.indexOf("porter") != -1)){
		return clusters_dict["Hospitality and Tourism"];
	}
	else if ((job_title.indexOf("sheet metal worker")!= -1)||
		(job_title.indexOf("welder")!= -1) ||
		(job_title.indexOf("steam plant")!= -1) ||
		(job_title.indexOf("auto body")!= -1) ||
		(job_title.indexOf("cement")!= -1) ||
		(job_title.indexOf("machini")!= -1) ||
		(job_title.indexOf("utili")!= -1)||
		(job_title.indexOf("maintenance")!= -1)||
		(job_title.indexOf("repair")!= -1) ||
		(job_title.indexOf("machine operator")!= -1)||
		(job_title.indexOf("steel")!= -1)||
		(job_title.indexOf("drill")!= -1)||
		(job_title.indexOf("bindery")!= -1)||
		(job_title.indexOf("boilermaker")!= -1)||
		(job_title.indexOf("asphalt")!= -1)||
		(job_title.indexOf("sandblast")!= -1)||
		(job_title.indexOf("miner")!= -1)||
		(job_title.indexOf("power shovel")!= -1)||
		(job_title.indexOf("masonry")!= -1)||
	(job_title.indexOf("metal trades")!= -1)||
		(job_title.indexOf("mill")!= -1)||
		(job_title.indexOf("motor sweeper")!= -1)){
		return clusters_dict["Manufacturing"];
	}
	else if ((job_title.indexOf("management") != -1)||
		(job_title.indexOf("project assistant") != -1)||
		(job_title.indexOf("workers compensation") != -1)||
		(job_title.indexOf("worker compensation") != -1)||
		(job_title.indexOf("worker compensatin") != -1)||
		(job_title.indexOf("secretar") != -1)||
		(job_title.indexOf("administrat") != -1)||
		(job_title.indexOf("superintendent") != -1)||
		(job_title.indexOf("program aide") != -1) ||
		(job_title.indexOf("program assistant") != -1) ||
		(job_title.indexOf("manager") != -1)||
		(job_title.indexOf("manger") != -1)||
		(job_title.indexOf("benefits") != -1)||
		(job_title.indexOf("office trainee") != -1) ||
		(job_title.indexOf("office service") != -1) ||
		(job_title.indexOf("planning") != -1)||
		(job_title.indexOf("director") != -1)||
		(job_title.indexOf("chief of operations") != -1)||
		(job_title.indexOf("procurement analyst") != -1)||
		(job_title.indexOf("procurement aide") != -1)||
		(job_title.indexOf("project coordinator") != -1)||
		(job_title.indexOf("payroll") != -1)||
		(job_title.indexOf("executive") != -1) ||
		(job_title.indexOf("controller") != -1)||
		(job_title.indexOf("executuve") != -1) ||
		(job_title.indexOf("supervisor") != -1)){
		return clusters_dict["Buisness, Management, and Administration"];
	}
	else if ((job_title.indexOf("photographer") != -1)||
		(job_title.indexOf("communication") != -1) ||
		(job_title.indexOf("painter") != -1) ||
		(job_title.indexOf("gallery") != -1) ||
		(job_title.indexOf("art ") != -1)||
		(job_title.indexOf("arts") != -1)||
		(job_title.indexOf("printing press") != -1)||
		(job_title.indexOf("pre-press") != -1)||
		(job_title.indexOf("graphic") != -1)||
		(job_title.indexOf("video") != -1)||
		(job_title.indexOf("audio") != -1)){
		return clusters_dict["Art, Audio/Video Technology, and Communications"];
	}
	else{
		console.log(job_title);
		return "unknown";
	}

}