// ==UserScript==
// @name        BCA GPA
// @description GPA Calculator for BCA
// @match       https://bcts.powerschool.com/*
// ==/UserScript==

if (document.URL.split("?")[0] === "https://bcts.powerschool.com/guardian/home.html") {
    /**
     *
     * @param {String} str Content of grade table cell
     * @returns {String} Letter grade
     * @example extractLetterGrade("A95") // "A"
     */
    function extractLetterGrade(str) {
        var s = "";
        for (var i = 0; i < str.length; i++) {
            if (!(str[i] >= "0" && str[i] <= "9")) s += str[i];
            else return s;
        }
        if (s == "--" || s == "[ i ]") return "N";
        return s;
    }

    /**
     *
     * @param {String} str Content of exp table cell
     * @returns {Number} Number of mods per week
     * @todo Rewrite to use periods instead of mods
     * @example modsPerWeek("2(M-T,R-F)") // 4
     */
    function modsPerWeek(str) {
        console.log(str);
        if (str.substring(0, 5) == "25-27" || str == "04-09(W)") return 2;
        var mods = 0;

        var d = {};
        d["M"] = 0;
        d["T"] = 1;
        d["W"] = 2;
        d["R"] = 3;
        d["F"] = 4;

        var mod = new Array(5);
        for (var i = 0; i < 5; i++) {
            mod[i] = new Array(3);
            for (var j = 0; j < 3; j++) {
                mod[i][j] = 0;
            }
        }
        var t = str.split(" ");

        var e = Math.min(str.indexOf("-"), str.indexOf("("));
        var startMod = parseInt(str.substring(0, e));

        for (var i = 0; i < t.length; i++) {
            var b2 = t[i].indexOf("(");
            var b1 = t[i].substring(0, b2).indexOf("-");
            var b3 = t[i].indexOf(")");

            var s, e;
            if (b1 == -1) {
                s = parseInt(t[i].substring(0, b2));
                e = s;
            } else {
                s = parseInt(t[i].substring(0, b1));
                e = parseInt(t[i].substring(b1 + 1, b2));
            }

            var parts = t[i].substring(b2 + 1, b3).split(",");

            for (var j = 0; j < parts.length; j++) {
                var bb = parts[j].indexOf("-");
                var sd = d[parts[j][0]],
                    ed;
                if (bb == -1) ed = sd;
                else ed = d[parts[j][2]];

                for (var day = sd; day <= ed; day++) {
                    for (var k = s; k <= e; k++) {
                        mod[day][k - startMod] = 1;
                    }
                }
            }
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                mods += mod[i][j];
            }
        }
        return mods;
    }

    function classData() {
        src = document.documentElement.outerHTML;
        var classes = document.querySelectorAll('tr[id^="ccid"]');

        var data = [];

        for (var i = 0; i < classes.length; i++) {
            var name = classes.item(i).querySelector('td[class="table-element-text-align-start"]');
            name = name.textContent;
            if (name[0] == "~") continue; // Not included in GPA

            var info = classes.item(i).querySelectorAll("td");
            var grades = ["N", "N", "N", "N", 0];

            var hours = info.item(0).textContent;
            grades[4] = modsPerWeek(hours);

            for (var j = 0; j < info.length; j++) {
                var elta = info.item(j).querySelector("a");
                if (elta == null) continue;
                let href = elta.href.substring(elta.href.length - 14, elta.href.length - 12);
                grades[["T1", "T2", "T3", "Y1"].indexOf(href)] = extractLetterGrade(elta.textContent);
            }
            data.push(grades);
        }
        return data;
    }

    var data = classData();
    var pts = {
        "A": 4.0,
        "P": 4.0,
        "A-": 3.8,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.8,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.8,
        "D+": 1.3,
        "D": 1.1,
        "F": 0.0
    };
    var GPA = new Array(4);
    var keys = ["Trimester 1", "Trimester 2", "Trimester 3", "Year GPA"];
    for (var i = 0; i < 4; i++) {
        // Each trimester and final GPA
        var totPts = 0;
        var totMods = 0;
        for (var j = 0; j < data.length; j++) {
            var entry = data[j];
            if (entry[i] == "N") continue;
            totPts += (pts[entry[i]] * entry[4]) / 2;
            totMods += entry[4];
        }
        totMods /= 2;
        var gpa = totPts / totMods;
        GPA[i] = (Math.round(gpa * 1000) / 1000).toFixed(3);
        if (GPA[i] == "NaN") GPA[i] = "N/A";
    }

    var gpabox = document.createElement("h2");
    gpabox.innerHTML = `
<table cellspacing='0' style='width:50%;'>
${keys.map((key, i) => `<tr><td>${key}</td><td>${GPA[i]}</td></tr>`).join("")}
</table>`;

    var contentArea = document.getElementById("content-main");
    var box = contentArea.querySelector("h1");
    contentArea.insertBefore(box.cloneNode(true), box);
    contentArea.replaceChild(gpabox, box);
}
