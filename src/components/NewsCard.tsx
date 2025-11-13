import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  id?: number;
  slug?: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured?: boolean;
  className?: string;
  fullHeight?: boolean;
  imageClassName?: string;
  compact?: boolean;
}

const NewsCard = ({ id, slug, category, title, excerpt, image, date, featured = false, className, fullHeight = false, imageClassName, compact = false }: NewsCardProps) => {
  const imageWrapperBase = featured ? "aspect-[16/9] md:aspect-[5/3]" : "aspect-[16/9]";
  const imageWrapper = imageClassName ? imageClassName : fullHeight ? "flex-1 min-h-[140px]" : imageWrapperBase;

  const cardContent = (
    <Card className={cn("overflow-hidden hover-tilt cursor-pointer group h-full flex flex-col", className)}>
      <figure className={cn("relative w-full overflow-hidden", imageWrapper)}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 text-white text-[10px] font-semibold uppercase tracking-wide bg-[#b32b2b]">
            {category}
          </span>
        </div>
      </figure>
      <CardContent className={cn(compact ? "p-3" : "p-4 md:p-5")}
      >
        <time className="text-xs text-muted-foreground font-medium">{date}</time>
        <h3 className={cn(
          "font-bold text-foreground mt-2 mb-2 group-hover:text-[#b32b2b] transition-colors",
          compact ? "text-base md:text-lg" : featured ? "text-2xl md:text-3xl" : "text-xl",
        )}>
          {title}
        </h3>
        {!compact && (
          <p className="text-muted-foreground mb-3 line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="flex items-center text-[#b32b2b] font-semibold text-sm group-hover:gap-2 transition-all">
          Leia mais
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );

  if (slug) {
    return (
      <Link
        href={`/materia/${slug}`}
        className="block h-full w-full"
      >
        {cardContent}
      </Link>
    );
  }

  if (id) {
    return (
      <Link
        href={`/materia/${id}`}
        className="block h-full w-full"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default NewsCard;
