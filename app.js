// CGI Tartu
let mymap = L.map('mapid').setView([58.365, 26.7413], 12);

// Array for all the markers on the map
let markers = [];

// Some other tile providers, eg MapBox, require an access token
L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

/**
 * Function for filling in the coordinates
@param e - event information, useful for getting latitude and longitude
 */
function onMapClick(e) {
    document.getElementById("latitude").value = e.latlng.lat;
    document.getElementById("longitude").value = e.latlng.lng;
    document.getElementById("date").value = new Date().toISOString().slice(0, 10);
}
mymap.on('click', onMapClick);

/**
 * Function for finding the location when user inserts latitude and longitude
@param date - input date
@param option - for switching the format, avoiding writing 3 similar functions 
@return - time in one of 3 formats: hh:mm:ss, hh'h' mm'm' ss's' or decimal number of hours
 */
function dateTime (date, option=1){
    let hh = String(date.getHours()+date.getTimezoneOffset()/60).padStart(2, "0");
    let mm = String(date.getMinutes()).padStart(2, "0");
    let ss = String(date.getSeconds()).padStart(2, "0");
    if (option==1){
        return hh + ":" + mm + ":" + ss
    } else if (option==2) {
        return hh + "h " + mm + "m " + ss + "s"
    } else {
        return Number(hh) + Number(mm/60) + Number(ss/3600)
    }
}

/**
 * Function for finding the location when user inserts latitude and longitude
 * Retains Zoom value
 * Also adds a mark
 */
function mapFind() {
    mymap.setView([document.getElementById("latitude").value, document.getElementById("longitude").value], mymap.getZoom())
    solarCalc()
    mapMark()
}

/** 
 *  Function for adding marks on the map
 */
function mapMark() {
    let marker = L.marker([document.getElementById("latitude").value, document.getElementById("longitude").value]).addTo(mymap)
    marker.bindPopup("Latitude: " + Number(document.getElementById("latitude").value).toFixed(4) + "<br>Longitude: "+ Number(document.getElementById("longitude").value).toFixed(4)).openPopup();
    markers.push(marker);
}

/** 
 *  Function for calculating and displaying sunrise, sunset and length of the day
 */
function solarCalc() {
    let times = SunCalc.getTimes(new Date(document.getElementById("date").value), document.getElementById("latitude").value, document.getElementById("longitude").value);
    document.getElementById('sunrise').innerHTML = dateTime(times.sunrise) + " UTC";
    document.getElementById('sunset').innerHTML = dateTime(times.sunset) + " UTC";
    let daylength = dateTime(new Date(Math.abs(times.sunset-times.sunrise)+times.sunset.getTimezoneOffset()/60),2);
    document.getElementById('daylength').innerHTML = daylength;
}

/** 
* Removes values from most of the imput fields, except time range for the graph
*/
function clearValues() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].remove();
    }
    document.getElementById('sunrise').innerHTML = '';
    document.getElementById('sunset').innerHTML = '';
    document.getElementById("daylength").innerHTML = '';
    document.getElementById("latitude").value = '';
    document.getElementById("longitude").value = '';
    document.getElementById("date").value = new Date().toISOString().slice(0, 10);
}


/** 
* Returns a date array between start and end date, both included
* Written by stack overlow user enesn 
* https://stackoverflow.com/a/50398144
* @param start - first date
* @param end - end date
* @return array of dates
*/
function dates(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

/** 
* Calculates length of every day for inserted coordinates given date array
* @param dates - range of dates in a form of array
* @return array with the same length as input holding day lenth values
*/
function daylengths(dates) {
    let dl = []
    for (var i = 0; i < dates.length; i++) {
        let times = SunCalc.getTimes(dates[i], document.getElementById("latitude").value, document.getElementById("longitude").value);
        dl.push(dateTime(new Date(Math.abs(times.sunset-times.sunrise)+times.sunset.getTimezoneOffset()/60),3).toFixed(2))
    }
    return dl;
};


/** 
* Change date format for prettier labels
* @param dates - range of dates in a form of array
* @return array of dates with a different format, yyyy-mm-dd
*/
function labels(dates){
    let labels = []
    for (var i = 0; i < dates.length; i++) {
        labels.push(dates[i].toISOString().slice(0, 10))
    }
    return labels;
}


/** 
* Draws a graph based on the values in the input fields
*/
function showGraph(){
    let range = dates(new Date(document.getElementById("dateFirst").value), new Date(document.getElementById("dateLast").value));
    let lbls = labels(range);
    let dls = daylengths(range);
    if(window.myChart instanceof Chart){window.myChart.destroy();}
    let ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lbls,
      datasets: [{ 
          data: dls,
          label: "Latitude: " + Number(document.getElementById("latitude").value).toFixed(3) + " Longitude: " + Number(document.getElementById("longitude").value).toFixed(3),
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });
}