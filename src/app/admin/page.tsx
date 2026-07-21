"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FileText, 
  Trash2, 
  Printer, 
  Save, 
  Clock, 
  PlusCircle,
  CheckCircle,
  FileSpreadsheet,
  FileSignature,
  FileUser,
  ArrowLeft,
  Lock,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

// Types for Document Generation
type DocType = "quotation" | "invoice" | "offer_letter" | "agreement" | "letterhead";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  taxRate: number; // percentage
}

interface Milestone {
  id: string;
  description: string;
  percentage: number;
}

interface DocData {
  id: string;
  type: DocType;
  title: string;
  docNumber: string;
  date: string;
  dueDateOrExpiry: string;
  clientName: string;
  clientAddress: string;
  clientPhoneEmail: string;
  subject: string;
  lineItems: LineItem[];
  paymentTerms: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
  };
  notes: string;
  // Offer Letter specific
  candidateName: string;
  candidateAddress: string;
  jobTitle: string;
  joiningDate: string;
  ctcAnnual: string;
  probationPeriod: string;
  signatoryName: string;
  signatoryTitle: string;
  // Agreement specific
  scopeOfWork: string;
  milestones: Milestone[];
  governingLaw: string;
  // Custom Letterhead specific
  letterBody: string;
  signatureImage?: string;
}

const DEFAULT_COMPANY_PHONES = [
  "+91 913913 8170",
  "+91 73 9781 8170",
  "+91 89 9945 7290"
];

const DEFAULT_COMPANY_ADDRESS = "Fq8V+Rjq, Division, 79/3, Shubhra Heights Rd, Shivane, Pune, Maharashtra 411023";

const DEFAULT_DOC_DATA: DocData = {
  id: "",
  type: "quotation",
  title: "QUOTATION",
  docNumber: "RT/QT/2026/001",
  date: new Date().toISOString().split("T")[0],
  dueDateOrExpiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  clientName: "Acme Corporation",
  clientAddress: "123 Business Park, Hinjewadi Phase 1, Pune - 411057",
  clientPhoneEmail: "contact@acme.com | +91 98765 43210",
  subject: "Proposal for Next-Gen AI Automation & Portal Integration",
  lineItems: [
    { id: "1", description: "Design & development of custom multi-agent autonomous system for customer support", qty: 1, rate: 150000, taxRate: 18 },
    { id: "2", description: "Cloud optimization & zero-downtime infrastructure migration", qty: 1, rate: 80000, taxRate: 18 }
  ],
  paymentTerms: "50% Advance, 50% on Delivery and UAT completion.",
  bankDetails: {
    bankName: "HDFC Bank Ltd",
    accountNumber: "50200088899911",
    ifscCode: "HDFC0000104",
    upiId: "rahvixtech@okhdfcbank"
  },
  notes: "Quotation is valid for 15 days from the date of issue. Project delivery timeline is 4-6 weeks.",
  candidateName: "Rohan Sharma",
  candidateAddress: "Flat 402, Green Meadows, Kothrud, Pune - 411038",
  jobTitle: "Senior Frontend Engineer",
  joiningDate: "2026-07-01",
  ctcAnnual: "8,50,000",
  probationPeriod: "6 Months",
  signatoryName: "Pradnyesh",
  signatoryTitle: "Managing Director",
  scopeOfWork: "The service provider will deliver custom web portal development using React, Next.js, and Node.js. Includes UI prototyping, backend design, API integration, database architecture, and hosting setup. Maintenance and bug support will be provided for 3 months post-launch.",
  milestones: [
    { id: "m1", description: "Project Kickoff & UI Design Approval (Advance Payment)", percentage: 40 },
    { id: "m2", description: "Core Feature Implementation & API Integrations", percentage: 40 },
    { id: "m3", description: "Final UAT Deployment & Handover", percentage: 20 }
  ],
  governingLaw: "Pune, Maharashtra Jurisdiction",
  letterBody: "We are writing to confirm the scope and agreement regarding the IT consulting services details discussed in our last meeting. Rahvix Technologies is committed to providing elite software solutions. Please review the attached parameters and confirm by signing the duplicate copy."
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminIdInput, setAdminIdInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [docType, setDocType] = useState<DocType>("quotation");
  const [formData, setFormData] = useState<DocData>(DEFAULT_DOC_DATA);
  const [drafts, setDrafts] = useState<DocData[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Ref for the printable component
  const printRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminIdInput === "admin" && (passwordInput === "admin" || passwordInput === "rahvix2026")) {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("rahvix_admin_auth", "true");
    } else {
      setAuthError("Invalid Admin ID or Password");
    }
  };

  // Load drafts and check auth on mount
  useEffect(() => {
    const authed = sessionStorage.getItem("rahvix_admin_auth");
    if (authed === "true") {
      queueMicrotask(() => setIsAuthenticated(true));
    }

    const saved = localStorage.getItem("rahvix_doc_drafts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => setDrafts(parsed));
      } catch (err) {
        console.error("Failed to parse drafts", err);
      }
    }
  }, []);

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, signatureImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync title and prefix whenever DocType changes
  useEffect(() => {
    let title = "";
    let number = "";
    const rand = Math.floor(100 + Math.random() * 900);
    const year = new Date().getFullYear();

    switch (docType) {
      case "quotation":
        title = "QUOTATION";
        number = `RT/QT/${year}/${rand}`;
        break;
      case "invoice":
        title = "TAX INVOICE";
        number = `RT/INV/${year}/${rand}`;
        break;
      case "offer_letter":
        title = "OFFER LETTER";
        number = `RT/OL/${year}/${rand}`;
        break;
      case "agreement":
        title = "SERVICE AGREEMENT";
        number = `RT/AGR/${year}/${rand}`;
        break;
      case "letterhead":
        title = "OFFICIAL LETTER";
        number = `RT/LTR/${year}/${rand}`;
        break;
    }

    queueMicrotask(() => {
      setFormData(prev => ({
        ...prev,
        type: docType,
        title,
        docNumber: number,
        dueDateOrExpiry: docType === "invoice" 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
          : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      }));
    });
  }, [docType]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate quotation/invoice totals
  const subtotal = formData.lineItems.reduce((acc, item) => acc + (item.qty * item.rate), 0);
  const totalTax = formData.lineItems.reduce((acc, item) => acc + ((item.qty * item.rate) * item.taxRate / 100), 0);
  const grandTotal = subtotal + totalTax;

  // Add line item
  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "New service/item description",
      qty: 1,
      rate: 0,
      taxRate: 18
    };
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  // Remove line item
  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  // Update line item field
  const updateLineItem = (id: string, field: keyof LineItem, val: string | number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          return { ...item, [field]: val };
        }
        return item;
      })
    }));
  };

  // Add milestone
  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      description: "New Project Milestone Phase",
      percentage: 0
    };
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  };

  // Remove milestone
  const removeMilestone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  // Update milestone field
  const updateMilestone = (id: string, field: keyof Milestone, val: string | number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => {
        if (m.id === id) {
          return { ...m, [field]: val };
        }
        return m;
      })
    }));
  };

  // Save current form data as draft
  const saveDraft = () => {
    const newDraft: DocData = {
      ...formData,
      id: formData.id || `draft-${Date.now()}`
    };
    
    let updatedDrafts = [...drafts];
    const existingIndex = drafts.findIndex(d => d.id === newDraft.id);
    
    if (existingIndex > -1) {
      updatedDrafts[existingIndex] = newDraft;
    } else {
      updatedDrafts = [newDraft, ...updatedDrafts];
    }

    setDrafts(updatedDrafts);
    setFormData(newDraft); // Sync ID back
    localStorage.setItem("rahvix_doc_drafts", JSON.stringify(updatedDrafts));
    showToast("Draft saved successfully!");
  };

  // Load selected draft
  const loadDraft = (draft: DocData) => {
    setFormData(draft);
    setDocType(draft.type);
    showToast(`Loaded Draft: ${draft.docNumber}`);
  };

  // Delete selected draft
  const deleteDraft = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    localStorage.setItem("rahvix_doc_drafts", JSON.stringify(updated));
    showToast("Draft deleted.");
  };

  // Format currency helper
  const formatINR = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden select-none">
        {/* Decorative background blobs */}
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full glow-cyan opacity-40 pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full glow-blue opacity-30 pointer-events-none -z-10" />
        
        {/* Interactive canvas grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />

        <div className="w-full max-w-[400px] bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Top Window controls */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-850 mb-6">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">security.auth</span>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-brand-orange" />
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Authentication</h2>
            <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-wider">Access Restricted to Officers</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            {authError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Admin ID</label>
              <input
                type="text"
                required
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-blue rounded-lg p-3 text-white transition-colors duration-250 focus:outline-none placeholder-slate-700 font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Passkey</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-blue rounded-lg p-3 text-white transition-colors duration-250 focus:outline-none placeholder-slate-700 font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 rounded-lg bg-brand-orange text-white font-extrabold shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/30 active:scale-[0.98] transition-all duration-200 cursor-pointer text-center font-sans tracking-wide"
            >
              Verify Credentials
            </button>
          </form>

          <div className="mt-6 border-t border-slate-850 pt-4 text-center">
            <Link
              href="/"
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors uppercase font-bold tracking-wider"
            >
              ← Return to Main Deck
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative print:block print:bg-white print:text-black print:min-h-0">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-[100] bg-brand-orange text-white px-5 py-3 rounded-xl shadow-lg border border-brand-orange/20 animate-fade-in flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-white" />
          <span className="font-mono text-xs font-bold uppercase">{notification}</span>
        </div>
      )}

      <aside className="w-full md:w-[480px] bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto max-h-screen md:sticky md:top-0 print:hidden">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-400 hover:text-white" title="Back to Home">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-md font-bold tracking-tight text-white flex items-center gap-2">
                Rahvix Document Generator
              </h1>
              <p className="text-[10px] font-mono text-brand-orange font-bold uppercase tracking-wider">Company Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Tab Buttons (Doc Types) */}
        <div className="p-4 grid grid-cols-5 gap-1.5 border-b border-slate-850 bg-slate-950/40 sticky top-0 z-10 backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setDocType("quotation")}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all cursor-pointer border ${docType === "quotation" ? "bg-brand-orange border-brand-orange shadow-[0_0_12px_rgba(250,90,21,0.25)] text-white" : "bg-slate-900/40 border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"}`}
            title="Quotation"
          >
            <FileSpreadsheet className="w-4 h-4 mb-1" />
            <span className="text-[9px] font-semibold">Quote</span>
          </button>
          
          <button 
            type="button"
            onClick={() => setDocType("invoice")}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all cursor-pointer border ${docType === "invoice" ? "bg-brand-orange border-brand-orange shadow-[0_0_12px_rgba(250,90,21,0.25)] text-white" : "bg-slate-900/40 border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"}`}
            title="Tax Invoice"
          >
            <FileText className="w-4 h-4 mb-1" />
            <span className="text-[9px] font-semibold">Invoice</span>
          </button>

          <button 
            type="button"
            onClick={() => setDocType("offer_letter")}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all cursor-pointer border ${docType === "offer_letter" ? "bg-brand-orange border-brand-orange shadow-[0_0_12px_rgba(250,90,21,0.25)] text-white" : "bg-slate-900/40 border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"}`}
            title="Offer Letter"
          >
            <FileUser className="w-4 h-4 mb-1" />
            <span className="text-[9px] font-semibold">Offer</span>
          </button>

          <button 
            type="button"
            onClick={() => setDocType("agreement")}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all cursor-pointer border ${docType === "agreement" ? "bg-brand-orange border-brand-orange shadow-[0_0_12px_rgba(250,90,21,0.25)] text-white" : "bg-slate-900/40 border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"}`}
            title="Service Agreement"
          >
            <FileSignature className="w-4 h-4 mb-1" />
            <span className="text-[9px] font-semibold">Agree</span>
          </button>

          <button 
            type="button"
            onClick={() => setDocType("letterhead")}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all cursor-pointer border ${docType === "letterhead" ? "bg-brand-orange border-brand-orange shadow-[0_0_12px_rgba(250,90,21,0.25)] text-white" : "bg-slate-900/40 border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"}`}
            title="Custom Letter"
          >
            <FileText className="w-4 h-4 mb-1" />
            <span className="text-[9px] font-semibold">Letter</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-6 flex-1">
          {/* Metadata Section */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
              Document Metadata
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">DOC NUMBER</label>
                <input 
                  type="text" 
                  value={formData.docNumber} 
                  onChange={e => setFormData({...formData, docNumber: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">DATE</label>
                <input 
                  type="date" 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">
                  {docType === "invoice" ? "DUE DATE" : "EXPIRY DATE"}
                </label>
                <input 
                  type="date" 
                  value={formData.dueDateOrExpiry} 
                  onChange={e => setFormData({...formData, dueDateOrExpiry: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">TITLE ON HEADER</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">DOCUMENT SUBJECT / REFERENCE</label>
              <input 
                type="text" 
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                placeholder="e.g. Development of Mobile Portal Application"
              />
            </div>
          </div>

          {/* Form fields conditional on DocType */}
          
          {/* QUOTATION & INVOICE CLIENT FIELDS */}
          {(docType === "quotation" || docType === "invoice" || docType === "agreement") && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
                Client Information
              </h2>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">CLIENT NAME</label>
                <input 
                  type="text" 
                  value={formData.clientName} 
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">CLIENT ADDRESS</label>
                <textarea 
                  rows={2}
                  value={formData.clientAddress} 
                  onChange={e => setFormData({...formData, clientAddress: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-sans"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">CLIENT CONTACT INFO (PHONE/EMAIL)</label>
                <input 
                  type="text" 
                  value={formData.clientPhoneEmail} 
                  onChange={e => setFormData({...formData, clientPhoneEmail: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* LINE ITEMS FOR QUOTATION & INVOICE */}
          {(docType === "quotation" || docType === "invoice") && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
                  Line Items
                </h2>
                <button 
                  type="button"
                  onClick={addLineItem}
                  className="flex items-center gap-1 text-[10px] font-bold font-mono text-brand-teal hover:underline cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ADD ITEM
                </button>
              </div>

              <div className="space-y-4">
                {formData.lineItems.map((item, index) => (
                  <div key={item.id} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2 relative group">
                    <button 
                      type="button"
                      onClick={() => removeLineItem(item.id)}
                      className="absolute top-2 right-2 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-slate-500">ITEM #{index + 1}</span>
                    
                    <div>
                      <label className="block text-[8px] font-mono text-slate-500 mb-0.5">DESCRIPTION</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={e => updateLineItem(item.id, "description", e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[8px] font-mono text-slate-500 mb-0.5">QTY</label>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={e => updateLineItem(item.id, "qty", parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono text-slate-500 mb-0.5">RATE (₹)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={e => updateLineItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono text-slate-500 mb-0.5">TAX (GST %)</label>
                        <input
                          type="number"
                          value={item.taxRate}
                          onChange={e => updateLineItem(item.id, "taxRate", parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra terms and notes */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">PAYMENT TERMS</label>
                  <textarea 
                    rows={2}
                    value={formData.paymentTerms} 
                    onChange={e => setFormData({...formData, paymentTerms: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">EXTRA NOTES</label>
                  <textarea 
                    rows={2}
                    value={formData.notes} 
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Bank Details section for Invoice */}
              {docType === "invoice" && (
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h3 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">Bank Details for Transfer</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-mono text-slate-500 mb-0.5">BANK NAME</label>
                      <input 
                        type="text" 
                        value={formData.bankDetails.bankName} 
                        onChange={e => setFormData({...formData, bankDetails: { ...formData.bankDetails, bankName: e.target.value }})}
                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono text-slate-500 mb-0.5">ACCOUNT NUMBER</label>
                      <input 
                        type="text" 
                        value={formData.bankDetails.accountNumber} 
                        onChange={e => setFormData({...formData, bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }})}
                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-mono text-slate-500 mb-0.5">IFSC CODE</label>
                      <input 
                        type="text" 
                        value={formData.bankDetails.ifscCode} 
                        onChange={e => setFormData({...formData, bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }})}
                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono text-slate-500 mb-0.5">UPI ID</label>
                      <input 
                        type="text" 
                        value={formData.bankDetails.upiId} 
                        onChange={e => setFormData({...formData, bankDetails: { ...formData.bankDetails, upiId: e.target.value }})}
                        className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OFFER LETTER FIELDS */}
          {docType === "offer_letter" && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
                Candidate Information
              </h2>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">CANDIDATE NAME</label>
                <input 
                  type="text" 
                  value={formData.candidateName} 
                  onChange={e => setFormData({...formData, candidateName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">CANDIDATE ADDRESS</label>
                <textarea 
                  rows={2}
                  value={formData.candidateAddress} 
                  onChange={e => setFormData({...formData, candidateAddress: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-sans"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">JOB TITLE</label>
                  <input 
                    type="text" 
                    value={formData.jobTitle} 
                    onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">JOINING DATE</label>
                  <input 
                    type="date" 
                    value={formData.joiningDate} 
                    onChange={e => setFormData({...formData, joiningDate: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">ANNUAL CTC (₹)</label>
                  <input 
                    type="text" 
                    value={formData.ctcAnnual} 
                    onChange={e => setFormData({...formData, ctcAnnual: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                    placeholder="e.g. 6,00,000"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">PROBATION PERIOD</label>
                  <input 
                    type="text" 
                    value={formData.probationPeriod} 
                    onChange={e => setFormData({...formData, probationPeriod: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    placeholder="e.g. 6 Months"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATORY NAME</label>
                  <input 
                    type="text" 
                    value={formData.signatoryName} 
                    onChange={e => setFormData({...formData, signatoryName: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATORY TITLE</label>
                  <input 
                    type="text" 
                    value={formData.signatoryTitle} 
                    onChange={e => setFormData({...formData, signatoryTitle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SERVICE AGREEMENT FIELDS */}
          {docType === "agreement" && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
                Agreement Scope & Milestones
              </h2>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">SCOPE OF WORK SUMMARY</label>
                <textarea 
                  rows={4}
                  value={formData.scopeOfWork} 
                  onChange={e => setFormData({...formData, scopeOfWork: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-sans"
                />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">Milestones & Payments</h3>
                <button 
                  type="button"
                  onClick={addMilestone}
                  className="flex items-center gap-1 text-[10px] font-bold font-mono text-brand-teal hover:underline cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> ADD PHASE
                </button>
              </div>

              <div className="space-y-3">
                {formData.milestones.map((m, idx) => (
                  <div key={m.id} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2 relative">
                    <button 
                      type="button"
                      onClick={() => removeMilestone(m.id)}
                      className="absolute top-2 right-2 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[9px] font-mono text-slate-500">PHASE #{idx + 1}</span>
                    <input 
                      type="text"
                      value={m.description}
                      onChange={e => updateMilestone(m.id, "description", e.target.value)}
                      placeholder="Deliverable Description"
                      className="w-full bg-slate-800 border border-slate-700 rounded p-1.5 text-xs text-white"
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-[9px] font-mono text-slate-500">PERCENTAGE VALUE:</label>
                      <input 
                        type="number"
                        value={m.percentage}
                        onChange={e => updateMilestone(m.id, "percentage", parseInt(e.target.value) || 0)}
                        className="w-20 bg-slate-800 border border-slate-700 rounded p-1 text-xs text-white font-mono text-center"
                      />
                      <span className="text-xs font-mono text-slate-400">%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATORY (FOR RAHVIX)</label>
                  <input 
                    type="text" 
                    value={formData.signatoryName} 
                    onChange={e => setFormData({...formData, signatoryName: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATURE IMAGE (OPTIONAL)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-mono file:font-bold file:bg-brand-orange/20 file:text-brand-orange hover:file:bg-brand-orange/30 cursor-pointer"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">GOVERNING JURISDICTION</label>
                  <input 
                    type="text" 
                    value={formData.governingLaw} 
                    onChange={e => setFormData({...formData, governingLaw: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CUSTOM LETTERHEAD BODY FIELDS */}
          {docType === "letterhead" && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest border-l-2 border-brand-orange pl-2">
                Recipient & Letter Details
              </h2>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">RECIPIENT / DEPT / COMPANY</label>
                <input 
                  type="text" 
                  value={formData.clientName} 
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. Chief Financial Officer, Alpha Labs Ltd"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">RECIPIENT ADDRESS (OPTIONAL)</label>
                <textarea 
                  rows={2}
                  value={formData.clientAddress} 
                  onChange={e => setFormData({...formData, clientAddress: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">LETTER BODY CONTENT</label>
                <textarea 
                  rows={8}
                  value={formData.letterBody} 
                  onChange={e => setFormData({...formData, letterBody: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-sans leading-relaxed"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATORY NAME</label>
                  <input 
                    type="text" 
                    value={formData.signatoryName} 
                    onChange={e => setFormData({...formData, signatoryName: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATORY TITLE</label>
                  <input 
                    type="text" 
                    value={formData.signatoryTitle} 
                    onChange={e => setFormData({...formData, signatoryTitle: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">SIGNATURE IMAGE (OPTIONAL)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-400 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-mono file:font-bold file:bg-brand-orange/20 file:text-brand-orange hover:file:bg-brand-orange/30 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Triggers */}
          <div className="flex flex-col gap-2.5 pt-6 border-t border-slate-850">
            <button 
              type="button"
              onClick={saveDraft}
              className="w-full flex items-center justify-center gap-2 bg-slate-900/50 hover:bg-slate-800 text-slate-200 hover:text-white font-bold font-mono text-xs uppercase p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </button>
            <button 
              type="button"
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-bold font-mono text-xs uppercase p-3.5 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-[0_0_15px_rgba(250,90,21,0.35)] transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Export PDF
            </button>
          </div>

          {/* Draft History Section */}
          {drafts.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-slate-850">
              <h2 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-orange" /> Saved Drafts ({drafts.length})
              </h2>
              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 border border-slate-850 p-2.5 rounded-xl bg-slate-950/40">
                {drafts.map((d) => (
                  <div 
                    key={d.id} 
                    onClick={() => loadDraft(d)}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-800 hover:bg-slate-900/60 transition-all cursor-pointer text-left"
                  >
                    <div className="truncate">
                      <p className="text-[10px] font-mono font-bold text-white truncate">{d.docNumber}</p>
                      <p className="text-[8px] font-mono text-slate-400 uppercase">{d.type} - {d.clientName || d.candidateName || "No Name"}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => deleteDraft(e, d.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Delete Draft"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </aside>

      {/* Main Content - Preview Panel */}
      <main className="flex-1 bg-slate-950/20 p-6 md:p-12 overflow-y-auto flex justify-center print:p-0 print:block print:bg-white print:w-auto">
        <div 
          ref={printRef}
          className="print-area w-full max-w-[800px] min-h-[1130px] bg-white text-slate-900 shadow-2xl rounded-sm p-[40px] flex flex-col justify-between relative border border-slate-200 select-text print:shadow-none print:border-none print:min-h-0 print:max-w-none print:w-auto print:m-0 print:p-[15mm]"
        >
          {/* Top Letterhead Header */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start pb-6 mb-6 border-b border-slate-200 gap-4">
              
              {/* Logo & Brand name */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-12 flex items-center shrink-0">
                  <img
                    src="/logo.jpg"
                    alt="Rahvix Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="pl-4 border-l-2 border-brand-orange">
                  <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-slate-900 leading-none">
                    RAHVIX TECHNOLOGIES
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">
                    Next-Gen IT & AI Solutions
                  </p>
                </div>
              </div>

              {/* Address & Contact Info Grid */}
              <div className="text-right flex flex-col items-end max-w-sm mt-1">
                <div className="text-[10px] font-medium text-slate-600 leading-relaxed max-w-[250px]">
                  {DEFAULT_COMPANY_ADDRESS}
                </div>
                <div className="text-[10px] font-medium text-slate-500 mt-2 flex flex-col items-end gap-0.5">
                  <span className="text-slate-700 font-semibold">{DEFAULT_COMPANY_PHONES.join("  |  ")}</span>
                  <span>contact@rahvix.com  |  www.rahvix.com</span>
                </div>
              </div>
            </div>

            {/* Document Specific Header Banner */}
            <div className="flex justify-between items-center mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-2xl font-black tracking-widest text-slate-900 font-sans uppercase">
                  {formData.title}
                </h3>
                <div className="w-16 h-1 bg-brand-orange mt-2 rounded-full" />
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Document No.</span>
                <span className="text-lg font-mono font-bold text-slate-800">{formData.docNumber}</span>
              </div>
            </div>

            {/* Structured Information block (combines Client & Metadata) */}
            <div className="grid grid-cols-2 gap-6 mb-8 text-xs leading-normal">
              {/* Client / Candidate details */}
              <div className="space-y-1">
                {docType === "offer_letter" ? (
                  <>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Offer Prepared For:</p>
                    <p className="font-black text-slate-900 text-sm">{formData.candidateName}</p>
                    {formData.candidateAddress && (
                      <p className="text-slate-600 font-medium whitespace-pre-line leading-relaxed max-w-[280px]">{formData.candidateAddress}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To / Client:</p>
                    <p className="font-black text-slate-900 text-sm">{formData.clientName}</p>
                    {formData.clientAddress && (
                      <p className="text-slate-600 font-medium whitespace-pre-line leading-relaxed max-w-[280px]">{formData.clientAddress}</p>
                    )}
                    {formData.clientPhoneEmail && (
                      <p className="text-slate-800 font-medium mt-2">{formData.clientPhoneEmail}</p>
                    )}
                  </>
                )}
              </div>

              {/* Document Metadata details */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col justify-center space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date of Issue</span>
                  <span className="font-semibold text-slate-900 text-sm">{new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {docType === "invoice" ? "Payment Due" : docType === "offer_letter" ? "Valid Until" : "Expiry Date"}
                  </span>
                  <span className="font-semibold text-slate-900 text-sm">{new Date(formData.dueDateOrExpiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                {formData.subject && (
                  <div className="pt-3 mt-1 border-t border-slate-200/60">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Reference / Subject</span>
                    <span className="font-semibold text-slate-800 text-xs leading-snug block">
                      {formData.subject}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Render Body of doc type */}
            
            {/* 1. QUOTATION & INVOICE TABLE */}
            {(docType === "quotation" || docType === "invoice") && (
              <div className="mb-8">
                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-white uppercase font-semibold text-[10px] tracking-wider">
                        <th className="py-3 px-4 w-12 text-center">Sr.</th>
                        <th className="py-3 px-4">Description of Services</th>
                        <th className="py-3 px-4 w-16 text-center">Qty</th>
                        <th className="py-3 px-4 w-28 text-right">Rate</th>
                        <th className="py-3 px-4 w-20 text-center">GST %</th>
                        <th className="py-3 px-4 w-32 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.lineItems.map((item, idx) => (
                        <tr key={item.id} className="border-b border-slate-100 text-slate-800 font-medium align-top last:border-0 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4 text-center text-slate-500 font-mono">{idx + 1}</td>
                          <td className="py-4 px-4 font-semibold text-slate-900 whitespace-pre-line">{item.description}</td>
                          <td className="py-4 px-4 text-center font-mono">{item.qty}</td>
                          <td className="py-4 px-4 text-right font-mono">{formatINR(item.rate)}</td>
                          <td className="py-4 px-4 text-center font-mono text-slate-500">{item.taxRate}%</td>
                          <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                            {formatINR(item.qty * item.rate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Calculation Summary blocks */}
                <div className="flex justify-end mt-6">
                  <div className="w-80 bg-slate-50 rounded-xl p-5 border border-slate-100 text-sm font-medium space-y-3 text-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Subtotal:</span>
                      <span className="font-mono text-slate-900">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Tax (IGST / CGST+SGST):</span>
                      <span className="font-mono text-slate-900">{formatINR(totalTax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="font-black text-slate-900 uppercase tracking-wide text-xs">Grand Total:</span>
                      <span className="font-mono text-lg font-black text-brand-orange">{formatINR(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Bank details & extra terms */}
                <div className="mt-10 grid grid-cols-2 gap-8 text-xs leading-relaxed text-slate-600">
                  {docType === "invoice" && (
                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider mb-3 text-[10px] flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-teal rounded-full" /> Bank Settlement Details
                      </p>
                      <div className="space-y-1.5 font-medium">
                        <p>Bank Name: <span className="font-bold text-slate-900">{formData.bankDetails.bankName}</span></p>
                        <p>A/c Number: <span className="font-bold text-slate-900 font-mono">{formData.bankDetails.accountNumber}</span></p>
                        <p>IFSC Code: <span className="font-bold text-slate-900 font-mono">{formData.bankDetails.ifscCode}</span></p>
                        <p>UPI VPA: <span className="font-bold text-slate-900 font-mono">{formData.bankDetails.upiId}</span></p>
                      </div>
                    </div>
                  )}
                  {formData.paymentTerms && (
                    <div>
                      <p className="font-bold text-slate-900 uppercase tracking-wider mb-3 text-[10px] flex items-center gap-2">
                        <span className="w-4 h-1 bg-brand-purple rounded-full" /> Payment Milestones / Terms
                      </p>
                      <p className="text-slate-700 font-medium whitespace-pre-line">{formData.paymentTerms}</p>
                    </div>
                  )}
                </div>

                {formData.notes && (
                  <div className="mt-8 text-xs text-slate-500 border-t border-slate-100 pt-5">
                    <p className="font-bold uppercase tracking-wider mb-2 text-slate-700 text-[10px]">Important Notes</p>
                    <p className="italic leading-relaxed">{formData.notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. OFFER LETTER BODY */}
            {docType === "offer_letter" && (
              <div className="text-xs leading-relaxed text-slate-800 space-y-4 text-left">
                
                <p className="font-bold text-slate-950 text-sm">Subject: Offer of Employment for the position of {formData.jobTitle}</p>

                <p>Dear {formData.candidateName.split(" ")[0] || "Candidate"},</p>
                
                <p>
                  Following our discussions and interviews, we are delighted to offer you a position of <strong>{formData.jobTitle}</strong> at <strong>Rahvix Technologies</strong>. We were highly impressed by your credentials and technical skill set, and we are confident that you will be a valuable asset to our engineering division.
                </p>

                <div className="border border-slate-200 rounded p-4 bg-slate-50 space-y-2 font-medium">
                  <p className="border-b pb-1 mb-2 font-bold text-slate-950 uppercase text-[10px] font-mono tracking-wider">Employment Terms Summary</p>
                  <p>Designation: <span className="font-bold text-slate-900">{formData.jobTitle}</span></p>
                  <p>Date of Joining: <span className="font-bold text-slate-900">{formData.joiningDate}</span></p>
                  <p>Annual CTC Structure: <span className="font-bold text-slate-900 font-mono">₹{formData.ctcAnnual} /- Per Annum</span></p>
                  <p>Probation Period: <span className="font-bold text-slate-900">{formData.probationPeriod}</span></p>
                </div>

                <p>
                  Your probation period is {formData.probationPeriod || "6 months"}, during which your performance and fit with the team will be evaluated. Upon successful completion of the probation, your employment will be confirmed in writing.
                </p>

                <p>
                  To accept this offer, please sign and return a duplicate copy of this letter on or before the joining date. If you have any questions or require clarifications, please feel free to reach out.
                </p>

                <p className="pt-2">Welcome to the Rahvix team!</p>
              </div>
            )}

            {/* 3. SERVICE AGREEMENT */}
            {docType === "agreement" && (
              <div className="text-sm leading-relaxed text-slate-800 space-y-6">
                <p className="font-medium">
                  This Service Agreement (the &quot;Agreement&quot;) is executed on this <strong>{new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</strong> by and between:
                </p>
                
                <div className="grid grid-cols-2 gap-6 bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">1. Service Provider</p>
                    <p className="font-black text-slate-900 text-base">Rahvix Technologies</p>
                    <p className="text-slate-600 text-xs mt-1 max-w-[200px] leading-relaxed">{DEFAULT_COMPANY_ADDRESS}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">2. Customer / Client</p>
                    <p className="font-black text-slate-900 text-base">{formData.clientName}</p>
                    <p className="text-slate-600 text-xs mt-1 max-w-[200px] leading-relaxed">{formData.clientAddress}</p>
                    <p className="text-slate-700 font-medium text-xs mt-2">{formData.clientPhoneEmail}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-4 h-1 bg-brand-orange rounded-full" /> 1. Scope of Services
                  </h4>
                  <p className="text-slate-700 whitespace-pre-line pl-4 border-l-2 border-slate-200 leading-relaxed font-medium">
                    {formData.scopeOfWork}
                  </p>
                </div>

                {formData.milestones.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-4 h-1 bg-brand-purple rounded-full" /> 2. Payment Milestones Schedule
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-slate-200">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-white uppercase font-semibold text-[10px] tracking-wider">
                            <th className="py-3 px-4">Phase</th>
                            <th className="py-3 px-4">Milestone Deliverable / Description</th>
                            <th className="py-3 px-4 text-center w-32">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.milestones.map((m, idx) => (
                            <tr key={m.id} className="border-b border-slate-100 font-medium last:border-0 hover:bg-slate-50 transition-colors">
                              <td className="py-4 px-4 text-slate-500 font-mono text-xs">Phase {idx + 1}</td>
                              <td className="py-4 px-4 text-slate-900 font-semibold">{m.description}</td>
                              <td className="py-4 px-4 text-center text-slate-900 font-mono font-bold text-base">{m.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-8 pt-4 mt-6 border-t border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-3 h-1 bg-brand-teal rounded-full" /> 3. Confidentiality
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      Both parties agree to hold all proprietary materials, intellectual property, and strategic assets in strict confidence during and after the lifecycle of this project.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-3 h-1 bg-brand-orange rounded-full" /> 4. Governing Law
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium">
                      This Agreement shall be governed by, construed and enforced in accordance with the laws of India, subject to exclusive jurisdiction in the courts of <strong className="text-slate-900">{formData.governingLaw || "Pune, Maharashtra"}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CUSTOM LETTERHEAD / OFFICIAL LETTER / OFFER LETTER TEXT */}
            {(docType === "letterhead" || docType === "offer_letter") && (
              <div className="text-sm leading-relaxed text-slate-800 space-y-6">
                
                {formData.clientName && docType === "letterhead" && (
                  <div className="mb-6">
                    <p className="font-medium text-slate-500 mb-1">To,</p>
                    <p className="font-black text-slate-900 text-base">{formData.clientName}</p>
                    {formData.clientAddress && (
                      <p className="text-slate-600 whitespace-pre-line font-medium text-xs mt-1">{formData.clientAddress}</p>
                    )}
                  </div>
                )}

                <div className="text-slate-800 whitespace-pre-wrap pt-2 font-medium font-sans leading-loose text-sm">
                  {docType === "offer_letter" ? formData.scopeOfWork : formData.letterBody}
                </div>

              </div>
            )}

          </div>

          {/* Bottom Letters Signatures & Footer Blocks */}
          <div className="mt-20 pt-10 border-t border-slate-200 flex justify-between items-end text-sm leading-normal relative z-10">
            
            {/* Signature Area (Company) */}
            <div className="w-64">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-8">Authorized Signatory</p>
              <div className="h-14 border-b-2 border-slate-900 mb-3 flex items-end">
                {formData.signatureImage ? (
                  <img src={formData.signatureImage} alt="Signature" className="h-full object-contain mb-1" />
                ) : (
                  <span className="opacity-0">Signature</span>
                )}
              </div>
              <p className="font-black text-slate-900 text-base">{formData.signatoryName || "Authorized Representative"}</p>
              <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wide mt-1">{formData.signatoryTitle || "Managing Director"}</p>
              <p className="text-brand-orange font-bold text-[10px] uppercase tracking-wider mt-0.5">Rahvix Technologies</p>
            </div>

            {/* Counter Sign for Candidate/Client OR Computer Generated Stamp */}
            {(docType === "offer_letter" || docType === "agreement") ? (
              <div className="w-64 text-right flex flex-col items-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-8">
                  {docType === "offer_letter" ? "Accepted By Candidate" : "Accepted By Client"}
                </p>
                <div className="h-12 border-b-2 border-slate-900 mb-3 flex items-end w-full">
                  {/* Physical Signature Space */}
                </div>
                <p className="font-black text-slate-900 text-base">
                  {docType === "offer_letter" ? formData.candidateName : formData.clientName}
                </p>
                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wide mt-1">Signature & Date</p>
              </div>
            ) : (
              <div className="text-right flex flex-col items-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Document Generated On</p>
                <p className="font-mono text-slate-900 font-bold mt-1 text-sm">{new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <p className="text-[9px] text-brand-orange mt-2 uppercase font-bold tracking-widest bg-brand-orange/10 px-2 py-1 rounded">Valid & Legally Binding</p>
                <p className="text-[8px] text-slate-400 uppercase tracking-widest mt-2">Computer Generated Document</p>
              </div>
            )}

          </div>

          {/* Absolute Watermark Overlay */}
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-96 h-96 opacity-[0.025] pointer-events-none select-none">
            <img 
              src="/logo.jpg" 
              alt=""
              className="w-full h-full object-contain grayscale"
            />
          </div>

        </div>
      </main>
    </div>
  );
}
