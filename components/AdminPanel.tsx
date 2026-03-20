
import React, { useState, useEffect } from 'react';
import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  setDoc,
  serverTimestamp 
} from '../firebase.ts';
import { Blog, BlogCategory, SiteSettings, MediaItem, VideoStory, CollegeDetailData } from '../types';
import { LOGO_URL, FOOTER_COLLEGES } from '../data.ts';
import MediaManager from './MediaManager';

type AdminTab = 'dashboard' | 'blogs' | 'categories' | 'colleges' | 'entries' | 'media' | 'stories' | 'settings';
type ViewMode = 'list' | 'create' | 'edit';

// Helper component for managing array of strings
const ArrayInput = ({ label, items, onChange }: { label: string, items: string[], onChange: (newItems: string[]) => void }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <label className="text-[10px] font-black uppercase text-black mb-3 block">{label}</label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              type="text" 
              className="flex-grow px-4 py-2 rounded-lg border text-sm"
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx] = e.target.value;
                onChange(newItems);
              }}
            />
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== idx))} className="px-3 bg-red-100 text-red-500 rounded-lg"><i className="fa-solid fa-xmark"></i></button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ''])} className="mt-3 text-xs font-bold text-brand-blue flex items-center"><i className="fa-solid fa-plus mr-1"></i> Add Item</button>
    </div>
  );
};

const AdminPanel: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  
  // Data lists
  const [blogs, setBlogs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]); 
  const [media, setMedia] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [sitemapContent, setSitemapContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Forms
  const [blogForm, setBlogForm] = useState<Partial<Blog>>({});
  const [categoryForm, setCategoryForm] = useState<Partial<BlogCategory>>({});
  // Removed mediaForm state as it is handled by MediaManager
  const [storyForm, setStoryForm] = useState<Partial<VideoStory>>({});
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>({});
  
  // College Form State
  const initialCollegeState: Partial<CollegeDetailData> = {
    name: '', slug: '', location: '', type: 'Public', established: '',
    country: 'Russia', category: 'MBBS Abroad', image: '', intro: '',
    highlights: [], eligibility: [], admissionProcess: [], documents: [],
    courses: [], studentLife: [], placements: [], gallery: [],
    fees: { structure: [], note: '' }
  };
  const [collegeForm, setCollegeForm] = useState<Partial<CollegeDetailData>>(initialCollegeState);

  // Flatten countries for dropdown
  const allCountries = [...FOOTER_COLLEGES.mbbs.map(c => c.country), ...FOOTER_COLLEGES.study.map(c => c.country)];

  const fetchData = async () => {
    setLoading(true);
    try {
      const collections = ['blogs', 'categories', 'colleges', 'leads', 'media', 'settings', 'video_testimonials'];
      const results: any = {};
      for (const name of collections) {
        const snap = await getDocs(collection(db, name));
        results[name] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      setBlogs(results.blogs);
      setCategories(results.categories);
      setColleges(results.colleges);
      setLeads(results.leads.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
      setMedia(results.media);
      setStories(results.video_testimonials);
      if (results.settings.length > 0) {
        setSettings(results.settings[0]);
        setSettingsForm(results.settings[0]);
      }
      
      // Fetch Sitemap
      try {
        const sitemapDoc = await getDocs(collection(db, 'settings'));
        const sitemapData = sitemapDoc.docs.find(d => d.id === 'sitemap');
        if (sitemapData) {
            setSitemapContent(sitemapData.data().content || '');
        }
      } catch (e) {
        console.log("Sitemap fetch error", e);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      if (err.code === 'permission-denied') {
        alert("Permission denied. Please check your Firestore security rules.");
      } else {
        alert("Failed to load data. See console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        callback(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForms = () => {
    setBlogForm({
      title: '', category: categories[0]?.name || 'MBBS Abroad', author: '', readTime: '5 min read',
      img: '', imgAlt: '', content: '', metaTitle: '', metaDesc: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setCategoryForm({ name: '', slug: '' });
    // Removed mediaForm reset
    setStoryForm({ studentName: '', university: '', videoUrl: '', thumbnailUrl: '', tagline: '' });
    setCollegeForm(initialCollegeState);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSave = async (col: string, formData: any) => {
    setLoading(true);
    try {
      if (viewMode === 'create') {
        await addDoc(collection(db, col), { ...formData, timestamp: serverTimestamp() });
      } else if (viewMode === 'edit' && editingId) {
        await updateDoc(doc(db, col, editingId), { ...formData });
      }
      setViewMode('list');
      resetForms();
      fetchData();
    } catch (err) {
      alert(`Error saving to ${col}.`);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    if (!window.confirm("Are you sure? This action is permanent.")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, col, id));
      fetchData();
    } catch (err) {
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-blue flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full animate-fade-in text-center">
          <div className="mb-8 flex flex-col items-center">
            <img src={LOGO_URL} alt="iExplain" className="h-16 w-auto mb-4" />
            <h2 className="text-2xl font-black text-brand-blue mb-1">iExplain Education Admin</h2>
            <p className="text-black font-bold text-xs uppercase tracking-widest">Secure Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <input type="text" placeholder="Admin Username" className="w-full px-5 py-3 rounded-xl bg-gray-50 border outline-none font-medium" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full px-5 py-3 rounded-xl bg-gray-50 border outline-none font-medium" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="w-full py-4 bg-brand-gold text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all mt-4">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarItem: React.FC<{ id: AdminTab; icon: string; label: string }> = ({ id, icon, label }) => (
    <button 
      disabled={isLocked}
      onClick={() => { setActiveTab(id); setViewMode('list'); resetForms(); }} 
      className={`w-full flex items-center space-x-3 px-6 py-4 transition-all border-l-4 ${activeTab === id ? 'bg-white/10 text-brand-gold border-brand-gold font-bold' : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <i className={`fa-solid ${icon} w-5`}></i>
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <aside className="w-64 bg-brand-blue shrink-0 flex flex-col text-white shadow-2xl z-50 h-screen sticky top-0">
        <div className="p-8 flex flex-col items-start space-y-4">
          <img src={LOGO_URL} alt="iExplain" className="h-8 w-auto bg-white p-1 rounded" />
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none">Admin Panel</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">iExplain Education</p>
          </div>
        </div>
        <nav className="flex-grow py-4 overflow-y-auto no-scrollbar space-y-1">
          <SidebarItem id="dashboard" icon="fa-chart-line" label="Overview" />
          <SidebarItem id="entries" icon="fa-users-viewfinder" label="Entries" />
          <SidebarItem id="colleges" icon="fa-building-columns" label="Colleges" />
          <SidebarItem id="blogs" icon="fa-file-signature" label="Blog Posts" />
          <SidebarItem id="categories" icon="fa-tags" label="Categories" />
          <SidebarItem id="stories" icon="fa-play-circle" label="Video Stories" />
          <SidebarItem id="media" icon="fa-photo-film" label="Media Library" />
          <SidebarItem id="settings" icon="fa-sliders" label="Settings" />
        </nav>
        <div className="p-6 border-t border-white/10">
          <button disabled={isLocked} onClick={onExit} className={`w-full py-3 bg-red-500/10 text-red-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-500 transition-all ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}>Logout</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-[100] flex items-center justify-center">
             <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <header className="bg-white h-16 shrink-0 flex items-center justify-between px-10 border-b border-gray-100 shadow-sm">
          <span className="text-brand-blue font-black text-sm uppercase tracking-widest">{activeTab === 'entries' ? 'Leads & Entries' : activeTab}</span>
          <div className="text-xs font-bold text-gray-400">v3.4.0</div>
        </header>

        <div className="flex-grow overflow-y-auto p-10 no-scrollbar">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: 'Total Entries', val: leads.length, icon: 'fa-users', color: 'text-green-500' },
                   { label: 'Colleges', val: colleges.length, icon: 'fa-building-columns', color: 'text-blue-500' },
                   { label: 'Published Blogs', val: blogs.length, icon: 'fa-file', color: 'text-brand-gold' },
                   { label: 'Media Items', val: media.length, icon: 'fa-images', color: 'text-purple-500' }
                 ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] font-black text-black uppercase tracking-widest mb-1">{stat.label}</p>
                          <p className="text-3xl font-black text-brand-blue">{stat.val}</p>
                       </div>
                       <i className={`fa-solid ${stat.icon} text-2xl ${stat.color} opacity-20`}></i>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-brand-blue">Manage <span className="text-brand-gold">Categories</span></h2>
                <button onClick={() => { if(viewMode === 'list') { resetForms(); setViewMode('create'); } else { setViewMode('list'); } }} className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg">
                  {viewMode === 'list' ? 'New Category' : 'Back to List'}
                </button>
              </div>

              {viewMode === 'list' ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black">Name</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black">Slug</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {categories.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/50">
                          <td className="px-8 py-5 text-sm font-bold text-brand-blue">{c.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-gray-500">{c.slug}</td>
                          <td className="px-8 py-5 text-right space-x-2">
                            <button onClick={() => { setCategoryForm(c); setEditingId(c.id); setViewMode('edit'); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><i className="fa-solid fa-pen"></i></button>
                            <button onClick={() => deleteItem('categories', c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><i className="fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                      {categories.length === 0 && (
                        <tr><td colSpan={3} className="px-8 py-8 text-center text-gray-400 text-sm">No categories found. Create one.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white rounded-[2.5rem] p-12 max-w-xl shadow-sm border border-gray-100">
                  <form onSubmit={(e) => { e.preventDefault(); handleSave('categories', categoryForm); }} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-black mb-2 block">Category Name</label>
                        <input required type="text" className="w-full px-5 py-3 rounded-xl bg-gray-50 border outline-none font-bold text-brand-blue" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value, slug: generateSlug(e.target.value)})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-black mb-2 block">Slug (Auto-generated)</label>
                        <input required type="text" className="w-full px-5 py-3 rounded-xl bg-gray-50 border outline-none text-gray-500" value={categoryForm.slug} onChange={e => setCategoryForm({...categoryForm, slug: e.target.value})} />
                    </div>
                    <button type="submit" className="w-full py-4 bg-brand-gold text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-brand-gold/30">Save Category</button>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'colleges' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-brand-blue">Manage <span className="text-brand-gold">Colleges</span></h2>
                <button onClick={() => { if(viewMode === 'list') { resetForms(); setViewMode('create'); } else { setViewMode('list'); } }} className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg">
                  {viewMode === 'list' ? 'New College' : 'Back to List'}
                </button>
              </div>

              {viewMode === 'list' ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black">Name</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black">Country</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black">Category</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase text-black text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {colleges.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/50">
                          <td className="px-8 py-5 text-sm font-bold text-brand-blue">{c.name}</td>
                          <td className="px-8 py-5 text-sm font-medium text-gray-500">{c.country}</td>
                          <td className="px-8 py-5 text-xs font-black uppercase text-brand-gold tracking-wider">{c.category}</td>
                          <td className="px-8 py-5 text-right space-x-2">
                            <button onClick={() => { setCollegeForm(c); setEditingId(c.id); setViewMode('edit'); setImagePreview(c.image); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><i className="fa-solid fa-pen"></i></button>
                            <button onClick={() => deleteItem('colleges', c.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><i className="fa-solid fa-trash"></i></button>
                          </td>
                        </tr>
                      ))}
                      {colleges.length === 0 && <tr><td colSpan={4} className="px-8 py-8 text-center text-gray-400 text-sm">No colleges found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
                  <form onSubmit={(e) => { e.preventDefault(); handleSave('colleges', collegeForm); }} className="grid grid-cols-2 gap-8">
                    
                    <div className="col-span-2 md:col-span-1">
                       <label className="label">College Name</label>
                       <input required type="text" className="input-std" value={collegeForm.name} onChange={e => setCollegeForm({...collegeForm, name: e.target.value, slug: generateSlug(e.target.value)})} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                       <label className="label">Slug (Auto-generated ID)</label>
                       <input required type="text" className="input-std text-gray-500" value={collegeForm.slug} onChange={e => setCollegeForm({...collegeForm, slug: e.target.value})} />
                    </div>

                    <div className="col-span-2 md:col-span-1">
                       <label className="label">Country</label>
                       <select className="input-std" value={collegeForm.country} onChange={e => setCollegeForm({...collegeForm, country: e.target.value})}>
                          {allCountries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                       </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                       <label className="label">Category</label>
                       <select className="input-std" value={collegeForm.category} onChange={e => setCollegeForm({...collegeForm, category: e.target.value as any})}>
                          <option value="MBBS Abroad">MBBS Abroad</option>
                          <option value="Study Abroad">Study Abroad</option>
                       </select>
                    </div>

                    <div className="col-span-2 bg-gray-50 p-6 rounded-2xl border border-dashed">
                       <label className="label">Banner Image</label>
                       <div className="flex gap-4 items-center">
                          {collegeForm.image && <img src={collegeForm.image} className="h-20 w-32 object-cover rounded-lg" />}
                          <input type="text" className="input-std flex-grow" placeholder="Image URL" value={collegeForm.image} onChange={e => setCollegeForm({...collegeForm, image: e.target.value})} />
                       </div>
                    </div>

                    <div className="col-span-2">
                       <label className="label">Introduction</label>
                       <textarea rows={4} className="input-std" value={collegeForm.intro} onChange={e => setCollegeForm({...collegeForm, intro: e.target.value})} />
                    </div>

                    <ArrayInput label="Highlights" items={collegeForm.highlights || []} onChange={i => setCollegeForm({...collegeForm, highlights: i})} />
                    <ArrayInput label="Eligibility" items={collegeForm.eligibility || []} onChange={i => setCollegeForm({...collegeForm, eligibility: i})} />
                    <ArrayInput label="Admission Process" items={collegeForm.admissionProcess || []} onChange={i => setCollegeForm({...collegeForm, admissionProcess: i})} />
                    <ArrayInput label="Documents" items={collegeForm.documents || []} onChange={i => setCollegeForm({...collegeForm, documents: i})} />
                    <ArrayInput label="Courses Offered" items={collegeForm.courses || []} onChange={i => setCollegeForm({...collegeForm, courses: i})} />
                    <ArrayInput label="Student Life" items={collegeForm.studentLife || []} onChange={i => setCollegeForm({...collegeForm, studentLife: i})} />
                    <ArrayInput label="Placements" items={collegeForm.placements || []} onChange={i => setCollegeForm({...collegeForm, placements: i})} />
                    <ArrayInput label="Gallery Images (URLs)" items={collegeForm.gallery || []} onChange={i => setCollegeForm({...collegeForm, gallery: i})} />

                    <div className="col-span-2 bg-blue-50 p-6 rounded-2xl">
                       <label className="label mb-4">Fee Structure</label>
                       <div className="space-y-3">
                          {collegeForm.fees?.structure?.map((fee, idx) => (
                             <div key={idx} className="flex gap-4">
                                <input placeholder="Label (e.g. Tuition)" className="input-std" value={fee.label} onChange={e => {
                                   const newStruct = [...(collegeForm.fees?.structure || [])];
                                   newStruct[idx].label = e.target.value;
                                   setCollegeForm({...collegeForm, fees: { ...collegeForm.fees!, structure: newStruct }});
                                }} />
                                <input placeholder="Value (e.g. $5000)" className="input-std" value={fee.value} onChange={e => {
                                   const newStruct = [...(collegeForm.fees?.structure || [])];
                                   newStruct[idx].value = e.target.value;
                                   setCollegeForm({...collegeForm, fees: { ...collegeForm.fees!, structure: newStruct }});
                                }} />
                                <button type="button" onClick={() => {
                                   const newStruct = (collegeForm.fees?.structure || []).filter((_, i) => i !== idx);
                                   setCollegeForm({...collegeForm, fees: { ...collegeForm.fees!, structure: newStruct }});
                                }} className="text-red-500"><i className="fa-solid fa-trash"></i></button>
                             </div>
                          ))}
                          <button type="button" onClick={() => {
                             setCollegeForm({...collegeForm, fees: { ...collegeForm.fees!, structure: [...(collegeForm.fees?.structure || []), {label: '', value: ''}] }});
                          }} className="text-xs font-bold text-blue-600">+ Add Fee Row</button>
                       </div>
                       <input placeholder="Fee Note (e.g. Exchange rate varies)" className="input-std mt-4" value={collegeForm.fees?.note} onChange={e => setCollegeForm({...collegeForm, fees: { ...collegeForm.fees!, note: e.target.value }})} />
                    </div>

                    <button type="submit" className="col-span-2 py-5 bg-brand-gold text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">
                        {editingId ? 'Update College' : 'Add College'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {activeTab === 'entries' && (
            <div className="animate-fade-in">
              {/* Existing Entries Table Logic */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr><th className="px-6 py-5 text-[10px] font-black uppercase">Name</th><th className="px-6 py-5 text-[10px] font-black uppercase">Contact</th><th className="px-6 py-5 text-[10px] font-black uppercase">Target</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.map(lead => (
                      <tr key={lead.id}>
                        <td className="px-6 py-5 text-sm font-bold">{lead.name}</td>
                        <td className="px-6 py-5 text-xs">{lead.phone}<br/>{lead.email}</td>
                        <td className="px-6 py-5 text-xs font-bold text-brand-gold">{lead.country}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ... Rest of existing tabs (Stories, Blogs, Media, Settings) remain structurally similar ... */}
          {activeTab === 'blogs' && (
            <div className="animate-fade-in">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-brand-blue">Manage <span className="text-brand-gold">Blogs</span></h2>
                  <div className="flex gap-4">
                     <button onClick={() => { setActiveTab('categories'); }} className="px-4 py-3 bg-gray-100 text-brand-blue rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Manage Categories</button>
                     <button onClick={() => { if(viewMode === 'list') { resetForms(); setViewMode('create'); } else { setViewMode('list'); } }} className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg">{viewMode === 'list' ? 'New Blog' : 'Back'}</button>
                  </div>
               </div>
               {viewMode === 'list' ? (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                     <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100"><tr><th className="px-8 py-5 text-[10px] font-black uppercase">Title</th><th className="px-8 py-5 text-[10px] font-black uppercase">Category</th><th className="px-8 py-5 text-[10px] font-black uppercase text-right">Action</th></tr></thead>
                        <tbody className="divide-y divide-gray-50">
                           {blogs.map(b => (
                              <tr key={b.id}><td className="px-8 py-5 text-sm font-bold">{b.title}</td><td className="px-8 py-5 text-xs font-bold text-brand-gold uppercase">{b.category}</td><td className="px-8 py-5 text-right"><button onClick={() => { setBlogForm(b); setEditingId(b.id); setViewMode('edit'); setImagePreview(b.img); }} className="text-blue-500 mr-4"><i className="fa-solid fa-pen"></i></button><button onClick={() => deleteItem('blogs', b.id)} className="text-red-500"><i className="fa-solid fa-trash"></i></button></td></tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               ) : (
                  <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-gray-100">
                     <form onSubmit={(e) => { e.preventDefault(); handleSave('blogs', blogForm); }} className="grid grid-cols-2 gap-8">
                        <div className="col-span-2"><label className="label">Title</label><input required className="input-std" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} /></div>
                        <div className="col-span-2 md:col-span-1"><label className="label">Category</label><select className="input-std" value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}>{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}<option value="General">General</option></select></div>
                        <div className="col-span-2"><label className="label">Content (HTML)</label><textarea rows={10} className="input-std" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} /></div>
                        <button className="col-span-2 py-5 bg-brand-gold text-white rounded-xl font-black uppercase tracking-widest shadow-xl">Publish</button>
                     </form>
                  </div>
               )}
            </div>
          )}

          {activeTab === 'media' && (
            <div className="animate-fade-in">
              <MediaManager onLock={setIsLocked} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in space-y-12">
               {/* Sitemap Section */}
               <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-black text-brand-blue mb-6">Sitemap Configuration</h3>
                  <div className="space-y-6">
                     <div>
                        <label className="label">Upload Sitemap XML</label>
                        <input 
                          type="file" 
                          accept=".xml"
                          className="input-std"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                               const reader = new FileReader();
                               reader.onload = (ev) => {
                                  setSitemapContent(ev.target?.result as string);
                               };
                               reader.readAsText(file);
                            }
                          }}
                        />
                        <p className="text-xs text-gray-400 mt-2">Upload a valid sitemap.xml file.</p>
                     </div>
                     <div>
                        <label className="label">Sitemap Content (Editable)</label>
                        <textarea 
                          rows={15} 
                          className="input-std font-mono text-xs" 
                          value={sitemapContent} 
                          onChange={(e) => setSitemapContent(e.target.value)}
                          placeholder="<?xml version='1.0' encoding='UTF-8'?>..."
                        />
                     </div>
                     <button 
                       onClick={async () => {
                          setLoading(true);
                          try {
                             await setDoc(doc(db, 'settings', 'sitemap'), {
                                content: sitemapContent,
                                updatedAt: serverTimestamp()
                             });
                             alert('Sitemap updated successfully!');
                          } catch (e) {
                             console.error(e);
                             alert('Error saving sitemap');
                          } finally {
                             setLoading(false);
                          }
                       }}
                       className="py-4 px-8 bg-brand-gold text-white rounded-xl font-black uppercase tracking-widest shadow-xl hover:brightness-110 transition-all"
                     >
                       Save Sitemap
                     </button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>
      <style>{`
        .label { display: block; font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem; color: black; }
        .input-std { width: 100%; padding: 0.75rem 1.25rem; border-radius: 0.75rem; background-color: #f9fafb; border: 1px solid #e5e7eb; outline: none; font-weight: 500; color: #0f172a; }
        .input-std:focus { ring: 2px; ring-color: #02385A; }
      `}</style>
    </div>
  );
};

export default AdminPanel;
