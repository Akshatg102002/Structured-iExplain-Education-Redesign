
import React, { useState, useEffect } from 'react';
import { BLOG_POSTS, HERO_IMG_URL } from '../data.ts';
import { db, collection, getDocs, query } from '../firebase.ts';
import ContactForm from './ContactForm.tsx';
import { Link } from 'react-router-dom';

// Helper to generate slugs (duplicated to avoid circular dependency with App.tsx)
const createSlug = (text: string) => text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

interface BlogDetailPageProps {
  slug: string;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug }) => {
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      
      // 1. Try finding in Constants
      const constantPost = BLOG_POSTS.find(p => createSlug(p.title) === slug);
      if (constantPost) {
        setPost(constantPost);
        // Set related posts from constants excluding current
        setRelatedPosts(BLOG_POSTS.filter(p => createSlug(p.title) !== slug).slice(0, 4));
        setLoading(false);
        return;
      }

      // 2. Try finding in Firebase
      try {
        const q = query(collection(db, 'blogs'));
        const querySnapshot = await getDocs(q);
        const fetchedBlogs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        const firebasePost = fetchedBlogs.find(p => createSlug(p.title) === slug);
        
        if (firebasePost) {
          setPost(firebasePost);
          // Set related posts from mixed source (prefer constants for speed in this demo, or filter fetched)
          // Mixing constants and fetched for related to ensure content
          const allPosts = [...fetchedBlogs, ...BLOG_POSTS];
          // Filter out current and duplicates by title
          const others = allPosts.filter(p => createSlug(p.title) !== slug);
          const uniqueOthers = others.filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i);
          setRelatedPosts(uniqueOthers.slice(0, 4));
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-900">
        <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center px-4 animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <i className="fa-solid fa-file-circle-xmark text-4xl"></i>
        </div>
        <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-2">Article Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8 max-w-md">
          The article you are looking for does not exist or has been moved.
        </p>
        <Link 
          to="/blog-list"
          className="px-8 py-3 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 pb-20 animate-fade-in">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={post.img || HERO_IMG_URL} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = HERO_IMG_URL;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold text-white text-[10px] font-black uppercase tracking-widest mb-6">
              {post.category || 'Education'}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-sm">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/80 text-xs font-bold uppercase tracking-widest gap-6">
              {post.author && (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-user-pen text-brand-gold"></i> {post.author}
                </span>
              )}
              {post.date && (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-calendar-days text-brand-gold"></i> {post.date}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-clock text-brand-gold"></i> {post.readTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:text-brand-blue dark:prose-headings:text-white prose-headings:font-black
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:font-medium prose-p:leading-loose
                prose-a:text-brand-gold hover:prose-a:text-brand-blue
                prose-li:marker:text-brand-gold
                prose-img:rounded-2xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Share Widget */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700">
               <h4 className="font-black text-brand-blue dark:text-white text-sm uppercase tracking-widest mb-6">Share this article</h4>
               <div className="flex gap-4">
                  {['facebook-f', 'twitter', 'linkedin-in', 'whatsapp'].map(icon => (
                    <button key={icon} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-gray-500 hover:bg-brand-blue hover:text-white transition-all">
                      <i className={`fa-brands fa-${icon}`}></i>
                    </button>
                  ))}
               </div>
            </div>

            {/* Related Posts Widget (Replaced Contact Form) */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24">
               <h4 className="font-black text-brand-blue dark:text-white text-sm uppercase tracking-widest mb-6 relative">
                 Related Articles
                 <span className="absolute -bottom-2 left-0 w-10 h-0.5 bg-brand-gold"></span>
               </h4>
               <div className="space-y-6">
                  {relatedPosts.map((rPost, idx) => (
                    <Link 
                      key={idx} 
                      to={`/blog/${createSlug(rPost.category || 'General')}/${createSlug(rPost.title)}`}
                      className="group flex items-start gap-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 p-2 rounded-xl transition-colors -mx-2"
                    >
                       <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                          <img src={rPost.img} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <div>
                          <span className="text-[9px] font-black text-brand-gold uppercase tracking-wider mb-1 block">{rPost.category || 'Blog'}</span>
                          <h5 className="text-sm font-bold text-brand-blue dark:text-white leading-tight line-clamp-2 group-hover:text-brand-gold transition-colors">
                            {rPost.title}
                          </h5>
                          <span className="text-[10px] text-gray-400 font-bold mt-2 block">{rPost.date}</span>
                       </div>
                    </Link>
                  ))}
                  {relatedPosts.length === 0 && <p className="text-gray-400 text-xs">No related articles found.</p>}
               </div>
            </div>
          </div>
        </div>

        {/* Full Width Contact Section (Moved below content) */}
        <div className="mt-16 bg-gradient-to-br from-brand-blue to-blue-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] -ml-12 -mb-12 pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="text-white">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        Admissions Open 2025
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Need Expert <span className="text-brand-gold">Guidance?</span></h3>
                    <p className="text-blue-100 text-lg font-medium mb-10 leading-loose max-w-lg">
                        Don't let confusion hold you back. Our expert counselors are ready to help you choose the right university and guide you through the entire admission process, visa, and travel.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { icon: "fa-comments", text: "Free Counseling" },
                            { icon: "fa-university", text: "University Selection" },
                            { icon: "fa-passport", text: "Visa Assistance" },
                            { icon: "fa-plane-departure", text: "Travel Support" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-gold text-lg border border-white/10">
                                    <i className={`fa-solid ${item.icon}`}></i>
                                </div>
                                <span className="font-bold text-sm tracking-wide">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-4 border-white/10">
                    <h4 className="text-2xl font-black text-brand-blue mb-2">Get in Touch</h4>
                    <p className="text-gray-500 text-sm font-medium mb-6">Fill the form below and we will get back to you shortly.</p>
                    <ContactForm />
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetailPage;
