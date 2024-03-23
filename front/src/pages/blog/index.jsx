import BlogComponent from "@/components/ blog/BlogComponent";
import TheBlogTextsComponet from "@/components/ blog/TheBlogTextsComponent";
import CarouselComponent from "@/components/CarouselBanner";

function Blog() {

  const images = [
    '/blogBanner1.png', 
    '/blogBanner2.png', 
    '/blogBanner3.png', 
    '/blogBanner5.png', 
    '/blogBanner4.png'
  ];
  return (
    <div>
      <CarouselComponent 
        titleh1="Blog" 
        textp="Leia meus textos" 
        images={images} 
      />
      <TheBlogTextsComponet />
      <BlogComponent />
    </div>
  );
}

export default Blog;