// removeTestimonial.js
import { removeTestimonial } from "@/components/comments/commentsCRUD";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    const { _id } = req.query; // Captura o _id da URL
    try {
      removeTestimonial(_id);
      res.status(200).json({ message: "Testimonial removed successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove testimonial.", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
