
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    notes: [
      {
        text: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
        },
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
