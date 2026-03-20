
import React, { useState, useEffect, useRef } from 'react';
import { db, collection, getDocs } from '../firebase.ts';
import { VideoStory } from '../types.ts';
import { Link } from 'react-router-dom';

const DEFAULT_STORIES: VideoStory[] = [
  {
    id: '1',
    studentName: 'Arjun Singh',
    university: 'Kazan Federal University',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-studying-in-library-4789-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400',
    tagline: 'Best Decision!'
  },
  {
    id: '2',
    studentName: 'Priya Sharma',
    university: 'Tbilisi State Medical University',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-reading-a-book-in-library-4793-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=400',
    tagline: 'Great Support'
  },
  {
    id: '3',
    studentName: 'Rahul Verma',
    university: 'Bashkir State Medical University',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-university-hallway-4796-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    tagline: 'Highly Recommended'
  }
];

const VideoStories: React.FC = () => {
  const [stories, setStories] = useState<VideoStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<VideoStory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const snap = await getDocs(collection(db, 'video_testimonials'));
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() as VideoStory }));
        if (fetched.length > 0) {
          setStories(fetched);
        } else {
          setStories(DEFAULT_STORIES);
        }
      } catch (err) {
        console.error("Error fetching stories:", err);
        setStories(DEFAULT_STORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Handle autoplay when modal opens
  useEffect(() => {
    if (selectedStory && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [selectedStory]);

  const handleClose = () => {
    if (videoRef.current) videoRef.current.pause();
    setSelectedStory(null);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (loading) return null;

  return (
    <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden border-t border-gray-50 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-brand-blue dark:text-white mb-6 tracking-tight">
          Success <span className="text-brand-gold">Stories</span>
        </h2>
        <div className="w-16 h-1 bg-brand-gold mb-6 rounded-full mx-auto"></div>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Watch real experiences from students who transformed their careers with iExplain.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-4 pointer-events-none">
           <button onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })} className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg flex items-center justify-center text-brand-blue dark:text-white hover:bg-brand-gold hover:text-white transition-all"><i className="fa-solid fa-arrow-left"></i></button>
           <button onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })} className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg flex items-center justify-center text-brand-blue dark:text-white hover:bg-brand-gold hover:text-white transition-all"><i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 px-4 md:px-8 pb-10 no-scrollbar snap-x snap-mandatory"
        >
          {stories.map((story) => (
            <div 
              key={story.id} 
              onClick={() => setSelectedStory(story)}
              className="flex-shrink-0 w-[280px] h-[500px] relative rounded-[2rem] overflow-hidden shadow-xl snap-center group cursor-pointer border border-gray-100 dark:border-slate-800 bg-slate-900 transition-transform hover:-translate-y-2"
            >
               {/* Thumbnail Image */}
               <img 
                 src={story.thumbnailUrl || 'https://via.placeholder.com/280x500?text=Video'} 
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                 alt={story.studentName} 
                 loading="lazy"
               />
               
               {/* Overlay Gradient */}
               <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90"></div>
               
               {/* Play Button Overlay */}
               <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform">
                     <i className="fa-solid fa-play ml-1"></i>
                  </div>
               </div>

               {/* Top Right Icon */}
               <div className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xs">
                  <i className="fa-solid fa-clapperboard"></i>
               </div>

               {/* Bottom Content */}
               <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h3 className="font-black text-xl leading-tight mb-1 text-shadow">{story.studentName}</h3>
                  <p className="text-xs font-bold text-gray-300 mb-3">{story.university}</p>
                  <div className="inline-flex items-center bg-brand-gold px-3 py-1 rounded-lg shadow-sm">
                     <span className="text-[10px] font-black uppercase tracking-widest text-white">{story.tagline}</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reels Style Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in" onClick={handleClose}>
          <button onClick={handleClose} className="absolute top-6 right-6 z-[2010] w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          <div 
            className="relative w-full max-w-md h-[90vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10" 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video area
          >
            {/* Video Player */}
            <video 
              ref={videoRef}
              src={selectedStory.videoUrl} 
              className="w-full h-full object-cover cursor-pointer" 
              playsInline
              loop
              autoPlay
              onClick={togglePlay}
            />

            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 pointer-events-auto">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-white text-xl font-black border-2 border-white">
                    {selectedStory.studentName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-black text-2xl leading-none text-shadow-lg">{selectedStory.studentName}</h3>
                    <p className="text-white/80 text-sm font-bold">{selectedStory.university}</p>
                  </div>
               </div>
               <p className="text-white/90 text-sm font-medium leading-relaxed bg-black/20 backdrop-blur-md p-4 rounded-xl border border-white/10 mb-6">
                 "{selectedStory.tagline} - Experience the journey with iExplain Education."
               </p>
               
               <div className="flex gap-3">
                 <a href="https://wa.me/919773847799" target="_blank" rel="noreferrer" className="flex-1 py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                   <i className="fa-brands fa-whatsapp text-lg"></i> Chat
                 </a>
                 <Link to="/contact" onClick={handleClose} className="flex-1 py-3 bg-white text-brand-blue rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-white transition-all">
                   Apply Now
                 </Link>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoStories;
