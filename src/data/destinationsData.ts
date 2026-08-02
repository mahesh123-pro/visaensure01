export interface DestinationData {
  id: string;
  name: string;
  flag: string;
  tagline: string;
  description: string;
  stats: {
    label: string;
    value: string;
  }[];
  visas: {
    title: string;
    description: string;
    iconName: "GraduationCap" | "Briefcase" | "Building" | "Globe2" | "Plane";
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const destinationsData: Record<string, DestinationData> = {
  usa: {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    tagline: "The Global Hub for Innovation and Education",
    description: "The United States remains the top destination for international students and highly skilled professionals, offering unparalleled academic excellence, leading tech industries, and diverse cultural experiences.",
    stats: [
      { label: "Top Universities", value: "4000+" },
      { label: "OPT Duration", value: "Up to 3 Years" },
      { label: "Tech Jobs Growth", value: "15% YoY" },
    ],
    visas: [
      {
        title: "F-1 Student Visa",
        description: "For international students enrolling in full-time academic or language programs. Includes Curricular Practical Training (CPT) and Optional Practical Training (OPT) benefits.",
        iconName: "GraduationCap",
      },
      {
        title: "H-1B Specialty Occupation",
        description: "A highly sought-after work visa for professionals in specialty occupations requiring theoretical or technical expertise, requiring employer sponsorship.",
        iconName: "Briefcase",
      },
      {
        title: "B1/B2 Tourist & Business",
        description: "For short-term business trips, conferences, medical treatment, or leisure travel across the United States.",
        iconName: "Plane",
      },
    ],
    faqs: [
      {
        q: "What is the STEM OPT extension?",
        a: "Students graduating with a degree in Science, Technology, Engineering, or Math (STEM) can apply for a 24-month extension to their standard 12-month OPT, allowing 3 years of work experience.",
      },
      {
        q: "How does the H-1B lottery work?",
        a: "Due to high demand, the USCIS uses a random selection process (lottery) to select H-1B petitions to meet the annual cap of 85,000 visas.",
      },
    ],
  },
  canada: {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    tagline: "Welcoming Immigrants with Open Arms",
    description: "Known for its high quality of life, diverse population, and progressive immigration policies, Canada is a premier destination offering straightforward pathways to permanent residency.",
    stats: [
      { label: "Immigration Target", value: "500k/Year" },
      { label: "PGWP Duration", value: "Up to 3 Years" },
      { label: "Quality of Life Rank", value: "#3 Globally" },
    ],
    visas: [
      {
        title: "Express Entry (PR)",
        description: "The fastest pathway to Canadian Permanent Residency for skilled workers, using a points-based Comprehensive Ranking System (CRS).",
        iconName: "Globe2",
      },
      {
        title: "Study Permit",
        description: "Allows international students to study at Designated Learning Institutions (DLIs) and work part-time during their studies.",
        iconName: "GraduationCap",
      },
      {
        title: "Provincial Nominee Program (PNP)",
        description: "Allows Canadian provinces to nominate individuals who wish to immigrate to Canada and are interested in settling in a particular province.",
        iconName: "Building",
      },
    ],
    faqs: [
      {
        q: "What is the Post-Graduation Work Permit (PGWP)?",
        a: "An open work permit allowing international graduates of participating Canadian post-secondary institutions to gain valuable Canadian work experience for up to 3 years.",
      },
      {
        q: "How does Express Entry work?",
        a: "Candidates create a profile and are assigned a CRS score based on age, education, language proficiency, and work experience. The highest-ranking candidates are invited to apply for PR.",
      },
    ],
  },
  uk: {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    tagline: "World-Class Education and Historic Heritage",
    description: "The UK is home to some of the world's oldest and most prestigious universities. With the reintroduction of the post-study work visa, it is an increasingly attractive destination for global talent.",
    stats: [
      { label: "Historic Universities", value: "160+" },
      { label: "Graduate Route", value: "2 Years" },
      { label: "Global Financial Hub", value: "London" },
    ],
    visas: [
      {
        title: "Student Visa (Tier 4)",
        description: "For students aged 16 or over who have been offered a place on a course by a licensed student sponsor.",
        iconName: "GraduationCap",
      },
      {
        title: "Skilled Worker Visa",
        description: "Allows you to come to or stay in the UK to do an eligible job with an approved employer.",
        iconName: "Briefcase",
      },
      {
        title: "Graduate Visa",
        description: "Gives you permission to stay in the UK for at least 2 years after successfully completing a course in the UK.",
        iconName: "Globe2",
      },
    ],
    faqs: [
      {
        q: "Do I need IELTS to study in the UK?",
        a: "Yes, an approved English language test like IELTS is typically required, though some universities may waive it depending on your previous education medium.",
      },
      {
        q: "What is a Certificate of Sponsorship (CoS)?",
        a: "A unique reference number generated by your UK employer proving they are sponsoring you for a Skilled Worker Visa.",
      },
    ],
  },
  australia: {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    tagline: "High Quality of Life & Skilled Migration",
    description: "Australia offers a booming economy, beautiful landscapes, and a transparent points-based immigration system, making it ideal for skilled professionals and international students.",
    stats: [
      { label: "Minimum Wage", value: "$23.23/hr" },
      { label: "Post-Study Work", value: "Up to 4 Years" },
      { label: "Livability", value: "Top 10 Cities" },
    ],
    visas: [
      {
        title: "Subclass 500 (Student)",
        description: "Allows you to participate in an eligible course of study in Australia and work up to 48 hours a fortnight.",
        iconName: "GraduationCap",
      },
      {
        title: "Subclass 189 (Independent PR)",
        description: "A points-tested visa for invited workers who are not sponsored by an employer or family member.",
        iconName: "Globe2",
      },
      {
        title: "Subclass 482 (Temporary Skill Shortage)",
        description: "Enables employers to address labor shortages by bringing in genuinely skilled workers where they cannot source an appropriately skilled Australian.",
        iconName: "Briefcase",
      },
    ],
    faqs: [
      {
        q: "How does the SkillSelect points system work?",
        a: "Points are awarded for age, English language ability, skilled employment experience, educational qualifications, and other factors. A minimum of 65 points is required to be invited.",
      },
      {
        q: "Are regional visas easier to get?",
        a: "Yes, the Australian government heavily incentivizes migration to regional areas by offering priority processing and additional points for regional study.",
      },
    ],
  },
  europe: {
    id: "europe",
    name: "Europe",
    flag: "🇩🇪",
    tagline: "Europe's Largest Economy & Free Education",
    description: "Europe is a powerhouse of engineering and technology. With essentially free public university education and the new Opportunity Card, it is incredibly attractive for global talent.",
    stats: [
      { label: "Public Tuition", value: "€0 (mostly)" },
      { label: "Job Seekers", value: "Opportunity Card" },
      { label: "Economy", value: "Largest in EU" },
    ],
    visas: [
      {
        title: "Study Visa",
        description: "For applicants accepted into a German university. Requires a blocked account (Sperrkonto) to prove financial resources.",
        iconName: "GraduationCap",
      },
      {
        title: "Opportunity Card (Chancenkarte)",
        description: "A new points-based system allowing skilled non-EU citizens to enter Europe for one year to look for a job.",
        iconName: "Briefcase",
      },
      {
        title: "EU Blue Card",
        description: "A residence title for academics outside the EU who hold a recognized university degree and a job offer with a minimum salary threshold.",
        iconName: "Globe2",
      },
    ],
    faqs: [
      {
        q: "Is education really free in Europe?",
        a: "Yes, most public universities in Europe do not charge tuition fees for bachelor's and master's programs, only a small semester contribution.",
      },
      {
        q: "Do I need to speak German to work there?",
        a: "While many IT and multinational corporate jobs are English-only, having at least B1-level German significantly increases your job prospects and is required for PR.",
      },
    ],
  },
  "new-zealand": {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Beautiful Landscapes & Great Work-Life Balance",
    description: "New Zealand offers a peaceful, secure environment with excellent education standards and straightforward pathways to transition from study to work to residence.",
    stats: [
      { label: "Global Peace Index", value: "#2" },
      { label: "Post-Study Work", value: "Up to 3 Years" },
      { label: "Universities", value: "8 Public" },
    ],
    visas: [
      {
        title: "Fee Paying Student Visa",
        description: "Allows you to study full-time in New Zealand and work part-time up to 20 hours a week while studying.",
        iconName: "GraduationCap",
      },
      {
        title: "Post-Study Work Visa",
        description: "Work for any employer in New Zealand for up to 3 years after finishing an eligible qualification.",
        iconName: "Briefcase",
      },
      {
        title: "Skilled Migrant Category",
        description: "A points-based residency visa for people who have the skills, qualifications, and experience that New Zealand needs.",
        iconName: "Globe2",
      },
    ],
    faqs: [
      {
        q: "Can my partner work in New Zealand while I study?",
        a: "If you are studying a Level 7 or 8 qualification on the Green List, or a Level 9/10 qualification, your partner can apply for an open work permit.",
      },
    ],
  },
  japan: {
    id: "japan",
    name: "Japan",
    flag: "🇯🇵",
    tagline: "Land of the Rising Sun & Advanced Tech",
    description: "Japan is a global leader in technology, automotive engineering, and cultural influence. With its new pathways for highly skilled professionals and straightforward student visas, it offers a unique blend of modern innovation and deep-rooted tradition.",
    stats: [
      { label: "Tech Vacancies", value: "100k+ Yearly" },
      { label: "HSP PR Track", value: "As fast as 1 Year" },
      { label: "Quality of Life", value: "Top-Tier Safety" },
    ],
    visas: [
      {
        title: "Student Visa",
        description: "Allows international students to study at language schools, vocational colleges, or universities in Japan and work part-time up to 28 hours a week.",
        iconName: "GraduationCap",
      },
      {
        title: "Highly Skilled Professional (HSP)",
        description: "A points-based work visa offering priority processing, a 5-year stay, and a fast-track route to permanent residency in 1-3 years.",
        iconName: "Briefcase",
      },
      {
        title: "Standard Working Visa",
        description: "For professionals with job offers in Engineering, Humanities, International Services, or specified skilled worker programs.",
        iconName: "Building",
      },
    ],
    faqs: [
      {
        q: "What is the Certificate of Eligibility (CoE)?",
        a: "A document issued by the Japanese immigration authorities that serves as prima facie evidence that you meet the requirements for entering Japan under a specific visa category. It is required before applying for the actual visa at the embassy.",
      },
      {
        q: "How does the fast-track PR for Highly Skilled Professionals work?",
        a: "Under the points-based system, if you score 70 points, you can apply for permanent residency after 3 years. If you score 80 points or more, you can apply after just 1 year of residence.",
      },
    ],
  },
  schengen: {
    id: "schengen",
    name: "Europe (Schengen)",
    flag: "🇪🇺",
    tagline: "Access 27 Countries with One Visa",
    description: "The Schengen area represents 27 European countries that have abolished border controls between their mutual borders, offering unparalleled travel and business mobility.",
    stats: [
      { label: "Member States", value: "27 Countries" },
      { label: "Visa Validity", value: "Up to 5 Years" },
      { label: "Population", value: "400+ Million" },
    ],
    visas: [
      {
        title: "Schengen Tourist Visa (Type C)",
        description: "Allows short stays of up to 90 days within any 180-day period for tourism, family visits, or business across all 27 member states.",
        iconName: "Plane",
      },
      {
        title: "National Visa (Type D)",
        description: "For long-term stays (over 90 days) for studying, working, or residing permanently in a specific Schengen country.",
        iconName: "Building",
      },
    ],
    faqs: [
      {
        q: "Which country should I apply to for a Schengen visa?",
        a: "You must apply to the embassy of the country that is your primary destination (where you will spend the most days). If spending equal time, apply to the country of first entry.",
      },
      {
        q: "Does the Schengen visa allow me to work?",
        a: "No, the standard Type C Schengen visa is for tourism, business meetings, and visits only. You need a National Type D visa to work.",
      },
    ],
  },
};
