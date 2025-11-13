import NewsCard from "./NewsCard";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured?: boolean;
}

interface NewsGridProps {
  title: string;
  subtitle?: string;
  news: NewsItem[];
  id?: string;
}

const NewsGrid = ({ title, subtitle, news, id }: NewsGridProps) => {
  return (
    <section id={id} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              category={item.category}
              title={item.title}
              excerpt={item.excerpt}
              image={item.image}
              date={item.date}
              featured={item.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
