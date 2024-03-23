import { readTestimonials } from "@/components/comments/commentsCRUD";

export default function handler(req, res) {
  const testimonials = readTestimonials();
  res.status(200).json(testimonials);
}
