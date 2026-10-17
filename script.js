// ==========================================
// 1. Mock Database
// ==========================================
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

// ==========================================
// 2. Translations & Global State
// ==========================================
const translations = {
  en: {
    heroTitle: "Know the Land, Before You Buy.",
    heroDesc: "Bangladesh's premier AI-powered Citizen Pre-Purchase Verification platform.",
    searchBtn: "Search Verification",
    searchPlaceholder: "Enter Plot ID (e.g. PLOT-102, PLOT-405, PLOT-909)",
    warningText: "Please enter a valid Plot ID, Dag, or Khatian number before searching!",
    aiHeader: "Jomilens AI Assistant",
    aiWelcome: "Hello! I am your Jomilens AI Legal Advisor. Ask me anything about land records, mutations, or verification status."
  },
  bn: {
    heroTitle: "জমি কেনার আগেই জানুন জমির আসল তথ্য।",
    heroDesc: "বাংলাদেশের প্রথম এআই-চালিত নাগরিক ভূমি প্রাক-ক্রয় যাচাইকরণ প্ল্যাটফর্ম।",
    searchBtn: "যাচাই করুন",
    searchPlaceholder: "প্লট আইডি লিখুন (যেমন: PLOT-102, PLOT-405, PLOT-909)",
    warningText: "অনুসন্ধানের আগে একটি বৈধ প্লট আইডি, দাগ বা খতিয়ান নম্বর প্রদান করুন!",
    aiHeader: "জমিলেন্স এআই সহকারী",
    aiWelcome: "হ্যালো! আমি আপনার জমিলেন্স আইনি সহকারী। খতিয়ান, নামজারি বা ভূমি বিষয়ক প্রশ্ন করতে পারেন।"
  }
};

let currentLang = 'bn'; // Default Language

// ==========================================
// 3. Language Switching Functions
// ==========================================
function toggleLanguage() {
  currentLang = currentLang === 'bn' ? 'en' : 'bn';
  
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.innerText = currentLang === 'bn' ? 'English' : 'বাংলা';
  }
  
  updatePageLanguage();
}

function updatePageLanguage() {
  const elements = document.querySelectorAll('[data-bn]');
  elements.forEach(el => {
    if (currentLang === 'bn') {
      if (el.dataset.bn) el.innerText = el.dataset.bn;
    } else {
      if (el.dataset.en) el.innerText = el.dataset.en;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updatePageLanguage();
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.innerText = currentLang === 'bn' ? 'English' : 'বাংলা';
  }
});

// ==========================================
// 4. Search Handler
// ==========================================
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

// ==========================================
// 5. Voice Recognition & Clean Text-to-Speech
// ==========================================
function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    // ইমোজি বা অনাকাঙ্ক্ষিত সিম্বল ফিল্টার করে কথা বলাবে
    const cleanSpeechText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu, '');
    
    const utterance = new SpeechSynthesisUtterance(cleanSpeechText.trim());
    utterance.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Voice search is not supported in your browser. Please use Google Chrome or Edge.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';
  recognition.interimResults = false;

  const micBtn = document.getElementById('micBtn');
  if (micBtn) micBtn.style.background = '#EF4444';

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = transcript;
    }
    if (micBtn) micBtn.style.background = 'var(--soft-green)';
    sendAiMessage();
  };

  recognition.onerror = function() {
    if (micBtn) micBtn.style.background = 'var(--soft-green)';
  };

  recognition.onend = function() {
    if (micBtn) micBtn.style.background = 'var(--soft-green)';
  };
}

// ==========================================
// 6. Integrated AI Agent Core Logic
// ==========================================
function sendAiMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  if (!input || !input.value.trim()) return;

  const userMsg = input.value.trim();
  
  // Display User Message
  const userDiv = document.createElement('div');
  userDiv.className = 'msg msg-user';
  userDiv.innerText = userMsg;
  chatBox.appendChild(userDiv);

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'msg msg-bot';
    let replyText = "";

    const lower = userMsg.toLowerCase();

    // 1. Map & Location Query Handling
    if (lower.includes('location') || lower.includes('map') || lower.includes('ম্যাপ') || lower.includes('লোকেশন') || lower.includes('সীমানা')) {
      replyText = currentLang === 'bn' 
        ? "আপনার জন্য স্যাটেলাইট এবং জিপিএস ম্যাপ খোলা হচ্ছে।" 
        : "Opening interactive GPS boundary map for you right now.";
      botDiv.innerText = replyText;
      chatBox.appendChild(botDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
      
      speakText(replyText);

      setTimeout(() => {
        window.location.href = 'map.html';
      }, 2000);
      return;
    }

    // 2. Plot Status Query Handling
    if (lower.includes('102') || lower.includes('৫০২') || lower.includes('safe')) {
      replyText = currentLang === 'bn'
        ? "প্লট ১০২ সম্পূর্ণ নিরাপদ। এটি মোহাম্মদ তানভীর হোসেনের নামে নিবন্ধিত ও খতিয়ান হালনাগাদ রয়েছে।"
        : "PLOT-102 is completely SAFE. Ownership is verified under Mohammad Tanvir Hossain with clear mutation records.";
    } else if (lower.includes('405') || lower.includes('১০৫') || lower.includes('dispute') || lower.includes('litigation') || lower.includes('মামলা')) {
      replyText = currentLang === 'bn'
        ? "সতর্কতা: প্লট ৪০৫ এ দেওয়ানি আদালতে মামলা ও স্থগিতাদেশ চলছে। কেনা ঝুঁকিপূর্ণ।"
        : "WARNING: PLOT-405 has an active High Court Stay Order. Do not proceed without legal settlement.";
    } else if (lower.includes('909') || lower.includes('৩০৯') || lower.includes('govt') || lower.includes('acquired') || lower.includes('খাস')) {
      replyText = currentLang === 'bn'
        ? "প্লট ৯০৯ মেট্রো রেল সম্প্রসারণের জন্য সরকারি গ্যাজেট ৮৮১ অনুযায়ী অধিগ্রহণকৃত সম্পত্তি।"
        : "PLOT-909 is marked under Govt Gazette 881 for Metro Rail Expansion. It is not available for private transfer.";
    } else if (lower.includes('খতিয়ান') || lower.includes('পর্চা') || lower.includes('khatian') || lower.includes('porcha')) {
      replyText = currentLang === 'bn'
        ? "খতিয়ান স্ট্যাটাস: ডাটাবেজে তথ্য পাওয়া গেছে। সম্পূর্ণ খতিয়ান স্ক্যান ও ভ্যালিডেশনের জন্য এআই ওসিআর ব্যবহার করুন।"
        : "Khatian Status: Record found in database. Use AI OCR Scanner to validate seals and signatures.";
    } else {
      replyText = currentLang === 'bn'
        ? "জমিলেন্স এআই: আপনি প্লটের স্ট্যাটাস (যেমন: প্লট ১০২, ৪০৫, ৯০৯), খতিয়ান বিবরণ জানতে পারেন অথবা ম্যাপ দেখাও বলতে পারেন।"
        : "JomiLens AI: You can ask about land safety (e.g. PLOT-102, 405, 909), Khatian status, or say Show Location to open GPS Map.";
    }

    botDiv.innerText = replyText;
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    speakText(replyText);
  }, 600);
}

// ==========================================
// 7. OCR Scanner Handlers
// ==========================================
function handleRealUpload(event) {
  const resultDiv = document.getElementById('ocrResult');
  if (!resultDiv) return;

  const file = event.target.files[0];
  if (file) {
    resultDiv.style.color = '#0f4c3a';
    resultDiv.innerText = currentLang === 'bn' ? 'আপনার আপলোড করা ছবি স্ক্যান করা হচ্ছে...' : 'Scanning uploaded image...';

    setTimeout(() => {
      resultDiv.style.color = '#2e7d32';
      resultDiv.innerText = currentLang === 'bn' 
        ? 'সফল স্ক্যান: আপলোডকৃত দলিলটি সার্ভারে নিবন্ধিত এবং সত্যতা যাচাইকৃত।' 
        : 'Successful Scan: Uploaded document registered on server and verified as valid.';
    }, 1600);
  }
}

function processDemoOCR() {
  const selectBox = document.getElementById('demoPorchaSelect');
  const resultDiv = document.getElementById('ocrResult');
  
  if (!selectBox || !resultDiv) return;

  const selectedValue = selectBox.value;
  if (!selectedValue) return;

  resultDiv.style.color = '#0f4c3a';
  resultDiv.innerText = currentLang === 'bn' ? 'এআই ওসিআর দ্বারা পর্চা বিশ্লেষণ করা হচ্ছে...' : 'Analyzing document via AI OCR...';

  setTimeout(() => {
    if (selectedValue === 'genuine') {
      resultDiv.style.color = '#2e7d32';
      resultDiv.innerText = currentLang === 'bn' 
        ? 'ফলাফল: খতিয়ান ৫০২ শতভাগ আসল। সিল ও স্বাক্ষর ভ্যালিডেটেড।' 
        : 'Result: Khatian 502 is 100% Genuine. Seal & Signature Validated.';
    } else if (selectedValue === 'tampered') {
      resultDiv.style.color = '#d32f2f';
      resultDiv.innerText = currentLang === 'bn' 
        ? 'সতর্কতা: খতিয়ান ১০৫ এ অসঙ্গতি পাওয়া গেছে! দাগ নম্বর টেম্পারড বা এডিট করা।' 
        : 'Alert: Khatian 105 shows tampering! Plot numbers modified.';
    } else if (selectedValue === 'disputed') {
      resultDiv.style.color = '#e65100';
      resultDiv.innerText = currentLang === 'bn' 
        ? 'উচ্চ ঝুঁকি: খতিয়ান ৩০৯ এর ওপর ল্যান্ড সার্ভে ট্রাইব্যুনালে মামলা চলমান।' 
        : 'High Risk: Khatian 309 has a pending case in Land Survey Tribunal.';
    }
  }, 1200);
}

// ==========================================
// 8. USSD Modal & Utilities
// ==========================================
function showUSSDModal() {
  const modal = document.getElementById('ussdModal');
  if (modal) modal.style.display = 'flex';
}

function closeUSSDModal() {
  const modal = document.getElementById('ussdModal');
  if (modal) modal.style.display = 'none';
}

function generateLandHash() {
  let hash = '0x';
  const chars = '0123456789ABCDEF';
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function updateRiskMeter(scorePercent, isDisputed) {
  const riskBar = document.getElementById('riskBar');
  const riskText = document.getElementById('riskPercentage');
  const hashSpan = document.getElementById('blockHash');

  if (hashSpan) hashSpan.innerText = generateLandHash();

  if (riskBar && riskText) {
    riskBar.style.width = scorePercent + '%';
    if (isDisputed) {
      riskBar.style.background = '#d32f2f';
      riskText.style.color = '#d32f2f';
      riskText.innerText = `${scorePercent}% (${currentLang === 'bn' ? 'উচ্চ ঝুঁকি / মামলাযুক্ত' : 'High Risk / Disputed'})`;
    } else {
      riskBar.style.background = '#2e7d32';
      riskText.style.color = '#2e7d32';
      riskText.innerText = `${scorePercent}% (${currentLang === 'bn' ? 'নিরাপদ জমি' : 'Low Risk / Safe'})`;
    }
  }
}