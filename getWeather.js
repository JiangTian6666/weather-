
var logoArr = ["\ue70c","\ue70c","\ue70c","\ue70c","\ue6f1",
 			"\ue6f1","\ue6f1","\ue6f1","\ue6f1","\ue6f4",
			"\ue70a","\ue6f5","\ue6f5","\ue6f3","\ue709",
			"\ue6eb","\ue6ef","\ue6ec","\ue6fb","\ue6ed",
			"\ue6ed","\ue700","\ue704","\ue6f2","\ue706",
			"\ue703","\ue6fa","\ue6f9","\ue6f9","\ue6fd",
			"\ue6fc","\ue705","\ue705","\ue645","\ue644",
			"\ue6aa","\ue613","\ue613","\ue684","\ue651",
			"\ue6fe"]
var hours,minutes,seconds;
$.ajax({
	url:"//weixin.jirengu.com/weather",
	type:"get"
}).done(function(result){
	 if (result.status==="OK") {
	 	countDown();
		fill(result.weather);
	}else{
		$("#city").text("城市获取失败");
		console.log("api的后台又挂了")
	}
}).fail(function(jqXHR, textStatus){

  	console.log(textStatus)
});


function fill(data){
	var city_name = data[0].city_name;
	var temperature = data[0].now.temperature+"°";
	var logo = data[0].now.code;
	var	quality = data[0].now.air_quality.city.quality;
	var wind_direction =  data[0].now.wind_direction;
 	$("#city").text(city_name)
 	$("#region").text(city_name+",中国")
 	$("#temperature_num").text(temperature);
 	$("#wealogo").text(logoArr[logo])
 	$("#wealogo+p").text(wind_direction+"风/"+quality)
	$("#week>li>ul").each(function(index){
 		var max = data[0].future[index+1].code1;
 		var low = data[0].future[index+1].low;
 		var high = data[0].future[index+1].high;
 		var day =  data[0].future[index+1].day;
 		$(this).find(".state").text(logoArr[max]);
 		$(this).find(".day").text(day);
 		$(this).find(".extent").text(low+"°~"+high+"°")
 	})
}
function countDown(){
	var day = ["日","一","二","三","四","五","六"]
	var date = new Date();
	var day = day[date.getDay()]
	hours = parseInt(date.getHours());
	minutes = parseInt(date.getMinutes());
	seconds = parseInt(date.getSeconds())
	$("#day").text("MonDay 周"+day)
 	make(hours,minutes,seconds)
	setInterval(function(){
					 ++seconds;
				 	 if (seconds === 60){
				 	 	seconds = 0;
				 	 	++minutes;
				 	 	if (minutes === 60) {
				 	 		minutes = 0;
				 	 		++hours;
				 	 		if (hours === 24) {
				 	 			hours = 0;
				 	 		}
				 	 	}
				 	 	make(hours,minutes,seconds);
				 	 }
				 	 make(hours,minutes,seconds);
				}
,1000)}
function make(){
	for(var i = 0; i < arguments.length; i++){
		if(arguments[i]<10){
			arguments[i]="0"+arguments[i];
		}
	}
	$("#time").text(arguments[0]+":"+arguments[1]+":"+arguments[2]);
}