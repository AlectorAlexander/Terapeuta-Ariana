// editTestimonial.js
import { editTestimonial } from "@/components/comments/commentsCRUD";

export default function handler(req, res) {
  if (req.method === "PUT") {
    const { index, updatedTestimonial } = req.body;

    try {
      editTestimonial(index, updatedTestimonial);
      res.status(200).json({ message: "Testimonial updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to update testimonial.", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
