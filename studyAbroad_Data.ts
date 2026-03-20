import { MBBSDetailData } from './types.ts';

export const STUDY_ABROAD_DETAILED: Record<string, MBBSDetailData> = {
  "usa": {
    title: "Study in USA",
    heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200",
    intro: {
      text: "The USA is a top destination for international students, offering world-class education, cutting-edge research opportunities, and a diverse cultural experience.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200"
    },
    quickFacts: {
      country: "USA",
      capital: "Washington, D.C.",
      currency: "US Dollar (USD)",
      language: "English",
      population: "331 Million",
      climate: "Diverse (Temperate to Tropical)",
      timeDifference: "9.5 to 12.5 hours behind India",
      popularCities: "New York, Boston, San Francisco, Chicago",
      safety: "High"
    },
    quickOverview: {
      courseDuration: "4 Years (Undergraduate), 1-2 Years (Graduate)",
      tuitionFees: "$20,000 - $60,000 per year",
      livingCost: "$10,000 - $20,000 per year",
      intakes: "Fall (August), Spring (January), Summer (May)",
      mediumOfTeaching: "English",
      entranceExams: "SAT, ACT, GRE, GMAT, TOEFL, IELTS",
      recognition: "Globally Recognized"
    },
    forIndianStudents: "The USA is highly preferred by Indian students due to its flexible education system, STEM OPT extension, and vast career opportunities in technology, business, and research.",
    benefits: [
      "World-renowned universities and academic excellence.",
      "Flexible education system allowing students to explore various fields.",
      "Extensive research and innovation opportunities.",
      "Diverse and multicultural environment.",
      "Strong economy with excellent career prospects and OPT opportunities."
    ],
    duration: {
      mbbs: "4 Years (Pre-Med) + 4 Years (MD)",
      internship: "3-7 Years (Residency)"
    },
    eligibility: {
      academic: "High School Diploma (for UG) / Bachelor's Degree (for PG)",
      age: "18+ years",
      exams: "SAT/ACT (UG), GRE/GMAT (PG), TOEFL/IELTS (English Proficiency)"
    },
    documents: [
      "Academic Transcripts",
      "Standardized Test Scores",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation (LOR)",
      "Passport",
      "Financial Proof",
      "Visa Application"
    ],
    indiaVsCountry: {
      duration: { india: "3-4 Years (UG)", country: "4 Years (UG)" },
      fees: { india: "Low to Medium", country: "High" },
      entrance: { india: "JEE, NEET, CAT", country: "SAT, ACT, GRE, GMAT" },
      recognition: { india: "National/International", country: "Global" }
    },
    topUniversities: [
      {
        name: "Massachusetts Institute of Technology (MIT)",
        description: "A world leader in science, engineering, and technology.",
        established: "1861",
        location: "Cambridge, Massachusetts",
        tuitionFees: "$55,000+",
        recognition: "Global"
      },
      {
        name: "Stanford University",
        description: "Known for its entrepreneurial spirit and proximity to Silicon Valley.",
        established: "1885",
        location: "Stanford, California",
        tuitionFees: "$56,000+",
        recognition: "Global"
      }
    ],
    whyChooseUs: [
      "Expert guidance on university selection and application strategy.",
      "Assistance with SOP and LOR preparation.",
      "Comprehensive visa counseling and interview preparation.",
      "Pre-departure orientation and support."
    ],
    checklist: [
      { item: "Valid Passport", required: true },
      { item: "Standardized Test Scores", required: true },
      { item: "Financial Documents", required: true },
      { item: "I-20 Form (from University)", required: true }
    ],
    hostelFacilities: {
      intro: "US universities offer various housing options, including on-campus dormitories and off-campus apartments.",
      features: [
        "On-campus dormitories",
        "Off-campus apartments",
        "Meal plans available",
        "High-speed internet",
        "Security and support services"
      ]
    },
    careerOpportunities: {
      postStudyWork: "Optional Practical Training (OPT) allows up to 3 years of work for STEM graduates.",
      industries: "Technology, Finance, Healthcare, Engineering, Business.",
      averageSalary: "$60,000 - $100,000+ per year depending on the field."
    },
    faqs: [
      {
        question: "What is the cost of studying in the USA?",
        answer: "Tuition fees range from $20,000 to $60,000 per year, and living expenses are around $10,000 to $20,000 per year."
      },
      {
        question: "Can I work while studying?",
        answer: "Yes, international students can work on-campus up to 20 hours per week during the semester and full-time during breaks."
      }
    ],
    highlights: [
      { title: "Top Universities", value: "Ivy League & More" },
      { title: "Post-Study Work", value: "Up to 3 Years (STEM)" },
      { title: "Global Recognition", value: "100%" },
      { title: "Career Prospects", value: "Excellent" }
    ],
    facts: {
      intro: "The USA is a diverse and vast country, known for its innovation and cultural influence.",
      list: [
        "Home to the largest number of international students.",
        "Pioneer in technology and research.",
        "Diverse landscapes and climates."
      ]
    },
    advantages: [
      "Access to cutting-edge technology and research.",
      "Networking opportunities with global leaders.",
      "Flexible curriculum allowing customization."
    ],
    studentLife: {
      intro: "Student life in the USA is vibrant, with numerous clubs, sports, and cultural events.",
      list: [
        "Active campus life with various student organizations.",
        "Opportunities for internships and co-ops.",
        "Diverse cultural experiences."
      ]
    }
  },
  "uk": {
    title: "Study in UK",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200",
    intro: {
      text: "The UK offers world-class education, a rich history, and a diverse cultural experience, making it a top choice for international students.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200"
    },
    quickFacts: {
      country: "United Kingdom",
      capital: "London",
      currency: "Pound Sterling (GBP)",
      language: "English",
      population: "67 Million",
      climate: "Temperate Maritime",
      timeDifference: "4.5 to 5.5 hours behind India",
      popularCities: "London, Edinburgh, Manchester, Birmingham",
      safety: "High"
    },
    quickOverview: {
      courseDuration: "3 Years (Undergraduate), 1 Year (Graduate)",
      tuitionFees: "£10,000 - £38,000 per year",
      livingCost: "£9,000 - £15,000 per year",
      intakes: "Autumn (September/October), Spring (January/February)",
      mediumOfTeaching: "English",
      entranceExams: "IELTS, TOEFL, PTE, GMAT/GRE (for some PG)",
      recognition: "Globally Recognized"
    },
    forIndianStudents: "The UK is a popular destination for Indian students due to its shorter course durations, post-study work visa, and historical ties.",
    benefits: [
      "Shorter course durations (3-year UG, 1-year PG) saving time and money.",
      "World-renowned universities with a strong academic reputation.",
      "2-year post-study work visa (Graduate Route).",
      "Multicultural society with a large Indian diaspora.",
      "Excellent transport links to Europe."
    ],
    duration: {
      mbbs: "5-6 Years",
      internship: "2 Years (Foundation Programme)"
    },
    eligibility: {
      academic: "High School (for UG) / Bachelor's Degree (for PG)",
      age: "18+ years",
      exams: "IELTS/TOEFL/PTE (English Proficiency)"
    },
    documents: [
      "Academic Transcripts",
      "English Proficiency Scores",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation (LOR)",
      "Passport",
      "Financial Proof",
      "Visa Application (CAS)"
    ],
    indiaVsCountry: {
      duration: { india: "3-4 Years (UG), 2 Years (PG)", country: "3 Years (UG), 1 Year (PG)" },
      fees: { india: "Low to Medium", country: "High" },
      entrance: { india: "Various", country: "IELTS/TOEFL" },
      recognition: { india: "National/International", country: "Global" }
    },
    topUniversities: [
      {
        name: "University of Oxford",
        description: "One of the oldest and most prestigious universities in the world.",
        established: "1096",
        location: "Oxford, England",
        tuitionFees: "£28,000+",
        recognition: "Global"
      },
      {
        name: "University of Cambridge",
        description: "Renowned for its history, academic excellence, and beautiful campus.",
        established: "1209",
        location: "Cambridge, England",
        tuitionFees: "£24,000+",
        recognition: "Global"
      }
    ],
    whyChooseUs: [
      "Expert guidance on university selection and UCAS application.",
      "Assistance with SOP and LOR preparation.",
      "Comprehensive visa counseling.",
      "Pre-departure orientation and support."
    ],
    checklist: [
      { item: "Valid Passport", required: true },
      { item: "English Proficiency Scores", required: true },
      { item: "Financial Documents", required: true },
      { item: "CAS (Confirmation of Acceptance for Studies)", required: true }
    ],
    hostelFacilities: {
      intro: "UK universities offer various housing options, including university halls of residence and private student accommodation.",
      features: [
        "University halls of residence",
        "Private student accommodation",
        "Self-catered or catered options",
        "High-speed internet",
        "Security and support services"
      ]
    },
    careerOpportunities: {
      postStudyWork: "2-year Graduate Route visa for UG/PG, 3 years for PhD.",
      industries: "Finance, Technology, Healthcare, Engineering, Creative Arts.",
      averageSalary: "£25,000 - £40,000+ per year depending on the field."
    },
    faqs: [
      {
        question: "What is the cost of studying in the UK?",
        answer: "Tuition fees range from £10,000 to £38,000 per year, and living expenses are around £9,000 to £15,000 per year."
      },
      {
        question: "Can I work while studying?",
        answer: "Yes, international students can work up to 20 hours per week during term time and full-time during holidays."
      }
    ],
    highlights: [
      { title: "Top Universities", value: "Oxford, Cambridge & More" },
      { title: "Post-Study Work", value: "2 Years" },
      { title: "Course Duration", value: "1 Year PG" },
      { title: "Global Recognition", value: "100%" }
    ],
    facts: {
      intro: "The UK has a rich history and is a global hub for education, culture, and business.",
      list: [
        "Home to some of the world's oldest universities.",
        "Diverse and multicultural society.",
        "Excellent healthcare system (NHS)."
      ]
    },
    advantages: [
      "Shorter course durations save time and money.",
      "High academic standards and quality assurance.",
      "Strong focus on research and innovation."
    ],
    studentLife: {
      intro: "Student life in the UK is diverse, with numerous societies, sports clubs, and cultural events.",
      list: [
        "Active student unions and societies.",
        "Rich cultural and historical experiences.",
        "Excellent travel opportunities across Europe."
      ]
    }
  },
  "europe": {
    title: "Study in Europe",
    heroImage: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=870&auto=format&fit=crop",
    intro: {
      text: "Europe is one of the most popular study destinations in the world, offering world-class education, rich cultural diversity, and excellent career prospects. Home to many top-ranked universities, Europe provides a wide range of programs taught in English. With low or no tuition fees in several countries, strong research opportunities, and easy travel across nations, Europe offers an unmatched international study experience.",
      image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=870&auto=format&fit=crop"
    },
    quickFacts: {
      country: "Various (Germany, France, Italy, etc.)",
      capital: "Various",
      currency: "Euro (EUR) mostly",
      language: "Various (Many English programs)",
      population: "746 Million (Europe)",
      climate: "Diverse",
      timeDifference: "3.5 to 4.5 hours behind India",
      popularCities: "Berlin, Paris, Rome, Amsterdam",
      safety: "High"
    },
    quickOverview: {
      courseDuration: "3-4 Years (UG), 1-2 Years (PG)",
      tuitionFees: "Free to €20,000+ per year",
      livingCost: "€8,000 - €15,000 per year",
      intakes: "Autumn (September/October), Spring (February/March)",
      mediumOfTeaching: "English (and local languages)",
      entranceExams: "IELTS, TOEFL, GRE/GMAT (sometimes)",
      recognition: "Globally Recognized (Bologna Process)"
    },
    forIndianStudents: "Europe is increasingly popular among Indian students due to affordable tuition (especially in Germany), high-quality education, and the opportunity to travel across the Schengen area.",
    benefits: [
      "Affordable or free tuition in many public universities.",
      "High-quality education and research facilities.",
      "Opportunity to learn new languages and experience diverse cultures.",
      "Schengen visa allows travel across 26 countries.",
      "Strong post-study work opportunities in many countries."
    ],
    duration: {
      mbbs: "6 Years",
      internship: "Included or 1 Year post-graduation"
    },
    eligibility: {
      academic: "High School (for UG) / Bachelor's Degree (for PG)",
      age: "18+ years",
      exams: "IELTS/TOEFL (English Proficiency)"
    },
    documents: [
      "Academic Transcripts",
      "English Proficiency Scores",
      "Statement of Purpose (SOP)",
      "Letters of Recommendation (LOR)",
      "Passport",
      "Financial Proof",
      "Visa Application"
    ],
    indiaVsCountry: {
      duration: { india: "3-4 Years (UG)", country: "3-4 Years (UG)" },
      fees: { india: "Low to Medium", country: "Low to High (varies by country)" },
      entrance: { india: "Various", country: "IELTS/TOEFL" },
      recognition: { india: "National/International", country: "Global" }
    },
    topUniversities: [
      {
        name: "Technical University of Munich (TUM)",
        description: "One of Europe's top universities for engineering and technology.",
        established: "1868",
        location: "Munich, Germany",
        tuitionFees: "Low/Free (Admin fee only)",
        recognition: "Global"
      },
      {
        name: "Sorbonne University",
        description: "A prestigious university in France known for humanities and science.",
        established: "1257",
        location: "Paris, France",
        tuitionFees: "€2,770 (UG) / €3,770 (PG) for non-EU",
        recognition: "Global"
      }
    ],
    whyChooseUs: [
      "Expert guidance on country and university selection across Europe.",
      "Assistance with SOP, LOR, and application processes.",
      "Comprehensive Schengen visa counseling.",
      "Pre-departure orientation and support."
    ],
    checklist: [
      { item: "Valid Passport", required: true },
      { item: "English Proficiency Scores", required: true },
      { item: "Financial Documents", required: true },
      { item: "Admission Letter", required: true }
    ],
    hostelFacilities: {
      intro: "European universities offer various housing options, including student dormitories and private apartments.",
      features: [
        "Student dormitories (often subsidized)",
        "Private shared apartments (WG in Germany)",
        "High-speed internet",
        "Proximity to public transport",
        "Cultural exchange opportunities"
      ]
    },
    careerOpportunities: {
      postStudyWork: "Varies by country (e.g., 18 months in Germany, 1-2 years in others).",
      industries: "Engineering, IT, Automotive, Finance, Tourism.",
      averageSalary: "€30,000 - €60,000+ per year depending on the field and country."
    },
    faqs: [
      {
        question: "Is education free in Europe?",
        answer: "In some countries like Germany and Norway, public universities offer free or very low-cost tuition, even for international students."
      },
      {
        question: "Can I travel around Europe with my student visa?",
        answer: "Yes, a student visa for a Schengen country allows you to travel freely within the 26 Schengen area countries."
      }
    ],
    highlights: [
      { title: "Tuition Fees", value: "Low to Free (in some countries)" },
      { title: "Travel", value: "Schengen Visa Access" },
      { title: "Programs", value: "Many English-taught" },
      { title: "Culture", value: "Rich & Diverse" }
    ],
    facts: {
      intro: "Europe is a continent of rich history, diverse cultures, and leading educational institutions.",
      list: [
        "Home to the Bologna Process, ensuring standardized higher education.",
        "Excellent public transportation systems.",
        "High standard of living and safety."
      ]
    },
    advantages: [
      "Affordable education options compared to US/UK.",
      "Opportunity to learn a new language.",
      "Strong focus on sustainability and innovation."
    ],
    studentLife: {
      intro: "Student life in Europe is culturally enriching, with easy access to travel, arts, and history.",
      list: [
        "Vibrant international student communities.",
        "Discounts for students on travel, museums, and events.",
        "Café culture and active nightlife."
      ]
    }
  }
};
