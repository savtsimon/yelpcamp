const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 120) + 10;
    const camp = new Campground({
      author: "614b9fece054e3311dda91b8",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {type: "Point", coordinates: [cities[random1000].longitude, cities[random1000].latitude]},
      images: [
        {
          url: "https://res.cloudinary.com/drlvx0bdr/image/upload/v1632867397/YelpCamp/p2rn0yudo6ejrjov5v73.jpg",
          filename: "YelpCamp/p2rn0yudo6ejrjov5v73",
        },
        {
          url: "https://res.cloudinary.com/drlvx0bdr/image/upload/v1632867397/YelpCamp/eh1ouvuadkbocvmdlcgw.jpg",
          filename: "YelpCamp/eh1ouvuadkbocvmdlcgw",
        },
        {
          url: "https://res.cloudinary.com/drlvx0bdr/image/upload/v1632867397/YelpCamp/ltxvruvh3musyr3resgm.jpg",
          filename: "YelpCamp/ltxvruvh3musyr3resgm",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quas sint, non fuga dolore doloribus ducimus et, quae maiores neque, animi deleniti! Perferendis voluptas itaque expedita iure odio, repellendus et.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
