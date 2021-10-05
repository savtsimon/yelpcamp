const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    price: Number,
    description: String,
    location: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  opts
);

CampgroundSchema.virtual("properties.popupMarkup").get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong><p>$${this.price} per night</p>`;
});

CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    const res = await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Campground = mongoose.model("Campground", CampgroundSchema);
module.exports = Campground;
