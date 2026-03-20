import React, { useState, useEffect, useRef } from 'react';
import { BLOG_POSTS } from '../data.ts';
import { Link } from 'react-router-dom';
import { 
  db, 
  collection, 
  getDocs, 
  query, 
  orderBy 
} from '../firebase.ts';

const createSlug = (text: string) => text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startAutoSlide = () => {
      if (window.innerWidth < 768) {
        interval = setInterval(() => {
          if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            // gap-6 is 24px
            if (scrollLeft + clientWidth >= scrollWidth - 24) {
              scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
              scrollRef.current.scrollBy({ left: clientWidth + 24, behavior: 'smooth' });
            }
          }
        }, 4000);
      }
    };

    startAutoSlide();

    return () => clearInterval(interval);
  }, [posts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -(clientWidth + 24) : (clientWidth + 24), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedBlogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        
        // Merge with constants for initial variety, but dynamic content comes first
        const combined = [...fetchedBlogs, ...BLOG_POSTS];
        // Remove duplicates if any (based on title)
        const unique = combined.reduce((acc: any[], current) => {
          const x = acc.find(item => item.title === current.title);
          if (!x) return acc.concat([current]);
          else return acc;
        }, []);

        setPosts(unique);
      } catch (error) {
        console.error("Firestore fetch error:", error);
        setPosts(BLOG_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-12 bg-gray-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">Educational <span className="text-brand-gold">Insights</span></h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Stay updated with the latest news and guides on international medical education and global admissions.
          </p>
          <Link 
            to="/blog-list"
            className="inline-block px-8 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-brand-blue dark:text-brand-gold font-bold text-xs uppercase tracking-widest hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Read All Articles
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative">
            <div ref={scrollRef} className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {posts.slice(0, 3).map((post: any) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${createSlug(post.category || 'General')}/${createSlug(post.title)}`}
                  className="group bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all w-full md:w-auto snap-center shrink-0"
                >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.img} 
                    alt={post.imgAlt || post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                </div>
                <div className="p-8">
                  <div className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-3">{post.category || 'Admissions'}</div>
                  <h3 className="text-lg font-bold text-brand-blue dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-brand-gold transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-[11px] font-bold">
                    <i className="fa-solid fa-calendar-day mr-2 opacity-50"></i>
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Mobile Navigation Arrows */}
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-14 rounded-2xl bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-center text-white md:hidden z-10 active:scale-95 transition-transform"
            aria-label="Previous post"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-14 rounded-2xl bg-white/30 backdrop-blur-md shadow-sm flex items-center justify-center text-white md:hidden z-10 active:scale-95 transition-transform"
            aria-label="Next post"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
