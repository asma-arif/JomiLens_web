const mockDatabase = {
  "PLOT-102": {
    plotId: "PLOT-102",
    khatian: "K-8821",
    dag: "D-102",
    mouza: "Badda, Dhaka",
    area: "5.5 Decimal",
    owner: "Mohammad Tanvir Hossain",
    nid: "1988****4582",
    mutationStatus: "Verified & Up-to-date (2024)",
    riskLevel: "SAFE",
    riskTitle: "Clear & Verified Title",
    riskDesc: "No litigation, dispute, or govt acquisition found. Land ready for verification/purchase.",
    history: [
      { year: "2018", event: "Ownership Transfer", detail: "Purchased via Sale Deed #4021" },
      { year: "2019", event: "Mutation Complete", detail: "Khatian updated under current owner" },
      { year: "2024", event: "Tax Clearance", detail: "Land Development Tax paid" }
    ],
    coords: [23.7805, 90.4267]
  },
  "PLOT-405": {
    plotId: "PLOT-405",
    khatian: "K-1044",
    dag: "D-405",
    mouza: "Tejgaon, Dhaka",
    area: "8.2 Decimal",
    owner: "Rafiqul Islam (Disputed)",
    nid: "1975****1120",
    mutationStatus: "Halted / Subject to Order",
    riskLevel: "HIGH",
    riskTitle: "High Risk - Ongoing Litigation",
    riskDesc: "Active High Court Stay Order (Civil Suit #104/2022). Risk of fraudulent title transfer.",
    history: [
      { year: "2015", event: "Original Ownership", detail: "Registered under Rahat Ali" },
      { year: "2022", event: "Litigation Filed", detail: "Injunction issued by Assistant Judge Court" }
    ],
    coords: [23.7590, 90.3925]
  },
  "PLOT-909": {
    plotId: "PLOT-909",
    khatian: "K-5501",
    dag: "D-909",
    mouza: "Dhanmondi, Dhaka",
    area: "12.0 Decimal",
    owner: "Government / Formerly S. Khan",
    nid: "Govt Reserved",
    mutationStatus: "Acquired Govt Property",
    riskLevel: "MEDIUM",
    riskTitle: "Medium Risk - Govt Acquisition",
    riskDesc: "Earmarked for Metro Rail Sector 4 Expansion under Gazette #881.",
    history: [
      { year: "2010", event: "Private Title", detail: "Recorded under S. Khan" },
      { year: "2021", event: "Acquisition Notice", detail: "Notice served under Land Acquisition Act" }
    ],
    coords: [23.7461, 90.3742]
  }
};

const translations = {
  en: {
    heroTitle: "Know the Land, Before You Buy.",
    heroDesc: "Bangladesh's premier AI-powered Citizen Pre-Purchase Verification platform.",
    searchBtn: "Search Verification",
    searchPlaceholder: "Enter Plot ID (e.g. PLOT-102, PLOT-405, PLOT-909)",
    warningText: "⚠️ Please enter a valid Plot ID, Dag, or Khatian number before searching!",
    aiHeader: "Jomilens AI Assistant",
    aiWelcome: "Hello! I am your Jomilens AI Legal Advisor. Ask me anything about land records, mutations, or verification status."
  },
  bn: {
    heroTitle: "জমি কেনার আগেই জানুন জমির আসল তথ্য।",
    heroDesc: "বাংলাদেশের প্রথম এআই-চালিত নাগরিক ভুমি প্রাক-ক্রয় যাচাইকরণ প্ল্যাটফর্ম।",
    searchBtn: "যাচাই করুন",
    searchPlaceholder: "প্লট আইডি লিখুন (যেমন: PLOT-102, PLOT-405, PLOT-909)",
    warningText: "⚠️ অনুসন্ধানের আগে একটি বৈধ প্লট আইডি, দাগ বা খতিয়ান নম্বর প্রদান করুন!",
    aiHeader: "জমিলেন্স এআই সহকারী",
    aiWelcome: "হ্যালো! আমি আপনার জমিলেন্স আইনি সহকারী। খতিয়ান, নামজারি বা ভূমি বিষয়ক প্রশ্ন করতে পারেন।"
  }
};

let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.innerText = currentLang === 'en' ? 'English / বাংলা' : 'বাংলা / English';

  const t = translations[currentLang];
  
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerText = t.heroTitle;

  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc) heroDesc.innerText = t.heroDesc;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  const warningText = document.getElementById('searchWarningText');
  if (warningText) warningText.innerText = t.warningText;
}

function handleSearch(plotIdInput) {
  const plotId = (plotIdInput || document.getElementById('searchInput')?.value || '').trim().toUpperCase();
  const warningBox = document.getElementById('searchWarning');

  if (!plotId) {
    if (warningBox) warningBox.style.display = 'block';
    return;
  }

  if (warningBox) warningBox.style.display = 'none';

  localStorage.setItem('selectedPlotId', plotId);
  window.location.href = 'result.html';
}

function sendAiMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  if (!input || !input.value.trim()) return;

  const userMsg = input.value.trim();
  
  const userDiv = document.createElement('div');
  userDiv.className = 'msg msg-user';
  userDiv.innerText = userMsg;
  chatBox.appendChild(userDiv);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'msg msg-bot';

    const lower = userMsg.toLowerCase();
    if (lower.includes('102') || lower.includes('safe')) {
      botDiv.innerText = "PLOT-102 is completely SAFE. Ownership is verified under Mohammad Tanvir Hossain with clear mutation records.";
    } else if (lower.includes('405') || lower.includes('dispute') || lower.includes('litigation')) {
      botDiv.innerText = "WARNING: PLOT-405 has an active High Court Stay Order (Civil Suit #104/2022). Do not proceed without legal settlement.";
    } else if (lower.includes('909') || lower.includes('govt') || lower.includes('acquired')) {
      botDiv.innerText = "PLOT-909 is marked under Govt Gazette #881 for Metro Rail Expansion. It is not available for private transfer.";
    } else {
      botDiv.innerText = "Jomilens AI: You can check land title safety by entering PLOT-102 (Safe), PLOT-405 (Disputed), or PLOT-909 (Govt Acquired).";
    }

    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}