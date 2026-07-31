export interface ServiceDetail {
  id: string;
  title: string;
  category: "student" | "work" | "pr" | "tourist" | "business" | "coaching";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  headline: string;
  subheadline: string;
  introduction: string;
  features: string[];
  requirements: string[];
  pathway: { step: number; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  stats: { label: string; value: string }[];
  popularFor: string[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "usa-student-visa": {
    id: "usa-student-visa",
    title: "USA Student Visa (F-1)",
    category: "student",
    metaTitle: "USA Student Visa (F-1) Services | VisaEnsure",
    metaDescription: "Apply for a USA Student Visa with VisaEnsure. Get end-to-end guidance from university selection to F-1 visa interview prep with our 98% success rate.",
    keywords: ["USA student visa", "F1 visa Hyderabad", "study in USA", "I-20 visa assistance", "US university applications"],
    headline: "Fulfill Your American Dream with VisaEnsure",
    subheadline: "Expert guidance through I-20 acquisition, SEVIS payment, and the crucial F-1 consular interview.",
    introduction: "Studying in the USA is a gateway to unmatched academic excellence and global career opportunities. The F-1 Student Visa is the primary pathway for international students seeking to pursue higher education at accredited US universities. VisaEnsure provides comprehensive support, ensuring your profile is presented with elite polish.",
    features: [
      "Ivy League & Top-Tier University Shortlisting",
      "I-20 Form Assistance & Documentation Auditing",
      "Tailored SOP & Letter of Recommendation Review",
      "Consular Mock Interviews (Interactive Guidance)",
      "Financial Document Structuring & Verification Support"
    ],
    requirements: [
      "Valid passport (minimum 6 months validity)",
      "Form I-20 (Certificate of Eligibility) from an approved US school",
      "SEVIS fee payment confirmation (Form I-901)",
      "DS-160 confirmation page & visa interview appointment letter",
      "Proof of financial capability (tuition fee + living expenses)",
      "Academic transcripts & English proficiency test scores (IELTS/TOEFL/Duolingo)"
    ],
    pathway: [
      { step: 1, title: "Profiling & University Shortlisting", desc: "Our counselors evaluate your academic background, test scores, and career goals to shortlist target universities. We focus on institutions with high visa success rates and strong alumni networks." },
      { step: 2, title: "Application & I-20 Procurement", desc: "We guide you through the application process, editing your Statement of Purpose (SOP) and Letters of Recommendation (LORs). Upon acceptance, we assist in securing your official Form I-20." },
      { step: 3, title: "SEVIS Fee & DS-160 Filing", desc: "We navigate the SEVIS system to pay your I-901 fee. Simultaneously, our experts meticulously fill out your DS-160 nonimmigrant visa application, ensuring zero discrepancies." },
      { step: 4, title: "Financial Dossier Preparation", desc: "We audit your bank statements, education loan sanction letters, and CA asset valuations to prove you have sufficient liquid funds to cover tuition and living expenses." },
      { step: 5, title: "Consular Mock Interviews", desc: "The US visa interview is subjective. We conduct multiple one-on-one mock interview sessions focusing on body language, intent verification, and concise answers." },
      { step: 6, title: "Biometrics & Visa Stamping", desc: "We schedule your OFC (Biometrics) and Consular interview appointments. Post-approval, we provide comprehensive pre-departure briefings regarding US immigration at the port of entry." }
    ],
    faqs: [
      { q: "What is the minimum bank balance required for a USA Student Visa?", a: "You generally need to show funds covering the first year of tuition, fees, and living expenses as specified on your I-20 form, along with evidence of source of funds for the remaining duration of your course." },
      { q: "When should I start the visa application process?", a: "It is ideal to start as soon as you receive your I-20. The F-1 visa can be issued up to 365 days before your course start date, but you cannot enter the USA more than 30 days before the start date." }
    ],
    stats: [
      { label: "Visa Success Rate", value: "98.4%" },
      { label: "Partner Universities", value: "350+" },
      { label: "Avg. Processing Time", value: "15-30 Days" }
    ],
    popularFor: ["Stanford", "MIT", "NYU", "UC Berkeley", "USC"]
  },
  "canada-pr": {
    id: "canada-pr",
    title: "Canada Permanent Residency (PR)",
    category: "pr",
    metaTitle: "Canada PR Visa Services | Express Entry & PNP | VisaEnsure",
    metaDescription: "Acquire Canadian Permanent Residency through Express Entry and Provincial Nominee Programs. Trusted consultants in Hyderabad for Canada PR.",
    keywords: ["Canada PR", "Express Entry", "PNP Canada", "CRS Score Calculator", "Immigrate to Canada"],
    headline: "Secure Your Future in Canada",
    subheadline: "Your pathway to permanent residency, citizenship, and world-class social benefits.",
    introduction: "Canada is recognized globally for its high quality of life, diverse culture, and welcoming immigration policies. Permanent Residency (PR) allows you to live, work, and study anywhere in Canada with access to universal healthcare and social benefits. VisaEnsure helps you optimize your CRS score and navigate the complex Express Entry and PNP frameworks.",
    features: [
      "Express Entry Profile Creation & Management",
      "Comprehensive CRS Score Optimization Strategy",
      "Provincial Nominee Program (PNP) Application Assistance",
      "Educational Credential Assessment (ECA) Guidance",
      "Pre- and Post-Landing Settlement Support"
    ],
    requirements: [
      "Proof of language proficiency (IELTS General or CELPIP)",
      "ECA report from WES or other designated assessment bodies",
      "Minimum 1 year of continuous skilled work experience",
      "Proof of funds (unless authorized to work in Canada with a valid job offer)",
      "Police clearance certificate (PCC) & medical clearance"
    ],
    pathway: [
      { step: 1, title: "Eligibility Assessment & ECA", desc: "We conduct a thorough initial CRS points audit and assist you in obtaining your Educational Credential Assessment (ECA) through WES or IQAS to validate your foreign degrees." },
      { step: 2, title: "Language Proficiency Strategy", desc: "We provide targeted coaching materials to help you ace the IELTS General or CELPIP exams, crucial for maximizing your language points in the Express Entry pool." },
      { step: 3, title: "Express Entry Profile Creation", desc: "Our specialists strategically create and submit your profile into the Express Entry pool, ensuring optimal NOC code selection to maximize your chances in category-based draws." },
      { step: 4, title: "Provincial Nominee Program (PNP)", desc: "If your CRS score is borderline, we actively monitor and apply for PNP streams (OINP, SINP, AINP) which award an additional 600 points upon nomination." },
      { step: 5, title: "Invitation to Apply (ITA)", desc: "Upon receiving an ITA, we meticulously compile your permanent residency application, including police clearances, medical exams, and detailed employment reference letters." },
      { step: 6, title: "COPR & Landing Services", desc: "After final approval, you receive your Confirmation of Permanent Residence (COPR). We provide comprehensive pre-landing orientation to prepare you for life in Canada." }
    ],
    faqs: [
      { q: "What is a good CRS score for Express Entry?", a: "While the cut-off fluctuates, scores above 500 are highly competitive. For scores below that, we specialize in targeting PNP nominations which award an additional 600 points." },
      { q: "How long does the Canada PR process take?", a: "Once an ITA is received, Express Entry applications are typically processed within 6 to 8 months. PNP pathways may take slightly longer." }
    ],
    stats: [
      { label: "Successful Settlers", value: "3,200+" },
      { label: "PNP Nominations", value: "95%" },
      { label: "Avg. Processing Time", value: "6-8 Months" }
    ],
    popularFor: ["Toronto", "Vancouver", "Montreal", "Calgary"]
  },
  "uk-work-visa": {
    id: "uk-work-visa",
    title: "UK Work Visa (Skilled Worker)",
    category: "work",
    metaTitle: "UK Skilled Worker Visa Consultancy | VisaEnsure",
    metaDescription: "Secure a UK Skilled Worker Visa. Get end-to-end support for Certificate of Sponsorship (CoS), job matching advice, and visa filing with VisaEnsure.",
    keywords: ["UK Skilled Worker Visa", "CoS UK", "UK Job sponsorship", "Immigrate to UK", "UK work permit"],
    headline: "Advance Your Career in the United Kingdom",
    subheadline: "Professional support for securing your Skilled Worker Visa and building a long-term career in the UK.",
    introduction: "The UK's Skilled Worker Visa allows qualified professionals to relocate to the UK for long-term employment with an approved employer. It provides a direct pathway to Indefinite Leave to Remain (ILR) and citizenship. VisaEnsure offers strategic auditing of job offers, sponsorship letters, and application filing.",
    features: [
      "Certificate of Sponsorship (CoS) Document Verification",
      "Employer Legitimacy & Sponsorship License Auditing",
      "Salary Threshold & SOC Code Matching Verification",
      "Dependent Visa Processing for Spouse & Children",
      "Priority & Super Priority Processing Coordination"
    ],
    requirements: [
      "Valid Certificate of Sponsorship (CoS) from a licensed UK sponsor",
      "Job offer meeting the minimum salary threshold and skill level",
      "Proof of English language proficiency (IELTS UKVI or equivalent)",
      "Sufficient personal savings (maintenance funds) or employer certification",
      "Tuberculosis test results (for applicants from designated countries like India)"
    ],
    pathway: [
      { step: 1, title: "Job Offer & Sponsorship Verification", desc: "Before any visa filing, we conduct a strict audit of your job offer to ensure the employer holds an A-rated UK Sponsorship License and the role matches a valid Standard Occupational Classification (SOC) code." },
      { step: 2, title: "Certificate of Sponsorship (CoS)", desc: "We audit the generated CoS to verify the 'Defined' or 'Undefined' status, ensuring the salary meets the minimum threshold requirement for the specific SOC code." },
      { step: 3, title: "Immigration Health Surcharge (IHS)", desc: "We calculate and process your mandatory IHS payments, which grants you access to the UK's National Health Service (NHS) for the duration of your visa." },
      { step: 4, title: "Document Collation & Translation", desc: "We assemble your degree certificates, UKVI IELTS certification for English proficiency, TB test results, and maintenance funds evidence, ensuring all foreign documents are legally translated." },
      { step: 5, title: "Online Submission & Priority Processing", desc: "Our team submits your application on the UK Gov portal. We can opt for Priority or Super Priority processing to expedite your decision from 3 weeks down to 24 hours." },
      { step: 6, title: "Biometrics & BRP Collection", desc: "You will attend a VFS Global appointment for biometrics. Upon arrival in the UK, we guide you on collecting your Biometric Residence Permit (BRP)." }
    ],
    faqs: [
      { q: "Can my family join me on a UK Skilled Worker Visa?", a: "Yes, your spouse/partner and dependent children can apply as your dependents. They will have full rights to study and work in the UK." },
      { q: "What is the Immigration Health Surcharge (IHS)?", a: "It is a mandatory fee paid to access the UK's National Health Service (NHS) during your stay. The fee depends on the length of your visa." }
    ],
    stats: [
      { label: "Approved Visas", value: "1,800+" },
      { label: "Sponsor Connections", value: "120+" },
      { label: "Avg. Processing Time", value: "3-4 Weeks" }
    ],
    popularFor: ["London", "Manchester", "Birmingham", "Edinburgh"]
  },
  "australia-pr": {
    id: "australia-pr",
    title: "Australia PR (Subclass 189/190/491)",
    category: "pr",
    metaTitle: "Australia PR Subclass 189 & 190 Visa Consultants | VisaEnsure",
    metaDescription: "Apply for Australia PR. Skilled Independent (189) & Skilled Nominated (190) visa consultation. Calculate your points and apply with VisaEnsure.",
    keywords: ["Australia PR", "Subclass 189", "Subclass 190", "Skills Assessment Australia", "PR to Australia"],
    headline: "Live and Work in Australia Permanently",
    subheadline: "Expert assistance for Skills Assessment, State Nomination, and PR Expression of Interest (EOI).",
    introduction: "Australia offers high salaries, beautiful landscapes, and a clean environment. The General Skilled Migration program allows skilled professionals to live and work in Australia as permanent residents without needing employer sponsorship. VisaEnsure handles your Skills Assessment, EOI, and state nomination applications with expertise.",
    features: [
      "Detailed Skills Assessment Case Preparation (ACS, Engineers Australia, VETASSESS, etc.)",
      "Points Test Calculation & Strategy for Maximization",
      "State Sponsorship Application (Subclass 190 / 491)",
      "Expression of Interest (EOI) Profile Creation",
      "Spouse Points Claim Optimization & Documentation"
    ],
    requirements: [
      "Age under 45 years at the time of invitation",
      "Positive Skills Assessment in an occupation on the skilled list",
      "Competent English (IELTS Score 6+ in each band or PTE equivalent)",
      "Minimum points score of 65 points (higher points increase invitation chances)",
      "Good health and character certifications"
    ],
    pathway: [
      { step: 1, title: "Skills Assessment & Consultation", desc: "We evaluate your academic and professional history to select the perfect ANZSCO code. We then compile and submit a flawless application to the relevant assessing authority (ACS, Engineers Australia, VETASSESS, etc.)." },
      { step: 2, title: "Language Proficiency & Points Maximization", desc: "We guide you towards achieving superior English scores (PTE/IELTS) and claim maximum points for partner skills, NAATI CCL, or regional study to boost your total score." },
      { step: 3, title: "Expression of Interest (EOI) Submission", desc: "Our specialists create a compelling profile in the SkillSelect system, accurately reflecting your verified points to attract federal or state governments." },
      { step: 4, title: "State Sponsorship Nomination (190/491)", desc: "For candidates needing extra points, we prepare and lodge state sponsorship applications, navigating the specific and frequently changing requirements of states like NSW, VIC, or SA." },
      { step: 5, title: "Invitation to Apply (ITA) & Visa Lodgment", desc: "Once invited, we meticulously compile your permanent residency visa application, ensuring all claims made in the EOI are backed by airtight documentary evidence." },
      { step: 6, title: "Medicals & Visa Grant", desc: "We guide you through the required health examinations and police clearances. After processing, you receive your visa grant, allowing you to live and work in Australia." }
    ],
    faqs: [
      { q: "What is the difference between Subclass 189 and 190?", a: "Subclass 189 is a federal points-tested PR visa allowing you to live anywhere. Subclass 190 requires nomination by an Australian state, and you must live in that state for the first 2 years." },
      { q: "Which language test is easiest for Australia PR?", a: "Most applicants prefer the PTE Academic as it is computer-based, has faster results, and is generally considered easier to score high points (equivalent to IELTS 7 or 8)." }
    ],
    stats: [
      { label: "Successful Migrants", value: "2,500+" },
      { label: "Positive Assessments", value: "99.1%" },
      { label: "Avg. Processing Time", value: "8-10 Months" }
    ],
    popularFor: ["Sydney", "Melbourne", "Brisbane", "Perth"]
  },
  "europe-job-seeker-visa": {
    id: "europe-job-seeker-visa",
    title: "Europe Opportunity Card / Job Seeker",
    category: "work",
    metaTitle: "Europe Opportunity Card (Chancenkarte) & Job Seeker Visa | VisaEnsure",
    metaDescription: "Migrate to Europe using the new Opportunity Card (Chancenkarte). Expert counseling, points calculation, and visa processing by VisaEnsure.",
    keywords: ["Europe Opportunity Card", "Chancenkarte", "Job seeker Europe", "German work visa", "Europe PR"],
    headline: "Accelerate Your Tech & Engineering Career in Europe",
    subheadline: "Utilize the new Opportunity Card (Chancenkarte) points system or Job Seeker Visa to find work in Europe's largest economy.",
    introduction: "Europe has introduced the Opportunity Card (Chancenkarte) based on a points system, alongside the traditional Job Seeker Visa. These options allow skilled professionals to move to Europe and search for qualified employment. VisaEnsure provides complete guidance on mapping your credentials, checking points, and preparing the visa application.",
    features: [
      "Europe Opportunity Card Points Analysis & Strategy",
      "Anabin University Registration & ZAB Credential Evaluation",
      "German Format Resume & Cover Letter Styling",
      "Blocked Account Opening Assistance",
      "Consular Visa Appointment Scheduling & Interview Coaching"
    ],
    requirements: [
      "University degree or recognized vocational qualification",
      "For Chancenkarte: Achieve at least 6 points in the points system",
      "Language proficiency: German (A1+) or English (B2+)",
      "Proof of financial self-sufficiency (approximately €1,027 per month via blocked account)",
      "Travel and health insurance cover for the duration of stay"
    ],
    pathway: [
      { step: 1, title: "Credentials Verification & Anabin Check", desc: "We verify if your university and degree are recognized as 'H+' on the German Anabin database. If not, we assist with obtaining a Statement of Comparability from ZAB." },
      { step: 2, title: "Chancenkarte Points Audit", desc: "We calculate your points based on qualifications, language skills, age, and professional experience, ensuring you meet the strict minimum threshold." },
      { step: 3, title: "Blocked Account & Insurance Setup", desc: "We guide you through opening a blocked bank account in Europe (e.g., Coracle, Expatrio) and depositing the required maintenance funds, alongside securing valid health insurance." },
      { step: 4, title: "Professional Profile Localization", desc: "Our experts revamp your CV and Cover Letter to strictly adhere to German corporate standards, significantly boosting your job application success rate." },
      { step: 5, title: "Visa Documentation & Interview Prep", desc: "We compile your visa dossier and conduct mock interviews to prepare you for the consular appointment at the German Embassy or VFS." },
      { step: 6, title: "Relocation & Job Hunting Support", desc: "Land in Europe with confidence. We provide strategies for navigating the German job market and instructions on converting your Opportunity Card to a Work Residence Permit." }
    ],
    faqs: [
      { q: "What is the new Europe Opportunity Card (Chancenkarte)?", a: "It is a point-based visa that allows workers to enter Europe to look for a job. You need a minimum of 6 points based on language skills, experience, age, and links to Europe." },
      { q: "Is German language mandatory for the Job Seeker Visa?", a: "While English B2 is sufficient if you target English-speaking tech/engineering roles, basic German (A1/A2) is highly recommended and adds points under the Chancenkarte system." }
    ],
    stats: [
      { label: "Visa Approvals", value: "950+" },
      { label: "Points Assessments", value: "100%" },
      { label: "Avg. Processing Time", value: "6-8 Weeks" }
    ],
    popularFor: ["Berlin", "Munich", "Frankfurt", "Stuttgart"]
  },
  "tourist-visa": {
    id: "tourist-visa",
    title: "Tourist & Visitor Visas",
    category: "tourist",
    metaTitle: "Tourist & Visitor Visa Services | USA, Europe, UK | VisaEnsure",
    metaDescription: "Apply for tourist visas to USA (B1/B2), Schengen Area, UK, and Australia. Fast processing, elite documentation, and itinerary planning by VisaEnsure.",
    keywords: ["Schengen visa", "USA B1 B2 visa", "UK visitor visa", "Tourist visa consultants", "Europe tourist visa"],
    headline: "Explore The World With Peace of Mind",
    subheadline: "Worry-free tourist visa applications for USA, UK, Schengen, Canada, and Australia.",
    introduction: "Traveling for leisure, business meetings, or visiting family should be exciting, not stressful. Tourist and visitor visas require meticulous documentation to prove your travel purpose and ties to your home country. VisaEnsure organizes your financial proofs, day-by-day itineraries, and flight bookings, maximizing approval chances.",
    features: [
      "Day-by-Day Customized Travel Itineraries",
      "Schengen Flight & Hotel Dummy Bookings (Verifiable)",
      "Financial Document Optimization & Sponsorship Letters",
      "Online Application Submission & Fee Payments",
      "DS-160 Filing & Consular Interview Practice"
    ],
    requirements: [
      "Valid passport with at least 6 months validity & blank pages",
      "Proof of stable income (Salary slips, Form 16, and 3-year ITR)",
      "Bank statements showing sufficient funds for the travel expenses",
      "No Objection Certificate (NOC) from employer or school",
      "Confirmed round-trip flight bookings and hotel reservations"
    ],
    pathway: [
      { step: 1, title: "Destination Profiling & Strategy", desc: "We analyze your travel history, financial standing, and ties to your home country to build a personalized, high-success strategy for your target destination (USA, UK, Schengen, etc.)." },
      { step: 2, title: "Financial Document Optimization", desc: "Our financial experts audit your bank statements, income tax returns (ITR), and salary slips to ensure they meet the stringent liquidity requirements of the consulate." },
      { step: 3, title: "Itinerary & Reservation Planning", desc: "We craft detailed, day-by-day travel itineraries and arrange verifiable dummy flight bookings and hotel reservations to substantiate your travel plans without upfront financial risk." },
      { step: 4, title: "Application Form & Fee Processing", desc: "We meticulously fill out complex visa forms (like the DS-160 for the USA) and handle the secure payment of consular and biometric fees on your behalf." },
      { step: 5, title: "Consular Interview & Biometrics", desc: "We schedule your appointments and provide intensive mock interview sessions to confidently articulate your purpose of visit and intent to return." },
      { step: 6, title: "Visa Issuance & Travel Briefing", desc: "Collect your passport with the stamped tourist visa. We provide essential port-of-entry tips to ensure a smooth transition through immigration." }
    ],
    faqs: [
      { q: "What is a Schengen Visa?", a: "It is a short-stay visa allowing you to travel to any of the 29 member countries in the European Schengen Zone for up to 90 days in any 180-day period." },
      { q: "How do I prove strong ties to my home country?", a: "You prove this through stable employment, property ownership, financial assets, business registrations, and family dependencies in your country of residence." }
    ],
    stats: [
      { label: "Visas Stamped", value: "8,500+", },
      { label: "Approval Rating", value: "99.4%" },
      { label: "Avg. Processing Time", value: "10-15 Days" }
    ],
    popularFor: ["Switzerland", "France", "USA", "Singapore", "Dubai"]
  },
  "h1b-visa": {
    id: "h1b-visa",
    title: "US H1B Work Visa",
    category: "work",
    metaTitle: "US H1B Specialty Occupation Visa Services | VisaEnsure",
    metaDescription: "Apply for H1B visa petitions, cap gap, LCA filings, and embassy stamping. Experienced H1B consultancy in Hyderabad.",
    keywords: ["H1B visa", "US work visa", "LCA filing", "US specialty occupation", "US visa stamping"],
    headline: "Transition To H1B Specialty Occupation",
    subheadline: "Expert assistance for H-1B registration, LCA, petition drafting, and consular stamping.",
    introduction: "The H-1B visa is a non-immigrant visa that allows US employers to temporarily employ foreign workers in specialty occupations that require a bachelor's degree or equivalent. VisaEnsure supports employers and candidates through the lottery process, LCA filing, petition submission, and embassy interview coaching.",
    features: [
      "H1B Cap Lottery Registration Guidance",
      "Labor Condition Application (LCA) Support",
      "Comprehensive Form I-129 Petition Auditing",
      "Specialty Occupation & RFEs Response Consulting",
      "Consular Interview Preparation & DS-160 Assistance"
    ],
    requirements: [
      "A valid job offer from a US employer for a specialty occupation",
      "Bachelor's degree or higher (or equivalent work experience)",
      "Approved Labor Condition Application (LCA) from the Dept. of Labor",
      "Approved Form I-129 petition from USCIS",
      "Valid passport and academic/professional credential evaluation"
    ],
    pathway: [
      { step: 1, title: "Cap Lottery Registration Strategy", desc: "We coordinate with your US employer to correctly register your profile in the electronic H-1B cap lottery during the brief March window, maximizing selection odds." },
      { step: 2, title: "Labor Condition Application (LCA)", desc: "Upon selection, we assist the employer in filing and obtaining an approved LCA from the Department of Labor, verifying wage levels and working conditions." },
      { step: 3, title: "I-129 Petition Drafting & Auditing", desc: "Our specialists compile a robust I-129 petition, structuring the job description to definitively prove the role qualifies as a 'Specialty Occupation'." },
      { step: 4, title: "USCIS Filing & RFE Management", desc: "We submit the complete package to USCIS. Should a Request for Evidence (RFE) be issued, our experts draft comprehensive, legally sound responses to secure approval." },
      { step: 5, title: "DS-160 & Consular Appointment", desc: "After petition approval (I-797), we complete your DS-160, process the MRV fee, and book your OFC (Biometrics) and Consular interviews." },
      { step: 6, title: "Interview Prep & Stamping", desc: "We conduct mock interviews to prepare you for common H-1B consular questions. Upon approval, receive your stamped visa and travel." }
    ],
    faqs: [
      { q: "What is an RFE in H-1B processing?", a: "A Request for Evidence (RFE) is issued by USCIS if they need additional proof that the position qualifies as a specialty occupation or that the candidate meets the qualifications." },
      { q: "How long is the H-1B visa valid?", a: "It is initially granted for up to 3 years and can be extended up to a maximum of 6 years, with further extensions possible if a green card petition is pending." }
    ],
    stats: [
      { label: "Successful Petitions", value: "720+" },
      { label: "RFE Success Rate", value: "94.8%" },
      { label: "Avg. Processing Time", value: "2-3 Months" }
    ],
    popularFor: ["Silicon Valley", "New York", "Texas", "Seattle"]
  },
  "ielts-coaching": {
    id: "ielts-coaching",
    title: "IELTS / PTE / TOEFL Coaching",
    category: "coaching",
    metaTitle: "IELTS, PTE & TOEFL Preparation Classes in Hyderabad | VisaEnsure",
    metaDescription: "Score 8+ bands in IELTS and 79+ in PTE. Professional training with master trainers, mock tests, and custom study material at VisaEnsure.",
    keywords: ["IELTS coaching Hyderabad", "PTE training", "TOEFL preparation", "English proficiency", "IELTS online classes"],
    headline: "Achieve Target Scores on Your First Attempt",
    subheadline: "Elite English test training with master instructors, customized study plans, and regular mocks.",
    introduction: "High scores in IELTS, PTE, or TOEFL are essential for university admissions and visa approvals. Our coaching division offers structured courses focusing on all four language modules: Listening, Reading, Writing, and Speaking, to help you achieve your goals quickly.",
    features: [
      "Certified Master Trainers with 10+ Years Experience",
      "Comprehensive Study Materials & Simulated Test Software",
      "One-on-One Speaking Practice & Personalized Feedback",
      "Daily Essay Corrections & Writing Strategy Workshops",
      "Weekly Full-Length Mock Exams & Score Analysis"
    ],
    requirements: [
      "Basic English communication skills",
      "Commitment to standard class schedules (Online or Offline)",
      "Daily practice of homework and module-specific templates"
    ],
    pathway: [
      { step: 1, title: "Diagnostic Test", desc: "Take a baseline test to analyze your strengths and weaknesses in each section." },
      { step: 2, title: "Core Skills Training", desc: "Master the structure, timing, question types, and scoring criteria for all modules." },
      { step: 3, title: "Strategy Workshops", desc: "Learn specialized time-saving strategies and templates for writing and speaking." },
      { step: 4, title: "Intensive Mocks", desc: "Participate in simulated, timed exams to build stamina and identify remaining gaps." },
      { step: 5, title: "Exam Booking & Success", desc: "Book your official exam slot, receive pre-exam review tips, and score your target band." }
    ],
    faqs: [
      { q: "What score do I need for Canada PR?", a: "For Canada PR, you should aim for CLB 9, which corresponds to IELTS General scores of Listening 8, Reading 7, Writing 7, and Speaking 7." },
      { q: "How long is the IELTS coaching program?", a: "Our standard program runs for 4 to 6 weeks, with flexible morning, evening, and weekend batches." }
    ],
    stats: [
      { label: "Average IELTS Band", value: "7.8" },
      { label: "Average PTE Score", value: "76" },
      { label: "Successful Students", value: "4,500+" }
    ],
    popularFor: ["IELTS Academic", "IELTS General", "PTE Academic", "TOEFL iBT"]
  },
  "business-visa": {
    id: "business-visa",
    title: "Business & Investor Visa",
    category: "business",
    metaTitle: "Business & Investor Visa Services | VisaEnsure",
    metaDescription: "Expand your business globally. Complete guidance on international entrepreneur streams, startup visas, and investor pathways with VisaEnsure.",
    keywords: ["business visa", "investor visa", "startup visa", "entrepreneur visa", "corporate expansion"],
    headline: "Expand Your Enterprise Globally",
    subheadline: "Strategic consultation for entrepreneurs, corporate executives, and high-net-worth investors.",
    introduction: "Establishing a business presence abroad offers significant growth opportunities. Our business visa services assist entrepreneurs and corporations in navigating foreign investment rules, business registration, and visa compliance to ensure a seamless expansion.",
    features: [
      "Investor Stream Eligibility & Assessment",
      "Business Plan Review & Localization",
      "Startup Incubator Endorsement Assistance",
      "Corporate Relocation & Entity Setup Support",
      "Consular Meeting Preparation & Auditing"
    ],
    requirements: [
      "Proof of substantial investment capital or net worth",
      "Detailed business plan showing economic benefit to host country",
      "Relevant business ownership or senior management experience",
      "Source of funds verification and audit reports",
      "Corporate registration documents and tax clearance certificates"
    ],
    pathway: [
      { step: 1, title: "Investment Strategy Formulation", desc: "We evaluate your financial profiles and business goals to select the most favorable destination country and investor/entrepreneur stream." },
      { step: 2, title: "Business Plan Drafting & Localization", desc: "Our economic analysts draft a comprehensive, country-specific business plan highlighting job creation, local economic impact, and commercial viability." },
      { step: 3, title: "Endorsement & Entity Registration", desc: "We guide you in securing endorsements from designated bodies (such as venture capital funds or incubators) and registering your corporate entity." },
      { step: 4, title: "Source of Funds Verification", desc: "A rigorous audit of your personal and corporate assets is conducted to legally verify the legitimate origin of all investment capital." },
      { step: 5, title: "Visa Application Lodgment", desc: "We compile all corporate registries, local bank balances, and business plans into a flawless application package for submission to the consulate." },
      { step: 6, title: "Stamping & Landing Briefing", desc: "After visa approval, we provide essential briefings on tax compliance, local corporate laws, and operational protocols in the destination country." }
    ],
    faqs: [
      { q: "What is the minimum investment required for a Startup Visa?", a: "Minimum investment requirements vary significantly by country. For example, Canada requires no personal investment for designated incubator streams, whereas other countries may require €100,000+." },
      { q: "Can I bring my business partners on the same application?", a: "Yes, under specific Startup Visa streams (like Canada's SUV), up to 5 co-founders can apply together on a single project." }
    ],
    stats: [
      { label: "Successful Enterprises", value: "380+" },
      { label: "Capital Deployed", value: "$45M+" },
      { label: "Avg. Processing Time", value: "3-6 Months" }
    ],
    popularFor: ["Canada SUV", "USA E-2", "UK Innovator", "Schengen Golden Visa"]
  },
  "dependent-visa": {
    id: "dependent-visa",
    title: "Dependent & Family Visa",
    category: "pr",
    metaTitle: "Dependent & Family Reunification Visa Services | VisaEnsure",
    metaDescription: "Bring your loved ones abroad. Reliable spousal open work permits, child study visas, and family reunification guidance with VisaEnsure.",
    keywords: ["dependent visa", "spousal open work permit", "family reunification", "child visa", "spouse visa"],
    headline: "Keep Your Family Together",
    subheadline: "Smooth and secure spousal work permits, child study permits, and family reunion visas.",
    introduction: "Relocating abroad is a major milestone, and keeping your family close is essential. Our dependent visa services help you bring your spouse, children, or parents to your new country with full legal permissions to study or work.",
    features: [
      "Spousal Open Work Permit (SOWP) Specialist Filing",
      "Child School Admission & Study Permit Guidance",
      "Family Sponsorship Sufficiency Auditing",
      "Relationship Authenticity Dossier Compilation",
      "Fast-Track Reunification Case Building"
    ],
    requirements: [
      "Valid status document of the primary applicant (Work Permit, PR, or Study Permit)",
      "Proof of authentic relationship (marriage certificate, birth certificate, household register)",
      "Financial proof showing ability to support all dependents",
      "Biometric details, police clearances, and medical examinations",
      "Detailed sponsorship letter stating arrangement of accommodation"
    ],
    pathway: [
      { step: 1, title: "Eligibility & Linkage Check", desc: "We review the primary applicant's current visa status, job level (e.g., TEER category in Canada), or course level to verify eligibility to sponsor dependents." },
      { step: 2, title: "Financial Sufficiency Audit", desc: "We audit bank balances, employment letters, and tax records to ensure you meet the minimum income requirements to support dependents." },
      { step: 3, title: "Relationship Authenticity Dossier", desc: "To prevent refusals based on relationship doubts, we compile an extensive portfolio of shared finances, photos, and communication history." },
      { step: 4, title: "Online Application Package", desc: "We meticulously draft and link the dependent visa applications (work or study permits) with the primary applicant's active file on VFS or immigration portals." },
      { step: 5, title: "Biometric & Medical Scheduling", desc: "We coordinate VFS biometric bookings and guide you through the authorized panel physician medical checkups." },
      { step: 6, title: "Visa Stamping & Arrival Setup", desc: "Upon passport request, we handle the stamping. We then assist with pre-departure logistics, insurance, and airport arrival documentation." }
    ],
    faqs: [
      { q: "Can my spouse work full-time on a dependent visa?", a: "In major destinations like Canada, Australia, and the UK, spouses of qualifying skilled workers receive an Open Work Permit, allowing them to work for any employer." },
      { q: "How long does a Dependent Visa take to process?", a: "Processing times vary from 4 weeks to 4 months depending on the country, the primary applicant's status, and whether the application is submitted concurrently." }
    ],
    stats: [
      { label: "Families Reunited", value: "1,500+" },
      { label: "Approval Success", value: "98.9%" },
      { label: "Avg. Processing Time", value: "4-8 Weeks" }
    ],
    popularFor: ["Canada SOWP", "USA H-4", "UK Dependent", "Australia Subclass 500 Dependent"]
  }
};
