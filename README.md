# 🌿 JomiLens ("জমির তথ্য জানুন, কেনার আগেই")

> **P5 — Citizen Pre-Purchase Verification System**  
> An AI-powered, transparent "check before you buy" platform that lets citizens verify ownership, mutation history, pending court/survey disputes, and khas or government acquisition status of a plot before executing a financial transaction.

---

## 🌐 **Live Demo**
* **Access the Web Prototype:** [https://asma-arif.github.io/JomiLens_web/](https://asma-arif.github.io/JomiLens_web/)

---

## 🎯 **The Core Problem (P5)**
In Bangladesh, land purchasing is historically plagued by opacity, fraudulent manual records, backdated tampering of Khatians (পর্চা), and hidden litigation. Ordinary citizens lack an instant, transparent mechanism to verify ownership clarity and legal disputes prior to transferring funds or completing registration. **JomiLens** solves this by providing instant AI-driven verification.

---

## 🚀 **Key Features Implemented (7 Modules)**

1. **Interactive AI Land Assistant & Plot Search Bar:** Instant natural language search for plot/Khatian details and ownership lookup.
2. **AI OCR Khatian & Document Scanner:** Real-time document scanning via **Live Camera Capture** and **Gallery File Upload**.
3. **3-Tier Interactive Demo Document Validator:** Practical simulation detecting:
   * 🟢 *Genuine Khatian (#502 - Safe)*
   * 🔴 *Tampered Khatian (#105 - Forged)*
   * 🟠 *Disputed Khatian (#309 - Court Stay)*
4. **Smart Land Purchase Risk Score Meter:** Automated risk percentage calculation evaluating legal status, ownership clarity, and acquisition flags.
5. **Blockchain-Based Document Validator:** Immutable digital hash generation ensuring tamper-proof record tracking.
6. **Offline USSD & SMS Guidance Service:** Accessibility layer enabling rural citizens to verify basic plot status on feature phones without internet access.
7. **Bilingual Dynamic Language Switcher:** Seamless one-click **Bangla ⇄ English** UI translation.

---

## 🔮 **Future Roadmap & Proposed Features (7 Modules)**
1. **Interactive GIS Satellite Map & Boundary Overlay:** Zoomable Mouza maps and GPS boundary verification.
2. **AI-Powered Mutation Timeline:** Visual chain of title tracking ownership evolution across CS, SA, RS, and BS records.
3. **Geo-Location Khas & Government Acquisition Alerts:** GPS-based instant warning if a plot belongs to government or railway/road domains.
4. **AI Land Price Predictor:** Automated market valuation based on official Mouza rates and recent transaction averages.
5. **NID & Biometric Seller Identity Verification:** Direct cross-check of seller identity with national databases.
6. **One-Click PDF Verification Clearance Report Generator:** Downloadable comprehensive clearance certificate for legal backing before financial advance.
7. **Digital Escrow Payment & Land Registration Workflow:** Secure third-party hold account system protecting buyer funds.

---

## 🛠️ **Tech Stack**
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Responsive Flexbox/Grid Layouts
* **Architecture:** Modular client-side logic with simulated AI OCR, bilingual translation engine, and interactive validators
* **Version Control & Hosting:** Git & GitHub Pages

---

## 🤖 **Use of AI Tools & Compliance**
In accordance with the hackathon guidelines regarding AI tool transparency:
1. **AI Assistants Used:** Large Language Models (LLMs) and AI coding assistants were utilized during the development phase for code structuring, UI layout styling, feature logic architecture, and drafting project documentation.
2. **Transparency & Disclosure:** All architectural decisions, core UI integrations, and validation scripts were reviewed, customized, and validated by the team.
3. **Code Understanding:** Both team members (Asma Bintay Arif and Jasiah Tasneem Preyo) fully comprehend the codebase, application flow, and underlying system design, and are prepared to explain and defend all technical aspects during the presentation/evaluation.

---

## 👥 **Team & Mentors**

### **Team Members:**
* **Asma Bintay Arif** (Department of Computer Science and Engineering) — Lead Developer & System Architect
* **Jasiah Tasneem Preyo** (Department of Computer Science and Engineering) — UI/UX Designer & Feature Strategist

### **Mentors:**
* **Faculty Member:** Mehedi Hassan, Department of Computer Science and Engineering
* **Industry Expert:** Shafin Ahmed, CSE-TECH, Department of Computer Science and Engineering

---

## 💻 **How to Run Locally**
To run this project on your local machine:
```bash
# 1. Clone the repository
git clone [https://github.com/asma-arif/JomiLens_web.git](https://github.com/asma-arif/JomiLens_web.git)

# 2. Navigate to the project directory
cd JomiLens_web

# 3. Open index.html in your preferred browser or live server