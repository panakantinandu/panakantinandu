<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=240&section=header&text=Nandu%20Panakanti&fontSize=52&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Software%20Engineer%20-%20AI%20Systems%20%7C%20Backend%20%7C%20SaaS%20Platforms&descSize=17&descAlignY=58&descColor=a78bfa"/>

</div>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=2800&pause=1000&color=A78BFA&center=true&vCenter=true&multiline=false&width=700&lines=Building+AI-powered+production+platforms;Designing+systems+that+enforce+business+logic;Turning+manual+workflows+into+automated+code;Full-stack+%7C+Distributed+Systems+%7C+Cloud+Native" alt="Typing SVG" />

</div>

<br/>

<div align="center">

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-nandu--portfolio-8B5CF6?style=for-the-badge&logoColor=white)](https://nandu-portfolio-three.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nandu-panakanti-41839731a)
[![Email](https://img.shields.io/badge/Gmail-panakantinandu-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:panakantinandu@gmail.com)
[![LeetCode](https://img.shields.io/badge/LeetCode-200%2B_Solved-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/Nandupanak/)

</div>

---

## ⚡ What I Build

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   AI-Powered Platforms   →   PropMind, AI Workflow Automation       │
│   Distributed Systems    →   Kafka, BullMQ, Redis, Event-Driven     │
│   Production SaaS        →   LeaseHub, Multi-Tenant, Stripe         │
│   Cloud Security         →   AWS IAM Drift Detection, Lambda        │
│   ML Engineering         →   SHAP, Attrition Prediction, Explainable│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> Business logic belongs in code — not spreadsheets, not reminders, not trust.  
> I design backend-first systems where payments are verifiable, workflows are automated, and failures are traceable.

---

## 🛠️ Tech Stack

<div align="center">

**Languages**

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![SQL](https://img.shields.io/badge/SQL-4479A1?style=flat-square&logo=postgresql&logoColor=white)

**Backend & APIs**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)

**Databases**

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)

**AI & Data**

![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white)
![LangChain](https://img.shields.io/badge/LLM_Integration-8B5CF6?style=flat-square&logoColor=white)
![SHAP](https://img.shields.io/badge/SHAP-Explainable_AI-FF6B6B?style=flat-square&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=flat-square&logo=apachekafka&logoColor=white)

**Cloud & DevOps**

![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat-square&logo=streamlit&logoColor=white)

</div>

---

## 🚀 Projects

### 🏠 PropMind — AI-Powered Property Management Platform
> `Node.js` `Express` `MongoDB` `OpenAI API` `Stripe` `BullMQ` `Redis` `Socket.io`

**The problem:** Property management is full of manual steps — approving applications, chasing rent, triaging maintenance. PropMind replaces every manual step with code.

```mermaid
sequenceDiagram
    participant T as Tenant
    participant S as System
    participant AI as AI Layer
    participant ST as Stripe
    participant A as Admin

    T->>S: Submit application
    S->>AI: Score tenant risk
    AI-->>S: Risk score + confidence + red flags
    S->>A: Notify with AI analysis
    A->>S: Approve application
    S->>T: Deposit required (timer starts)
    T->>ST: Pay deposit
    ST->>S: Webhook (signature verified)
    S->>S: Property → RESERVED, Ledger entry created
    Note over S: 1st of month — cron fires
    S->>S: Generate invoice for all ACTIVE leases
    S->>T: Rent reminder (3 days before due)
    T->>ST: Pay rent
    ST->>S: Webhook verified
    S->>S: Invoice → PAID, LedgerEntry, Notification
    A->>S: View AI financial summary
    S->>AI: Summarize revenue, dues, overdue
    AI-->>A: Natural language financial narrative
```

**What's under the hood:**

| Layer | What it does |
|---|---|
| 🤖 AI Risk Scoring | Evaluates income, rent-to-income ratio, payment history → risk score + confidence |
| 🔧 Maintenance Triage AI | Classifies ticket category (plumbing/electrical/HVAC), sets priority automatically |
| 💬 AI Support Assistant | Natural-language queries on live DB data — both admin and tenant facing |
| 📊 AI Financial Summary | Narrative of revenue, dues, and overdue tenants generated on demand |
| ⏱️ Automated Enforcement | Cron: cancel unpaid deposits, expire stale applications, apply late fees |
| 🧾 Ledger-based Billing | Every transaction creates a traceable double-entry ledger record |
| 🔒 Production Security | CSRF, Helmet, rate limiting, Mongo sanitize, Stripe webhook signature verification |

[![Admin Demo](https://img.shields.io/badge/🔗_Admin_Portal-Live-8B5CF6?style=for-the-badge)](https://propmind-6mkn.onrender.com)
[![Tenant Demo](https://img.shields.io/badge/🔗_Tenant_Portal-Live-6366F1?style=for-the-badge)](https://propmind-tenant.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?style=for-the-badge&logo=github)](https://github.com/panakantinandu/PropMind)

---

### ⚙️ AI Workflow Automation Platform
> `FastAPI` `PostgreSQL` `React` `LLM APIs` `Prompt Engineering`

An orchestration engine that lets you define, schedule, and monitor AI-powered workflows without writing a new pipeline each time.

```
User defines workflow
        │
        ▼
┌──────────────────────┐
│  Workflow Scheduler  │  ← PostgreSQL-backed task queue
└──────────┬───────────┘
           │
    ┌──────▼──────┐
    │  Execution  │  ← Retry handling, observability
    │   Engine    │
    └──────┬──────┘
           │
    ┌──────▼──────────────┐
    │   LLM Integration   │  ← Prompt-driven decision nodes
    └──────┬──────────────┘
           │
    ┌──────▼──────┐
    │  Analytics  │  ← Pipeline metrics, execution history
    └─────────────┘
```

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-Open-8B5CF6?style=for-the-badge)](https://github.com/panakantinandu)

---

### 🏢 LeaseHub — Multi-Tenant SaaS Platform
> `Node.js` `Express.js` `React` `MongoDB` `Docker` `Stripe`

Production-grade SaaS. Multi-tenant isolation, Stripe payments, event-driven payment webhooks, full CI/CD. Zero manual invoicing.

[![Admin Demo](https://img.shields.io/badge/Admin_Demo-Open-0A66C2?style=flat-square)](https://github.com/panakantinandu)
[![Tenant Demo](https://img.shields.io/badge/Tenant_Demo-Open-0A66C2?style=flat-square)](https://github.com/panakantinandu)

---

### 📡 Distributed Notification System
> `Spring Boot` `Apache Kafka` `Redis` `PostgreSQL`

Event-driven messaging pipeline with producer/consumer services, dead-letter queues, retry mechanisms, and fault-tolerant asynchronous processing at scale.

```
Producer Service  →  Kafka Topic  →  Consumer Service
                          │
                    Dead Letter Queue (on failure)
                          │
                    Retry Worker  →  Resolved / Alerting
```

---

### 🔐 AWS IAM Drift Detection
> `AWS Lambda` `EventBridge` `CloudTrail` `DynamoDB`

Real-time cloud security monitor. Detects privilege escalation and unexpected IAM changes across an AWS environment the moment they happen — not the next morning.

[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?style=flat-square&logo=github)](https://github.com/panakantinandu)

---

### 📊 Employee Attrition Prediction System
> `Python` `Scikit-learn` `SHAP` `Streamlit`

End-to-end ML pipeline: preprocessing → feature engineering → model training → SHAP-based explainability → interactive Streamlit dashboard. Not just predictions — transparent reasoning.

[![Live Demo](https://img.shields.io/badge/🔗_Live_Demo-Open-FF4B4B?style=flat-square)](https://github.com/panakantinandu)

---

## 📈 GitHub Activity

<div align="center">

<img src="https://github-readme-streak-stats.herokuapp.com?user=panakantinandu&theme=tokyonight&hide_border=true&background=0D1117&stroke=8B5CF6&ring=A78BFA&fire=F59E0B&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=A78BFA&sideLabels=A78BFA&dates=6B7280" width="49%"/>

<img src="https://github-readme-stats.vercel.app/api?username=panakantinandu&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=A78BFA&icon_color=8B5CF6&text_color=FFFFFF&ring_color=A78BFA" width="49%"/>

</div>

<div align="center">

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=panakantinandu&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117&title_color=A78BFA&text_color=FFFFFF&langs_count=8" width="40%"/>

</div>

<div align="center">

<img src="https://github-readme-activity-graph.vercel.app/graph?username=panakantinandu&theme=tokyo-night&hide_border=true&bg_color=0D1117&color=A78BFA&line=8B5CF6&point=F59E0B" width="95%"/>

</div>

---

## 🏆 Certifications

<div align="center">

![AWS Cloud Architecting](https://img.shields.io/badge/AWS-Cloud_Architecting-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![AWS Cloud Security](https://img.shields.io/badge/AWS-Cloud_Security_Foundations-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Anthropic Claude API](https://img.shields.io/badge/Anthropic-Building_with_Claude_API-412991?style=flat-square&logoColor=white)
![Claude Code](https://img.shields.io/badge/Anthropic-Claude_Code_in_Action-412991?style=flat-square&logoColor=white)
![Walmart SWE](https://img.shields.io/badge/Walmart-Advanced_SWE_Simulation-0071CE?style=flat-square&logoColor=white)
![Skyscanner SWE](https://img.shields.io/badge/Skyscanner-SWE_Simulation-00B0F0?style=flat-square&logoColor=white)
![NPTEL](https://img.shields.io/badge/NPTEL-DBMS_%7C_Python_%7C_Embedded-E53935?style=flat-square&logoColor=white)

</div>

---

## 💡 Engineering Philosophy

```javascript
const nandu = {
  focus:      ["backend-first", "systems thinking", "production-grade"],
  avoids:     ["CRUD apps with no real logic", "trust over automation"],
  believes:   "business rules should be enforced by code, not people",
  currentlyImproving: ["DSA patterns", "system design at scale", "distributed tracing"],
  openTo:     "SWE roles — backend, AI systems, platform engineering"
};
```

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=15&duration=3000&pause=1000&color=6B7280&center=true&vCenter=true&width=600&lines=Actively+seeking+Software+Engineering+roles;Backend+%7C+AI+Systems+%7C+Platform+Engineering;Open+to+full-time+%26+internship+opportunities" />

<br/>

[![Connect on LinkedIn](https://img.shields.io/badge/Let's_connect_on_LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nandu-panakanti-41839731a)

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer"/>

</div>
