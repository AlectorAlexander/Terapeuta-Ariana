// createTestimonial.js
import { addTestimonial } from "@/components/comments/commentsCRUD";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { newTestimonial } = req.body;

    try {
      addTestimonial(newTestimonial);
      res.status(200).json({ message: "Testimonial created successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to create testimonial.", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
