mapboxgl.accessToken =
  "pk.eyJ1Ijoic2F2c2ltb24iLCJhIjoiY2t1NjZ3eXRjMnl2NTJ1dGhwaWp4anhiZSJ9.cgT88lmCX_CgMEdvRFxXSg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: campground.geometry.coordinates,
  zoom: 8,
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
  )
  .addTo(map);
