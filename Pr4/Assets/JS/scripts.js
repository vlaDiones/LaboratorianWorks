
let watchId = null;
let map = null;
let userMarker = null;
let destMarker = null;

const ourCoords = {
    latitude: 48.9226,
    longitude: 24.7111
};

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
    
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);

        const watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;

        const clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
        
        document.getElementById("scrollToDest").onclick = scrollMapToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let accuracy = position.coords.accuracy;

    let div = document.getElementById("location");
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude} (with ${accuracy} meters accuracy)`;

    let km = computeDistance(position.coords, ourCoords);
    let distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = `You are ${km.toFixed(2)} km from the College`;

    showOnMap(latitude, longitude);
}

function watchLocation() {
    if (watchId === null) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
        console.log("Watch started");
    }
}

function clearWatch() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        console.log("Watch cleared");
    }
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);

    let Radius = 6371;
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                   Math.cos(startLatRads) * Math.cos(destLatRads) *
                   Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    document.getElementById("location").innerHTML = errorMessage;
}


function showOnMap(lat, lng) {
    if (map === null) {
        map = L.map('map').setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    }

    if (userMarker) {
        userMarker.setLatLng([lat, lng]);
    } else {
        userMarker = L.marker([lat, lng]).addTo(map);
    }
    
    let time = new Date().toLocaleTimeString();
    userMarker.bindPopup(`<b>Ви тут!</b><br>Координати: ${lat.toFixed(4)}, ${lng.toFixed(4)}<br>Час: ${time}`).openPopup();
}

function scrollMapToDestination() {
    let lat = parseFloat(document.getElementById("destLat").value);
    let lng = parseFloat(document.getElementById("destLong").value);

    if (!isNaN(lat) && !isNaN(lng)) {
        map.flyTo([lat, lng], 15); 
        
        if (destMarker) {
            destMarker.setLatLng([lat, lng]);
        } else {
            destMarker = L.marker([lat, lng], {icon: L.icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41]})}).addTo(map);
        }
        destMarker.bindPopup("Пункт призначення").openPopup();
    } else {
        alert("Введіть коректні координати!");
    }
}