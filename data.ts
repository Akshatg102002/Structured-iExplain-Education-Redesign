import { Destination, Office, Blog, Testimonial, College, CollegeDetailData, ProgramDetailData, MBBSDetailData, StudyIndiaDetailData, Service } from './types';
export { MBBS_ABROAD_DETAILED } from './mbbs_data.ts';
export { STUDY_ABROAD_DETAILED } from './studyAbroad_Data.ts';

export const LOGO_URL = "https://www.iexplaineducation.com/wp-content/uploads/2023/04/Logo-2-scaled-e1684926432756-768x307.jpg";
export const HERO_IMG_URL = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200";

export const PRIVACY_POLICY_CONTENT = `
<h3>1. Introduction</h3>
<p>Welcome to iExplain Education. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your personal information when you visit our website or use our services.</p>
<p>We collect basic information such as name, email, and phone number when you fill out forms on our site. This is used solely to provide counseling services.</p>
`;

export const TERMS_CONTENT = `
<h3>1. Acceptance of Terms</h3>
<p>By accessing and using the iExplain Education website and services, you agree to be bound by these Terms and Conditions.</p>
<p>All content provided is for informational purposes. We strive for accuracy but cannot guarantee admission as it depends on university criteria.</p>
`;

export const OFFICE_ADDRESSES: Office[] = [
  { 
    state: "Uttar Pradesh", 
    city: "Noida (HQ)", 
    slug: "noida-hq",
    address: "#301, World Trade Tower (WTT), Sector 16, Noida - 201301", 
    phone: "+91 97738 47799", 
    lat: 28.5708, 
    lng: 77.3260,
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.957388755013!2d77.3235652755026!3d28.571068875701777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50742d4a53d%3A0xc682914104085489!2sWave%20Silver%20Tower!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },
  { state: "Uttarakhand", city: "Dehradun", slug: "dehradun", address: "3rd Floor, Puspa Tower, 52 Subhash Road, Dehradun", phone: "+91 97738 47799", lat: 30.3165, lng: 78.0322 },
  { state: "Maharashtra", city: "Pune", slug: "pune", address: "601, Karan Victoria, Shivaji Nagar, Pune - 411005", phone: "+91 97738 47799", lat: 18.5204, lng: 73.8567 },
  { state: "Rajasthan", city: "Kota", slug: "kota", address: "Pratham Residency, New Jawahar Nagar, Kota, Rajasthan", phone: "+91 97738 47799", lat: 25.2138, lng: 75.8648 },
  { state: "Bihar", city: "Patna", slug: "patna", address: "3rd Floor, Sudama Bhawan, Hira Panna Lane, Boring Road, Patna", phone: "+91 97738 47799", lat: 25.5941, lng: 85.1376 }
];

export const FOOTER_COLLEGES = {
  mbbs: [
    { country: 'Russia', code: 'RU', names: ['Kazan Federal University', 'Bashkir State Medical University', 'Orenburg State Medical University', 'Crimea Federal University', 'First Moscow State Medical University'] },
    { country: 'Georgia', code: 'GE', names: ['Tbilisi State Medical University', 'Batumi Shota Rustaveli State University', 'David Tvildiani Medical University', 'European University Georgia'] },
    { country: 'Kazakhstan', code: 'KZ', names: ['Al-Farabi Kazakh National University', 'Kazakh National Medical University', 'Astana Medical University', 'South Kazakhstan Medical Academy'] },
    { country: 'Kyrgyzstan', code: 'KG', names: ['Osh State University', 'Jalal-Abad State University', 'International School of Medicine', 'Asian Medical Institute'] },
    { country: 'Uzbekistan', code: 'UZ', names: ['Tashkent Medical Academy', 'Samarkand State Medical University', 'Bukhara State Medical Institute', 'Andijan State Medical Institute'] },
    { country: 'China', code: 'CN', names: ['Nanjing Medical University', 'Jilin University', 'China Medical University', 'Dalian Medical University'] },
    { country: 'Nepal', code: 'NP', names: ['Tribhuvan University', 'Kathmandu University', 'B.P. Koirala Institute', 'Patan Academy of Health Sciences'] },
    { country: 'Bangladesh', code: 'BD', names: ['Dhaka National Medical College', 'Bangladesh Medical College', 'Jahurul Islam Medical College', 'Holy Family Red Crescent Medical College'] },
    { country: 'Romania', code: 'RO', names: ['Carol Davila University', 'Grigore T. Popa University', 'Iuliu Hatieganu University', 'Ovidius University'] },
    { country: 'Serbia', code: 'RS', names: ['University of Belgrade', 'University of Novi Sad', 'University of Nis', 'University of Kragujevac'] }
  ],
  study: [
    { country: 'Ireland', code: 'IE', names: ['Trinity College Dublin', 'University College Dublin', 'Dublin City University', 'University of Limerick'] },
    { country: 'USA', code: 'US', names: ['Northeastern University', 'Arizona State University', 'New York University', 'University of Texas at Austin'] },
    { country: 'UK', code: 'GB', names: ['University of Leeds', 'University of Manchester', 'University of Birmingham', 'University of Warwick'] },
    { country: 'Australia', code: 'AU', names: ['University of Melbourne', 'Monash University', 'University of Sydney', 'Deakin University'] },
    { country: 'New Zealand', code: 'NZ', names: ['University of Auckland', 'University of Otago', 'Victoria University of Wellington', 'Auckland University of Technology'] },
    { country: 'Canada', code: 'CA', names: ['University of Toronto', 'University of British Columbia', 'McGill University', 'York University'] },
    { country: 'UAE', code: 'AE', names: ['University of Birmingham Dubai', 'Middlesex University Dubai', 'Heriot-Watt University Dubai', 'Manipal Academy Dubai'] },
    { country: 'Europe Top Destinations', code: 'EU', names: ['Germany', 'Italy', 'France', 'Malta', 'Netherlands', 'Poland'] }
  ],
  mbbs_india: [
    { country: 'North India', code: 'IN', names: ['Uttar Pradesh', 'Haryana', 'Delhi', 'Uttarakhand', 'Himachal Pradesh'] },
    { country: 'Central & West India', code: 'IN', names: ['Rajasthan', 'Maharashtra', 'Madhya Pradesh'] },
    { country: 'East & South India', code: 'IN', names: ['Bihar', 'Karnataka'] }
  ]
};

const generatePlaceholder = (name: string, type: string) => ({
  name, location: 'Global Campus', type: 'Public/Private', established: '1900s',
  image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?auto=format&fit=crop&q=80&w=1200',
  intro: `${name} is a premier institution known for its academic excellence.`,
  highlights: ['World Class Infrastructure', 'Global Recognition'],
  eligibility: ['10+2 with 50% Marks', 'Valid Passport'],
  admissionProcess: ['Submit Application', 'Document Verification'],
  documents: ['Passport', 'Transcripts'],
  fees: { structure: [{ label: 'Tuition Fee', value: 'Contact for details' }], note: 'Fees subject to change.' },
  courses: [type === 'MBBS Abroad' ? 'MBBS' : 'Undergraduate Programs'],
  studentLife: ['Sports Complex', 'Library'],
  placements: ['Global Career Opportunities'],
  gallery: []
});

const DETAILED_COLLEGES: Record<string, CollegeDetailData> = {
  "kazan-federal-university": {
    name: "Kazan Federal University",
    location: "Kazan, Russia",
    type: "Public Federal University",
    established: "1804",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    intro: "Kazan Federal University (KFU) is one of the oldest universities in Russia...",
    highlights: ["2nd Oldest University in Russia", "WHO & NMC Recognized"],
    eligibility: ["Minimum 50% marks in PCB", "NEET Qualified"],
    admissionProcess: ["Application", "Admission Letter"],
    documents: ["10th & 12th Marksheets", "Passport"],
    fees: { structure: [{ label: "Tuition Fee", value: "468,000 RUB" }], note: "Exchange rate fluctuates." },
    courses: ["MBBS"],
    studentLife: ["Hostels", "Sports"],
    placements: ["FMGE/NExT eligible"],
    gallery: ["https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600"]
  },
  "northeastern-university": {
    name: "Northeastern University",
    location: "Boston, Massachusetts, USA",
    type: "Private Research University",
    established: "1898",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=1200",
    intro: "Northeastern University is a top-tier private research university...",
    highlights: ["#1 in Co-op", "Tier 1 Research"],
    eligibility: ["High School Diploma", "GPA 3.0+"],
    admissionProcess: ["Common App", "Fee Payment"],
    documents: ["Transcripts", "SOP"],
    fees: { structure: [{ label: "Tuition", value: "$60,000/year" }], note: "Varies by program" },
    courses: ["CS", "Business"],
    studentLife: ["300+ Orgs"],
    placements: ["High Employability"],
    gallery: ["https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=600"]
  }
};

const allMbbsNames = FOOTER_COLLEGES.mbbs.flatMap(c => c.names);
const allStudyNames = FOOTER_COLLEGES.study.flatMap(c => c.names);
const allIndiaNames = FOOTER_COLLEGES.mbbs_india.flatMap(c => c.names);

allMbbsNames.forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (!DETAILED_COLLEGES[slug]) DETAILED_COLLEGES[slug] = generatePlaceholder(name, 'MBBS Abroad');
});
allStudyNames.forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (!DETAILED_COLLEGES[slug]) DETAILED_COLLEGES[slug] = generatePlaceholder(name, 'Study Abroad');
});
allIndiaNames.forEach(name => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (!DETAILED_COLLEGES[slug]) DETAILED_COLLEGES[slug] = generatePlaceholder(name, 'MBBS India');
});

export const COLLEGE_DETAILS = DETAILED_COLLEGES;

export const ABOUT_US_CONTENT = { intro: `Welcome to iExplain Education...`, vision: { title: "Opening Doors...", text: "..." }, mission: { title: "Empowering Minds...", points: [] } };
export const CORE_VALUES_FULL = [{ title: "Integrity", desc: "..." }];
export const TEAM_MEMBERS = [{ name: "Sunil Baranwal", role: "Director", image: "https://ui-avatars.com/api/?name=Sunil+Baranwal" }];

export const INDIA_COURSES_DETAILED: Record<string, StudyIndiaDetailData> = {
  "mbbs": {
    title: "Study MBBS in India for Indian Students : MBBS Fees & MBBS Admission in India",
    heroImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600",
    intro: "MBBS in India is one of the highly preferred courses by medical aspirants worldwide. The strong education structure, sincere professors, and top-hole medical universities in India are paving the way for success. To secure admission for MBBS courses in India, the aspirants are required to appear in NEET. A healthy and peaceful environment in India helps the students to acquire knowledge more quickly. MBBS in India demands a student to get at least 50% in the 10+2 examinations. The duration of MBBS courses in India is 5.5 years. If you are thinking of earning an MBBS degree from a recognized university, India is a great choice. WHO, NMC, and UNESCO approve all the top medical colleges in India.",
    why: {
      title: "Why MBBS in India?",
      points: [
        "Medical universities in India are some of the finest and prominent ones in the world.",
        "There are over 600+ medical universities and colleges in India. Out of these, around 200+ are private colleges.",
        "There is a total of approximately 1,05,000 seats available in India.",
        "MBBS in India is ranked higher due to its excellence in research and training programs.",
        "Indian medical colleges are famous for providing excellent clinical knowledge and expertise.",
        "Students have the advantage of attending international seminars and conferences.",
        "The syllabus followed in Indian medical college is of global standard.",
        "Students are free to practice in any part of the world after MBBS from India.",
        "Students get to practice on actual human bodies."
      ]
    },
    duration: {
      title: "Duration of MBBS in India",
      cards: [
        "MBBS in India has a tenure of 5.5 years. It includes 4.5 years of classroom study, and the last year is for an internship.",
        "For a postgraduate program, you will need a time of 3 years.",
        "Diploma courses take two years to conclude.",
        "Other specialization programs take specific times."
      ]
    },
    eligibility: {
      title: "Eligibility Criteria for MBBS in India",
      points: [
        "The candidate must be of 17 years of age at the time of MBBS admission in India.",
        "The candidate must not exceed the age of 25 years.",
        "The medical candidate needs to score 50% marks in 12th grade for general category students. Reserved category candidates must achieve a minimum of 40%.",
        "For AIIMS, the percentage is 60% and 45% for SC/ST and OBC.",
        "A medical candidate must have the primary subjects in 12th grade should be Physics, Chemistry, and Biology.",
        "NEET is mandatory."
      ]
    },
    documents: {
      title: "Documents Required for MBBS in India",
      subtitle: "Medical candidate must keep all the following documents ready for seeking MBBS admission in India:",
      points: [
        "Medical candidates must possess valid mark sheets of class 10th and class 12th.",
        "NEET scorecard is an essential requirement for getting admission to MBBS India.",
        "Medical candidates must possess a valid school transfer certificate, code of conduct certificate, medical certificate, health check-up certificate, and no criminal record certificate.",
        "The students should have a caste certificate indicating that the medical candidate belongs to SC/ST/OBC.",
        "Medical candidate needs to show parents' bank statement, which indicates that he/she will be able to pay the fees required during admission."
      ]
    },
    process: {
      title: "Process of Admission for MBBS in India",
      steps: [
        "You must complete Class XII with Physics, Chemistry, and Biology.",
        "The student must qualify in NEET for admission in MBBS.",
        "After qualifying for the NEET exam, students must appear for counseling."
      ]
    },
    economical: {
      title: "Economical MBBS India",
      points: [
        "India offers an economical MBBS if the medical student can clear the NEET exam, which is mandatory.",
        "For private medical colleges, the medical candidate must spend at least 50 lakhs to 60 lakhs.",
        "As the set trend, universities abroad offer a more economical program.",
        "For the NRI students, the structure of fees in India may vary.",
        "If the international students want more detailed information, they must contact the Indian Embassy for more accurate and correct information.",
        "Insurance in India will cost you 5,000 INR to 15,000 INR per year.",
        "The medical check-up will cost the student 20,000 INR to 30,000 INR per year.",
        "The cost of food will be around 10,000 INR to 20,000 INR per year.",
        "Hostel fees may differ for various colleges, but it varies from 70,000 INR to 1,00,000 INR annually."
      ]
    },
    advantages: {
      title: "Advantages of MBBS in India",
      points: [
        "India is ranked among the top medical, educational facilities in the world.",
        "During MBBS in India, students get to learn about tropical diseases. They study some of the rare diseases which don't exist in other foreign countries.",
        "At the time of internships during MBBS in India, medical students get to face a real-life experience.",
        "Every state has state-funded medical universities.",
        "The Indian MBBS degree is accepted worldwide.",
        "Exams like IELTS & TOEFL are not required.",
        "India is a populated country, the need for doctor increase by the day.",
        "Students get to experience modern technologies of medical science.",
        "There are excellent postgraduate and specialization opportunities."
      ]
    },
    international: {
      title: "MBBS in India for International Applicants",
      points: [
        "Govt. of India has some reservations of seats for the Non-resident Indian (NRI) students and the students arriving from other countries.",
        "Even NRI medical students can bag admissions in private and govt institutions.",
        "NRI students can apply through the offices of diplomatic consultants, which are available in India.",
        "Indian Embassy can offer more accurate and exact information needed by the NRI students.",
        "In some situations, entrance tests are not required by NRI students.",
        "Reserved NRI quota seats, which offer admission to International students.",
        "In the NRI quota, too, the seats are allotted based on merit and performance.",
        "Fees structure may vary for the NRI students in the medical council-approved colleges."
      ]
    },
    dates: {
      title: "Imperative Dates for MBBS in India",
      points: [
        "NEET Entrance Test: National Eligibility cum Entrance Test.",
        "The medical candidate is free to apply for Indian medical universities in June and July.",
        "The academic year for MBBS in India starts in September or October."
      ]
    },
    govt: {
      title: "Why Pick Govt. Medical Universities in India?",
      points: [
        "Indian Govt. universities charge low fees.",
        "Admissions in Govt. colleges in India are possible by clearing the NEET exam.",
        "The quality of medical education provided in Govt. medical colleges in India is excellent.",
        "The professors teaching in the medical field are knowledgeable and experienced, which gives a plus point to the students studying."
      ]
    },
    explore: {
      title: "Explore Beautiful India",
      points: [
        "Delhi is the capital of India.",
        "The official language is Hindi.",
        "More than 80% of India's population speak English.",
        "The currency of India is Indian Rupee (INR).",
        "India shares its boundary with China, Pakistan, Nepal, Myanmar, Afghanistan, and Bhutan.",
        "In India, the weather is tropical monsoon climate and tropical wet and dry climate.",
        "The population in India is approx. 133.92 crores.",
        "India has the largest postal network across the globe, having more than 1 55,015 post offices.",
        "India is known for organizing the largest gathering of people, Kumbh Mela."
      ]
    }
  }
};

export const MEGA_MENU_DATA = {
  "STUDY ABROAD": [
    { name: "USA", link: "/study-abroad/usa", code: "US" },
    { name: "UK", link: "/study-abroad/uk", code: "GB" },
    { name: "Canada", link: "/study-abroad/canada", code: "CA" },
    { name: "Australia", link: "/study-abroad/australia", code: "AU" },
    { name: "New Zealand", link: "/study-abroad/new-zealand", code: "NZ" },
    { name: "Dubai", link: "/study-abroad/dubai", code: "AE" },
    { name: "Europe", link: "/study-abroad/europe", code: "EU" }
  ],
  "MBBS ABROAD": [
    { name: "Eastern Europe", link: "/mbbs-abroad/eastern-europe", code: "EU" },
    { name: "Central Asia", link: "/mbbs-abroad/central-asia", code: "KZ" },
    { name: "Philippines", link: "/mbbs-abroad/philippines", code: "PH" },
    { name: "Bangladesh", link: "/mbbs-abroad/bangladesh", code: "BD" },
    { name: "Nepal", link: "/mbbs-abroad/nepal", code: "NP" },
    { name: "China", link: "/mbbs-abroad/china", code: "CN" },
    { name: "Egypt", link: "/mbbs-abroad/egypt", code: "EG" }
  ],
  "STUDY IN INDIA": [
    { name: "MBBS", link: "/study-india/mbbs", icon: "fa-solid fa-user-doctor" },
    { name: "B.Tech", link: "/study-india/btech", icon: "fa-solid fa-microchip" },
    { name: "MBA", link: "/study-india/mba", icon: "fa-solid fa-briefcase" },
    { name: "BBA", link: "/study-india/bba", icon: "fa-solid fa-chart-line" },
    { name: "PGDM", link: "/study-india/pgdm", icon: "fa-solid fa-graduation-cap" }
  ],
  "ENTRANCE EXAMS": [
    { name: "NEET UG", link: "/exams/neet-ug", icon: "fa-solid fa-file-medical" },
    { name: "JEE Main", link: "/exams/jee-main", icon: "fa-solid fa-calculator" },
    { name: "CAT", link: "/exams/cat", icon: "fa-solid fa-chart-pie" },
    { name: "CLAT", link: "/exams/clat", icon: "fa-solid fa-scale-balanced" },
    { name: "CUET", link: "/exams/cuet", icon: "fa-solid fa-pen-to-square" }
  ]
};

export const STUDENT_SERVICES_DATA = [
  { id: "counseling", title: "Career Counseling", icon: "fa-solid fa-comments", desc: "Expert guidance to choose the right path." },
  { id: "admission", title: "Admission Guidance", icon: "fa-solid fa-university", desc: "Step-by-step assistance for admission." },
  { id: "visa", title: "Visa Assistance", icon: "fa-solid fa-passport", desc: "Hassle-free visa application process." },
  { id: "loan", title: "Education Loan", icon: "fa-solid fa-money-check-dollar", desc: "Financial support for your education." }
];

export const BLOG_POSTS: Blog[] = [
  {
    id: "1",
    title: "Top 5 Countries for MBBS Abroad in 2025",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    date: "Jan 15, 2025",
    category: "MBBS Abroad",
    author: "Admin",
    content: `
      <p>Choosing the right destination for your MBBS degree is a crucial decision that shapes your future medical career. In 2025, several countries have emerged as top choices for Indian students due to their affordable fees, high-quality education, and NMC recognition. Here is a curated list of the top 5 countries to consider.</p>
      
      <h3>1. Russia</h3>
      <p>Russia remains the undisputed leader for medical education abroad. With universities like Kazan Federal University and First Moscow State Medical University, it offers world-class infrastructure at a fraction of the cost of Indian private colleges. The medium of instruction is English, and degrees are recognized globally by WHO and NMC.</p>
      <blockquote>"Russia offers a blend of theoretical knowledge and extensive clinical exposure, making it a prime choice for aspiring doctors."</blockquote>

      <h3>2. Georgia</h3>
      <p>Georgia has rapidly climbed the ranks to become a favorite. Known for its safety and European standard of living, colleges like Tbilisi State Medical University provide education that is 100% in English. The climate is pleasant, and the community is welcoming to Indian students.</p>

      <h3>3. Kazakhstan</h3>
      <p>For students looking for the most budget-friendly options without compromising on quality, Kazakhstan is the answer. Universities here have a 5-year course duration, similar to India, which is a significant advantage.</p>

      <h3>4. Philippines</h3>
      <p>The Philippines follows the American curriculum, which is excellent for students aiming to crack the USMLE. The disease patterns are similar to India, providing relevant clinical experience.</p>

      <h3>5. Bangladesh</h3>
      <p>With a culture, food, and climate almost identical to India, Bangladesh offers a home away from home. The syllabus is also very similar to the NMC curriculum, leading to high FMGE passing rates.</p>

      <h3>Conclusion</h3>
      <p>Each of these countries has unique advantages. Your choice should depend on your budget, career goals, and preference for climate and culture. Contact iExplain Education today for a personalized counseling session to help you decide.</p>
    `,
    readTime: "5 min"
  },
  {
    id: "2",
    title: "How to Crack NEET 2025: Expert Tips",
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800",
    date: "Jan 10, 2025",
    category: "Entrance Exams",
    author: "Dr. Sharma",
    content: `
      <p>The National Eligibility cum Entrance Test (NEET) is the gateway to medical colleges in India. With competition increasing every year, cracking NEET 2025 requires not just hard work, but smart work. Here are expert tips to guide your preparation.</p>

      <h3>1. Master the NCERT</h3>
      <p>The NCERT textbooks are your bible. 80-90% of the biology questions and a significant portion of chemistry and physics questions come directly from NCERT. Ensure you read every line, summary, and diagram.</p>

      <h3>2. Strategic Time Management</h3>
      <p>Create a timetable that allocates time for all three subjects. Don't neglect Physics; it is often the rank decider. Practice solving questions within a time limit to improve your speed and accuracy.</p>

      <h3>3. Mock Tests and Analysis</h3>
      <p>Taking mock tests is crucial, but analyzing them is even more important. Identify your weak areas after every test and work on them. Understand why you got a question wrong – was it a conceptual error or a silly mistake?</p>

      <h3>4. Health is Wealth</h3>
      <p>A burnt-out mind cannot retain information. Ensure you get 7 hours of sleep, eat healthy, and take short breaks. A calm mind performs significantly better in exams.</p>

      <p>Remember, consistency is key. Stay focused, stay positive, and you will achieve your dream of becoming a doctor.</p>
    `,
    readTime: "4 min"
  },
  {
    id: "3",
    title: "Study in UK Without IELTS",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
    date: "Jan 05, 2025",
    category: "Study Abroad",
    author: "Admin",
    content: `
      <p>Dreaming of studying in the United Kingdom but worried about the IELTS exam? Good news! Many prestigious UK universities accept students without IELTS scores based on their Class 12th English marks or other criteria. Let's explore how.</p>

      <h3>Alternative Criteria</h3>
      <p>Universities often waive the IELTS requirement if you have scored over 70-75% in English in your Class 12th board exams (CBSE/ICSE). Some universities may also conduct their own internal English test or a video interview to assess your proficiency.</p>

      <h3>Top Universities Accepting MOI</h3>
      <p>Medium of Instruction (MOI) letters from your previous institution stating that your education was in English can also work. Some universities accepting alternatives include:</p>
      <ul>
        <li>University of Bristol</li>
        <li>University of Warwick</li>
        <li>Sheffield Hallam University</li>
        <li>University of Greenwich</li>
        <li>Swansea University</li>
      </ul>

      <h3>Benefits of Studying in UK</h3>
      <p>The UK offers 1-year Master's programs, which saves you time and money. Additionally, the 2-year Post-Study Work (PSW) visa allows you to stay and work in the UK after graduation, providing excellent career exposure.</p>

      <p>Don't let language tests be a barrier. Contact iExplain Education to assess your profile and apply to the best UK universities today.</p>
    `,
    readTime: "6 min"
  }
];

export const EXAMS_DETAILED = {
  "neet-ug": { title: "NEET UG", heroImage: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200", intro: "National Eligibility cum Entrance Test...", syllabus: {} }
};

export const ROADMAP_STEPS = [
  { 
    step: "01",
    title: "Counseling", 
    desc: "Our expert counseling services are designed to guide students who want to pursue MBBS in India, MBBS Abroad, and Study Abroad programs. We provide personalized career guidance based on your academic profile, budget, and future goals.",
    icon: "fa-solid fa-comments"
  },
  { 
    step: "02",
    title: "Choose Your Destination & Course", 
    desc: "Selecting the right destination and course is the foundation of a successful career. At iExplain Education, we help you explore the best countries and programs based on your academic background, career goals, and budget.",
    icon: "fa-solid fa-earth-americas"
  },
  { 
    step: "03",
    title: "University Selection", 
    desc: "Selecting the right university is one of the most important decisions in a student’s academic journey. At iExplain Education, we carefully analyze your academic background, career goals, preferred location, and budget to recommend the most suitable universities.",
    icon: "fa-solid fa-building-columns"
  },
  { 
    step: "04",
    title: "Admission – Application & Offer Letter", 
    desc: "Our team provides complete assistance throughout the admission process. We help students accurately fill out application forms, prepare and verify required documents, and submit applications to the selected universities within deadlines.",
    icon: "fa-solid fa-file-signature"
  },
  { 
    step: "05",
    title: "Visa – Visa Filing & Interview", 
    desc: "We provide complete assistance with the visa process to ensure a smooth transition to your chosen destination. Our team guides you through accurate visa filing, document preparation, financial documentation, and appointment scheduling.",
    icon: "fa-solid fa-passport"
  },
  { 
    step: "06",
    title: "Departure", 
    desc: "We ensure your journey begins smoothly with complete departure assistance. Our team helps you with flight booking guidance to secure the best routes and affordable fares according to your travel schedule. We also assist in arranging foreign exchange (Forex), international SIM cards, and essential travel guidance.",
    icon: "fa-solid fa-plane-departure"
  }
];

export const INDIA_COURSES = [
  { id: "mbbs", title: "MBBS", desc: "Top Govt & Private Colleges", icon: "fa-solid fa-user-doctor" },
  { id: "engineering", title: "Engineering", desc: "B.Tech in CS, IT, ECE", icon: "fa-solid fa-microchip" },
  { id: "management", title: "Management", desc: "MBA, BBA, PGDM", icon: "fa-solid fa-chart-pie" },
  { id: "law", title: "Law", desc: "LLB, BA LLB", icon: "fa-solid fa-scale-balanced" }
];


export const STATS = [
  { label: "Students Counseled", value: "10,000+" },
  { label: "Partner Universities", value: "500+" },
  { label: "Years of Experience", value: "15+" }
];

export const POPULAR_COLLEGES: College[] = [
  // --- MBBS ABROAD ---
  // Russia
  { name: "Kazan Federal University", country: "Russia", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  { name: "Bashkir State Medical University", country: "Russia", category: "MBBS Abroad", image: "https://www.ruseducation.in/wp-content/uploads/2022/01/Bashkir-State-Medical-University.webp" },
  { name: "Orenburg State Medical University", country: "Russia", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Crimea Federal University", country: "Russia", category: "MBBS Abroad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvJuVumuwTMTGSGfSzzLKYgVzkA8k-kJHb_w&s" },
  { name: "First Moscow State Medical University", country: "Russia", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Georgia
  { name: "Tbilisi State Medical University", country: "Georgia", category: "MBBS Abroad", image: "https://images.shiksha.com/mediadata/images/1702625100phpu2Kbnu.jpeg" },
  { name: "Batumi Shota Rustaveli State University", country: "Georgia", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "David Tvildiani Medical University", country: "Georgia", category: "MBBS Abroad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5z5QqOOgc6KWCqeUoBFkNNRqY64riK5QDQ&s" },
  { name: "European University Georgia", country: "Georgia", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Philippines
  { name: "University of Santo Tomas", country: "Philippines", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "AMA School of Medicine", country: "Philippines", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Our Lady of Fatima University", country: "Philippines", category: "MBBS Abroad", image: "https://www.careerplus.org.in/philippines-medical-college/our-lady-of-fatima-university.jpg " },
  { name: "University of the East Ramon Magsaysay", country: "Philippines", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Bangladesh
  { name: "Dhaka National Medical College", country: "Bangladesh", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Bangladesh Medical College", country: "Bangladesh", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Jahurul Islam Medical College", country: "Bangladesh", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Holy Family Red Crescent Medical College", country: "Bangladesh", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Nepal
  { name: "Tribhuvan University Institute of Medicine", country: "Nepal", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Kathmandu University School of Medical Sciences", country: "Nepal", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "B.P. Koirala Institute of Health Sciences", country: "Nepal", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1592280771800-bcf9de2312b4?auto=format&fit=crop&q=80&w=600" },
  { name: "Patan Academy of Health Sciences", country: "Nepal", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Kazakhstan
  { name: "Al-Farabi Kazakh National University", country: "Kazakhstan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Kazakh National Medical University", country: "Kazakhstan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Astana Medical University", country: "Kazakhstan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1592280771800-bcf9de2312b4?auto=format&fit=crop&q=80&w=600" },
  { name: "South Kazakhstan Medical Academy", country: "Kazakhstan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Uzbekistan
  { name: "Tashkent Medical Academy", country: "Uzbekistan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Samarkand State Medical University", country: "Uzbekistan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Bukhara State Medical Institute", country: "Uzbekistan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Andijan State Medical Institute", country: "Uzbekistan", category: "MBBS Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },

  // --- STUDY ABROAD ---
  // USA
  { name: "Northeastern University", country: "USA", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Arizona State University", country: "USA", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "New York University", country: "USA", category: "Study Abroad", image: "https://uniplusglobal.com/media/university_images/New_York_University_439e3d1807.webp" },
  { name: "University of Texas at Austin", country: "USA", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  { name: "University of Southern California", country: "USA", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  // UK
  { name: "University of Leeds", country: "UK", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "University of Manchester", country: "UK", category: "Study Abroad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNInPUr5vU0dho3EQhK8ws6nP7kccU4TMzHQ&s" },
  { name: "University of Birmingham", country: "UK", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  { name: "University of Warwick", country: "UK", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Kings College London", country: "UK", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  // Australia
  { name: "University of Melbourne", country: "Australia", category: "Study Abroad", image: "https://www.unimelb.edu.au/__data/assets/image/0012/3798804/video.jpg" },
  { name: "Monash University", country: "Australia", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  { name: "University of Sydney", country: "Australia", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Deakin University", country: "Australia", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "RMIT University", country: "Australia", category: "Study Abroad", image: "https://www.rmit.edu.au/content/dam/rmit/rmit-images/marketing-only/about-sub-mastheads/City-Campus-Masthead-1920x960.jpg" },
  // Canada
  { name: "University of Toronto", country: "Canada", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  { name: "University of British Columbia", country: "Canada", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "McGill University", country: "Canada", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "York University", country: "Canada", category: "Study Abroad", image: "https://images.unsplash.com/photo-1592280771800-bcf9de2312b4?auto=format&fit=crop&q=80&w=600" },
  { name: "Seneca College", country: "Canada", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Ireland
  { name: "Trinity College Dublin", country: "Ireland", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "University College Dublin", country: "Ireland", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Dublin City University", country: "Ireland", category: "Study Abroad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcuIEI_sMygRQdUyGTXaSuq46og1TDBOVFOw&s" },
  { name: "University of Limerick", country: "Ireland", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // New Zealand
  { name: "University of Auckland", country: "New Zealand", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "University of Otago", country: "New Zealand", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Victoria University of Wellington", country: "New Zealand", category: "Study Abroad", image: "https://www.ilwindia.com/wp-content/uploads/2019/08/Victoria-University-of-Wellington-New-Zealand.jpg" },
  { name: "Auckland University of Technology", country: "New Zealand", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" },
  // Dubai
  { name: "University of Birmingham Dubai", country: "Dubai", category: "Study Abroad", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=600" },
  { name: "Middlesex University Dubai", country: "Dubai", category: "Study Abroad", image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?auto=format&fit=crop&q=80&w=600" },
  { name: "Heriot-Watt University Dubai", country: "Dubai", category: "Study Abroad", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2UPd23SmEbM0JSG0O36KbCG5p6oXxnO6dcA&s" },
  { name: "Manipal Academy of Higher Education Dubai", country: "Dubai", category: "Study Abroad", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" }
];

export const COUNTRY_ICONS: Record<string, string> = {
  "Russia": "RU",
  "USA": "US",
  "UK": "GB",
  "Australia": "AU",
  "Canada": "CA",
  "Germany": "DE",
  "Ireland": "IE",
  "New Zealand": "NZ",
  "Dubai": "AE",
  "Uzbekistan": "UZ",
  "Kazakhstan": "KZ",
  "Philippines": "PH",
  "Georgia": "GE",
  "Kyrgyzstan": "KG",
  "Egypt": "EG",
  "Bangladesh": "BD"
};

export const KNOW_YOUR_DESTINATIONS = [
  {
    name: "Russia",
    path: "/mbbs-abroad/russia",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Georgia",
    path: "/mbbs-abroad/georgia",
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "USA",
    path: "/study-abroad/usa",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "UK",
    path: "/study-abroad/uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Canada",
    path: "/study-abroad/canada",
    image: "https://plus.unsplash.com/premium_photo-1673241100156-2e04fca1a4af?q=80&w=870&auto=format&fit=crop"
  },
  {
    name: "Australia",
    path: "/study-abroad/australia",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Philippines",
    path: "/mbbs-abroad/philippines",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Uzbekistan",
    path: "/mbbs-abroad/uzbekistan",
    image: "https://images.unsplash.com/photo-1673446840855-1c82bafdb67d?q=80&w=863&auto=format&fit=crop"
  },
  {
    name: "Dubai",
    path: "/study-abroad/dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600"
  }
];

export const DESTINATIONS = [
  { id: 1, name: "USA", description: "Top universities and diverse culture.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600", popularCourses: ["Engineering", "Business"] },
  { id: 2, name: "UK", description: "Historic institutions and quality education.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600", popularCourses: ["Law", "Medicine"] },
  { id: 3, name: "Canada", description: "Welcoming environment and post-study work.", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=600", popularCourses: ["IT", "Management"] },
  { id: 4, name: "Australia", description: "High quality of life and education.", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=600", popularCourses: ["Nursing", "Engineering"] }
];

export const TESTIMONIALS = [
  {
    name: "Aditi Sharma",
    univ: "Kazan Federal University",
    text: "iExplain Education helped me choose the right university for my MBBS. The counseling was very detailed and they guided me through the entire admission process.",
    avatar: "https://ui-avatars.com/api/?name=Aditi+Sharma&background=random"
  },
  {
    name: "Rahul Verma",
    univ: "Northeastern University",
    text: "The team at iExplain was incredibly supportive. They helped me with my visa application and even gave me pre-departure briefing which was very useful.",
    avatar: "https://ui-avatars.com/api/?name=Rahul+Verma&background=random"
  },
  {
    name: "Sneha Gupta",
    univ: "University of Leeds",
    text: "I was confused about which country to choose for my masters. iExplain helped me compare different options and I'm very happy with my decision to study in UK.",
    avatar: "https://ui-avatars.com/api/?name=Sneha+Gupta&background=random"
  }
];
