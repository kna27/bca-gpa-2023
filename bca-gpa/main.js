function extractLetterGrade(str){
	var s = "";
	for(var i = 0; i < str.length; i++){
		if(!(str[i] >= '0' && str[i] <= '9')) s += str[i];
		else return s;
	}
	if(s == "--" || s == "[ i ]") return "N";
	return s;
}

function modsPerWeek(str){
	if(str.substring(0, 5) == "25-27" || str == "04-09(W)") return 2;
	var mods = 0;
	
	var d = {};
	d['M'] = 0; d['T'] = 1; d['W'] = 2; d['R'] = 3; d['F'] = 4;

	var mod = new Array(5);
	for(var i = 0; i < 5; i++){
		mod[i] = new Array(3);
		for(var j = 0; j < 3; j++){
			mod[i][j] = 0;
		}
	}
	var t = str.split(" ");

	var e = Math.min(str.indexOf("-"), str.indexOf('('));
	var startMod = parseInt(str.substring(0, e));

	for(var i = 0; i < t.length; i++){
		var b2 = t[i].indexOf("(");
		var b1 = t[i].substring(0, b2).indexOf("-");
		var b3 = t[i].indexOf(")");

		var s, e;
		if(b1 == -1){
			s = parseInt(t[i].substring(0, b2));
			e = s;
		}
		else{
			s = parseInt(t[i].substring(0, b1));
			e = parseInt(t[i].substring(b1 + 1, b2));
		}

		var parts = t[i].substring(b2 + 1, b3).split(",");

		for(var j = 0; j < parts.length; j++){
			var bb = parts[j].indexOf("-");
			var sd = d[parts[j][0]], ed;
			if(bb == -1) ed = sd;
			else ed = d[parts[j][2]];

			for(var day = sd; day <= ed; day++){
				for(var k = s; k <= e; k++){

					mod[day][k - startMod] = 1;
				}
			}
		}
	}
	for(var i = 0; i < 5; i++){
		for(var j = 0; j < 3; j++){
			mods += mod[i][j];
		}
	}
	return mods;
}

function classData(){
	src = document.documentElement.outerHTML;
	var classes = document.querySelectorAll('tr[id^="ccid"]');

	var data = []

	for(var i = 0; i < classes.length; i++){
		var name = classes.item(i).querySelector('td[align="left"]');
		name = name.textContent;
		if(name[0] == '~') continue; //Not included in GPA

		var info = classes.item(i).querySelectorAll('td');
		var grades = ["N", "N", "N", "N", 0];

		var hours = info.item(0).textContent;
		grades[4] = modsPerWeek(hours);


		for(var j = 0; j < info.length; j++){
			var elt = info.item(j);
			var elta = elt.querySelector('a');
			if(elta == null) continue;
			var href = elta.href;
			if(href.substring(href.length - 14, href.length - 12) == "T1"){
				grades[0] = extractLetterGrade(elta.textContent);
			}
			if(href.substring(href.length - 14, href.length - 12) == "T2"){
				grades[1] = extractLetterGrade(elta.textContent);
			}
			if(href.substring(href.length - 14, href.length - 12) == "T3"){
				grades[2] = extractLetterGrade(elta.textContent);
			}
			if(href.substring(href.length - 14, href.length - 12) == "Y1"){
				grades[3] = extractLetterGrade(elta.textContent);
			}
		}
		data.push(grades);
	}
	return data;
}

var data = classData();
var pts = {};
pts["A"]  =	4.000;
pts["A-"] = 3.800;
pts["B+"] = 3.300;
pts["B"]  =	3.000;
pts["B-"] = 2.800;
pts["C+"] = 2.300;
pts["C"]  = 2.000;
pts["C-"] = 1.800;
pts["D+"] = 1.300;
pts["D"]  = 1.100;
pts["F"]  = 0.000;
var GPA = new Array(4);
var keys = ["Trimester 1", "Trimester 2", "Trimester 3", "Year GPA"];
for(var i = 0; i < 4; i++){ //Each trimester and final GPA
	var totPts = 0;
	var totMods = 0;
	for(var j = 0; j < data.length; j++){
		var entry = data[j];
		if(entry[i] == "N") continue;
		totPts += pts[entry[i]] * entry[4] / 2;
		totMods += entry[4];
	}
	totMods /= 2;
	var gpa = totPts / totMods;
	GPA[i] = (Math.round(gpa * 1000) / 1000).toFixed(3);
	if(GPA[i] == 'NaN') GPA[i] = 'N/A';
}

var gpabox = document.createElement("h2");
var gpasrc = "<table cellspacing='0' style='width:50%;'>\
<tr><td>Trimester 1</td><td>" + GPA[0] + "</td></tr>\
<tr><td>Trimester 2</td><td>" + GPA[1] + "</td></tr>\
<tr><td>Trimester 3</td><td>" + GPA[2] + "</td></tr>\
<tr><td>Year GPA</td><td>" + GPA[3] + "</td></tr></table>"
gpabox.innerHTML = gpasrc;

var contentArea = document.getElementById("content-main");
var box = contentArea.querySelector("h1");
contentArea.insertBefore(box.cloneNode(true), box);
contentArea.replaceChild(gpabox, box);