import React, { useState, useEffect } from 'react';
import {
  RAGCorpusItem,
  RAGCorpusCategory,
  GroundedSnippet
} from '../types';
import { DEFAULT_SRANAN_CORPUS } from '../data/defaultCorpus';
import {
  Database,
  Search,
  PlusCircle,
  Upload,
  FlaskConical,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Tag,
  FileText,
  Volume2,
  Copy,
  FileCode,
  Bot,
  Download,
  Rocket,
  Pencil,
  X,
  Save
} from 'lucide-react';
import { playAudioForText } from '../lib/audioUtils';

export function CorpusManagerView() {
  const [activeTab, setActiveTab] = useState<'library' | 'md-generator' | 'import' | 'lab' | 'notebook'>('library');
  const [corpusItems, setCorpusItems] = useState<RAGCorpusItem[]>([...DEFAULT_SRANAN_CORPUS]);
  const [isLoading, setIsLoading] = useState(false);
  const [ragEnabled, setRagEnabled] = useState(true);
  const [totalWords, setTotalWords] = useState(0);

  // Document / PDF & Markdown Generator state
  const [mdFiles, setMdFiles] = useState<{ name: string; content: string; size: number }[]>([]);
  const [pdfFiles, setPdfFiles] = useState<{ name: string; base64: string; size: number }[]>([]);
  const [mdPastedContent, setMdPastedContent] = useState('');
  const [isGeneratingMd, setIsGeneratingMd] = useState(false);
  const [generatedRagText, setGeneratedRagText] = useState('');
  const [mdSuccessMsg, setMdSuccessMsg] = useState<string | null>(null);
  const [copiedRagText, setCopiedRagText] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Gemini Notebook prompt helper state
  const [notebookCat, setNotebookCat] = useState<RAGCorpusCategory | 'all'>('dictionary');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Library state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Single Entry Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<RAGCorpusCategory>('dictionary');
  const [newSrananText, setNewSrananText] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newTags, setNewTags] = useState('');
  const [addSuccessMsg, setAddSuccessMsg] = useState<string | null>(null);

  // Bulk Import state
  const [bulkText, setBulkText] = useState('');
  const [bulkCategory, setBulkCategory] = useState<RAGCorpusCategory>('dictionary');
  const [importMode, setImportMode] = useState<'single' | 'bulk'>('single');

  // Grounding Test Lab state
  const [testPrompt, setTestPrompt] = useState('Fa fu firi switi fu nyan nanga lespeki?');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ungroundedResponse: string;
    groundedResponse: string;
    snippetsUsed: GroundedSnippet[];
  } | null>(null);

  // Reset confirmation modal state
  const [showResetModal, setShowResetModal] = useState(false);

  // Edit item modal state
  const [editingItem, setEditingItem] = useState<RAGCorpusItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<RAGCorpusCategory>('dictionary');
  const [editSrananText, setEditSrananText] = useState('');
  const [editTranslation, setEditTranslation] = useState('');
  const [editPhonetic, setEditPhonetic] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editTags, setEditTags] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Fetch active corpus from backend on mount
  const fetchCorpus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/rag/corpus');
      if (res.ok) {
        const data = await res.json();
        setCorpusItems(data.items || []);
        setTotalWords(data.totalWords || 0);
        setRagEnabled(data.isRagGlobalEnabled !== false);
      }
    } catch (err) {
      console.warn('Could not fetch backend corpus, using client fallback:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCorpus();
  }, []);

  // Handle PDF, Markdown and Text file uploads
  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const reader = new FileReader();

      if (isPdf) {
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            setPdfFiles((prev) => [
              ...prev.filter((f) => f.name !== file.name),
              { name: file.name, base64: result, size: file.size }
            ]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        reader.onload = (e) => {
          const text = e.target?.result as string;
          if (text) {
            setMdFiles((prev) => [
              ...prev.filter((f) => f.name !== file.name),
              { name: file.name, content: text, size: file.size }
            ]);
          }
        };
        reader.readAsText(file);
      }
    });
  };

  // Generate RAG Bulk Text using Gemini API (Supports PDF, Markdown & Text)
  const handleGenerateFromDocument = async () => {
    const combinedContent = [
      ...mdFiles.map((f) => `--- File: ${f.name} ---\n${f.content}`),
      mdPastedContent.trim() ? `--- Pasted Content ---\n${mdPastedContent}` : ''
    ]
      .filter(Boolean)
      .join('\n\n');

    if (!combinedContent.trim() && pdfFiles.length === 0) return;

    setIsGeneratingMd(true);
    setMdSuccessMsg(null);
    try {
      const res = await fetch('/api/rag/generate-from-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markdownContent: combinedContent,
          pdfFiles: pdfFiles.map((p) => ({ name: p.name, base64: p.base64 }))
        })
      });
      if (res.ok) {
        const data = await res.json();
        setGeneratedRagText(data.generatedText || '');
      } else {
        const errData = await res.json();
        alert(errData.error || 'Genereren mislukt.');
      }
    } catch (err) {
      console.error('Failed to generate from document/PDF:', err);
      alert('Fout bij het verbinden met de Gemini server.');
    } finally {
      setIsGeneratingMd(false);
    }
  };

  // Directly import generated text into active RAG Knowledge Base
  const handleImportGeneratedToRag = async () => {
    if (!generatedRagText.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/rag/corpus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulkText: generatedRagText, category: 'dictionary' })
      });
      if (res.ok) {
        const data = await res.json();
        let msg = `${data.addedCount || 0} Sranantongo RAG-paren succesvol geïmporteerd in de RAG Knowledge Base!`;
        if (data.skippedDuplicatesCount && data.skippedDuplicatesCount > 0) {
          msg += ` (${data.skippedDuplicatesCount} doublures automatisch overgeslagen)`;
        }
        setMdSuccessMsg(msg);
        await fetchCorpus();
        setTimeout(() => setMdSuccessMsg(null), 7000);
      }
    } catch (err) {
      console.error('Failed to import generated RAG text:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clean / Deduplicate existing corpus
  const handleDeduplicateCorpus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/rag/corpus/deduplicate', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.removedCount > 0) {
          setAddSuccessMsg(`${data.removedCount} duplicates cleaned up! ${data.remainingCount} unique Sranantongo items remain.`);
        } else {
          setAddSuccessMsg('No duplicates found. All items in the RAG Corpus are unique!');
        }
        await fetchCorpus();
        setTimeout(() => setAddSuccessMsg(null), 5000);
      }
    } catch (err) {
      console.error('Failed to deduplicate corpus:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadRagText = () => {
    if (!generatedRagText) return;
    const blob = new Blob([generatedRagText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sranantongo_rag_corpus.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyRagText = () => {
    if (!generatedRagText) return;
    navigator.clipboard.writeText(generatedRagText);
    setCopiedRagText(true);
    setTimeout(() => setCopiedRagText(false), 2500);
  };

  // Toggle RAG Globally
  const handleToggleRag = async () => {
    const nextState = !ragEnabled;
    setRagEnabled(nextState);
    try {
      await fetch('/api/rag/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: nextState })
      });
    } catch (err) {
      console.error('Failed to toggle RAG:', err);
    }
  };

  // Execute Reset Corpus to default
  const executeResetCorpus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/rag/reset', { method: 'POST' });
      if (res.ok) {
        await fetchCorpus();
        setAddSuccessMsg('Database and RAG knowledge base successfully reset to authentic default Sranantongo dataset!');
        setTimeout(() => setAddSuccessMsg(null), 5000);
      } else {
        console.error('Failed to reset corpus on backend.');
      }
    } catch (err) {
      console.error('Failed to reset corpus:', err);
    } finally {
      setIsLoading(false);
      setShowResetModal(false);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/rag/corpus/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCorpusItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  // Open edit modal for item
  const handleStartEdit = (item: RAGCorpusItem) => {
    setEditingItem(item);
    setEditTitle(item.title || '');
    setEditCategory(item.category || 'dictionary');
    setEditSrananText(item.srananText || '');
    setEditTranslation(item.translation || '');
    setEditPhonetic(item.phonetic || '');
    setEditNotes(item.usageNotes || '');
    setEditTags(item.tags ? item.tags.join(', ') : '');
  };

  // Save edited item
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editSrananText.trim() || !editTranslation.trim()) return;

    setIsSavingEdit(true);
    const updatedData: Partial<RAGCorpusItem> = {
      title: editTitle.trim() || `Entry: ${editSrananText.substring(0, 25)}`,
      category: editCategory,
      srananText: editSrananText.trim(),
      translation: editTranslation.trim(),
      phonetic: editPhonetic.trim() || undefined,
      usageNotes: editNotes.trim(),
      tags: editTags ? editTags.split(',').map((t) => t.trim()).filter(Boolean) : [editCategory, 'custom']
    };

    try {
      const res = await fetch(`/api/rag/corpus/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (res.ok) {
        const data = await res.json();
        const updatedItem = data.item || { ...editingItem, ...updatedData };
        setCorpusItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
        );
        setEditingItem(null);
        setAddSuccessMsg('RAG entry successfully updated in Knowledge Base!');
        setTimeout(() => setAddSuccessMsg(null), 4000);
      } else {
        alert('Error saving changes.');
      }
    } catch (err) {
      console.error('Failed to save edited item:', err);
      alert('Error connecting to server.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Submit single entry
  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrananText.trim() || !newTranslation.trim()) return;

    setIsLoading(true);
    const itemData = {
      title: newTitle.trim() || `Entry: ${newSrananText.substring(0, 25)}`,
      category: newCategory,
      srananText: newSrananText.trim(),
      translation: newTranslation.trim(),
      phonetic: newPhonetic.trim() || undefined,
      usageNotes: newNotes.trim(),
      tags: newTags ? newTags.split(',').map((t) => t.trim()).filter(Boolean) : [newCategory, 'custom']
    };

    try {
      const res = await fetch('/api/rag/corpus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemData })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isDuplicate || data.addedCount === 0) {
          setAddSuccessMsg('⚠️ Duplicate skipped: This Sranantongo expression already exists in the Corpus.');
        } else {
          setAddSuccessMsg('1 new item successfully added to RAG Knowledge Base!');
          setNewTitle('');
          setNewSrananText('');
          setNewTranslation('');
          setNewPhonetic('');
          setNewNotes('');
          setNewTags('');
        }
        await fetchCorpus();
        setTimeout(() => setAddSuccessMsg(null), 5000);
      }
    } catch (err) {
      console.error('Failed to add item:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit bulk text
  const handleAddBulk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/rag/corpus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulkText, category: bulkCategory })
      });
      if (res.ok) {
        const data = await res.json();
        let msg = `${data.addedCount || 0} items imported into RAG Knowledge Base.`;
        if (data.skippedDuplicatesCount && data.skippedDuplicatesCount > 0) {
          msg += ` (${data.skippedDuplicatesCount} duplicates skipped to prevent double entries)`;
        }
        setAddSuccessMsg(msg);
        setBulkText('');
        await fetchCorpus();
        setTimeout(() => setAddSuccessMsg(null), 6000);
      }
    } catch (err) {
      console.error('Failed to import bulk text:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Run Grounding Experiment
  const handleRunTest = async () => {
    if (!testPrompt.trim()) return;
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/rag/test-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText: testPrompt })
      });
      if (res.ok) {
        const data = await res.json();
        setTestResult(data);
      }
    } catch (err) {
      console.error('Failed to run grounding test:', err);
    } finally {
      setIsTesting(false);
    }
  };

  // Preset bulk loaders
  const loadPreset = (type: 'odo' | 'market' | 'dialogue' | 'pronunciation') => {
    if (type === 'odo') {
      setBulkCategory('proverb');
      setBulkText(
        `Efu yu no ben sab’ a ten, yu no o sab’ a pasi : If you didn't know the time, you won't know the path.\nKondei na kondei, pas’ na pasi : Every country has its custom, every road its path.\nTe boko broko, meti e frede : When the bridge collapses, the animals get scared.`
      );
    } else if (type === 'market') {
      setBulkCategory('dictionary');
      setBulkText(
        `Marwina markt : Central market place in Paramaribo\nSranan pom tayer : Traditional tayer root used for festive pom dish\nOmeni a e kostu disi? : How much does this one cost?\nGi mi wan pisi : Give me a piece`
      );
    } else if (type === 'dialogue') {
      setBulkCategory('dialogue');
      setBulkText(
        `Fa waka, mi mati? - Fa de, mi e tan bun! : How are you, my friend? - All good, I am doing fine!\nGrantangi fu a nyan, a ben switi srefi : Thank you for the meal, it was truly delicious!`
      );
    } else if (type === 'pronunciation') {
      setBulkCategory('pronunciation');
      setBulkText(
        `Fa waka, mi mati? : How are you doing, my friend?, Phonetic: FA WA-ka, mi MA-ti?, Note: Stress on capitalized syllables\nSafrisafri e nyan switi : Patience brings sweet rewards, Phonetic: SAF-ri-SAF-ri e NYAN SWI-ti, Note: Melodic double stress\nGrantangi fu a yepi : Thank you very much for the help, Phonetic: GRAN-TAN-gi FU A YE-pi, Note: Soft nasal vowels`
      );
    }
  };

  // Filter items
  const filteredItems = corpusItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.srananText.toLowerCase().includes(q) ||
      item.translation.toLowerCase().includes(q) ||
      (item.phonetic && item.phonetic.toLowerCase().includes(q)) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'proverb':
        return 'bg-[#F2EFE9] text-[#786C5D] border-[#E2DDD3]';
      case 'grammar':
        return 'bg-[#EBF3F5] text-[#3D6B78] border-[#D3E3E7]';
      case 'dictionary':
        return 'bg-[#E8F0E6] text-[#4A6B44] border-[#D0E0CC]';
      case 'cultural':
        return 'bg-[#FAF0E6] text-[#8C5E3B] border-[#F2DECC]';
      case 'dialogue':
        return 'bg-[#F3EBF5] text-[#6B3D78] border-[#E3D3E7]';
      case 'pronunciation':
        return 'bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner & RAG Control Header */}
      <div className="bg-white border border-[#E0E0D5] rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E8F0E6] to-[#FAF0E6] opacity-40 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EADD] text-[#5A5A40] text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Sranantongo Grounding Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3A3A2F]">
              RAG Knowledge Base & Corpus Manager
            </h1>
            <p className="text-sm text-[#666655] max-w-2xl leading-relaxed">
              Ground the AI in authentic Surinamese Sranantongo resources, Odo proverbs, grammar rules, and specific vocabulary to eliminate training data limitations.
            </p>
          </div>

          {/* Controls & Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleToggleRag}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                ragEnabled
                  ? 'bg-[#5A5A40] text-white hover:bg-[#4A4A33]'
                  : 'bg-white text-[#808070] border border-[#E0E0D5] hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>RAG Grounding: {ragEnabled ? 'ACTIVE' : 'PAUSED'}</span>
            </button>

            <button
              onClick={handleDeduplicateCorpus}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#FAF9F5] text-[#5A5A40] hover:bg-[#EAE8DE] border border-[#E0E0D5] transition-all cursor-pointer shadow-2xs"
              title="Opschonen van eventuele doublures in het corpus"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>Doublures Opschonen</span>
            </button>

            <button
              onClick={() => setShowResetModal(true)}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium bg-[#F5F5F0] text-[#666655] hover:bg-[#EAEAE0] border border-[#E0E0D5] transition-all cursor-pointer"
              title="Reset to default dataset"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Reset Dataset</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#EAEAE0]">
          <div className="bg-[#F8F8F5] p-3.5 rounded-xl border border-[#ECECE0]">
            <p className="text-xs text-[#808070] font-medium">Total Corpus Items</p>
            <p className="text-xl font-bold text-[#3A3A2F] mt-0.5">{corpusItems.length}</p>
          </div>

          <div className="bg-[#F8F8F5] p-3.5 rounded-xl border border-[#ECECE0]">
            <p className="text-xs text-[#808070] font-medium">Indexed Words</p>
            <p className="text-xl font-bold text-[#3A3A2F] mt-0.5">{totalWords}</p>
          </div>

          <div className="bg-[#F8F8F5] p-3.5 rounded-xl border border-[#ECECE0]">
            <p className="text-xs text-[#808070] font-medium">Odo Proverbs</p>
            <p className="text-xl font-bold text-[#3A3A2F] mt-0.5">
              {corpusItems.filter((i) => i.category === 'proverb').length}
            </p>
          </div>

          <div className="bg-[#F8F8F5] p-3.5 rounded-xl border border-[#ECECE0]">
            <p className="text-xs text-[#808070] font-medium">Grounding Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`w-2 h-2 rounded-full ${ragEnabled ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="text-xs font-bold text-[#3A3A2F]">
                {ragEnabled ? '100% Grounded' : 'General LLM'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#E0E0D5] gap-2 md:gap-4 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('library')}
          className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 ${
            activeTab === 'library'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-white shadow-sm'
              : 'border-transparent text-[#808070] hover:text-[#3A3A2F] hover:bg-white/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Corpus Knowledge Base ({filteredItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('md-generator')}
          className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 ${
            activeTab === 'md-generator'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-white shadow-sm'
              : 'border-transparent text-[#808070] hover:text-[#3A3A2F] hover:bg-white/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>PDF & Document RAG Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('import')}
          className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 ${
            activeTab === 'import'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-white shadow-sm'
              : 'border-transparent text-[#808070] hover:text-[#3A3A2F] hover:bg-white/50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add / Bulk Upload</span>
        </button>

        <button
          onClick={() => setActiveTab('lab')}
          className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 ${
            activeTab === 'lab'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-white shadow-sm'
              : 'border-transparent text-[#808070] hover:text-[#3A3A2F] hover:bg-white/50'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>RAG Grounding Lab (Side-by-Side Test)</span>
        </button>

        <button
          onClick={() => setActiveTab('notebook')}
          className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-t-xl transition-all border-b-2 ${
            activeTab === 'notebook'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-white shadow-sm'
              : 'border-transparent text-[#808070] hover:text-[#3A3A2F] hover:bg-white/50'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Gemini Notebook Prompt Helper</span>
        </button>
      </div>

      {/* TAB 1: CORPUS LIBRARY */}
      {activeTab === 'library' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-[#E0E0D5] shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999988]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sranan texts, Odos, translations..."
                className="w-full pl-10 pr-4 py-2 bg-[#F8F8F5] border border-[#E5E5DA] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all text-[#3A3A2F]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['all', 'dictionary', 'proverb', 'grammar', 'pronunciation', 'cultural', 'dialogue'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#5A5A40] text-white shadow-sm'
                      : 'bg-[#F5F5F0] text-[#777766] hover:bg-[#EAEAE0]'
                  }`}
                >
                  {cat === 'all'
                    ? 'All'
                    : cat === 'proverb'
                    ? 'Odo Proverbs'
                    : cat === 'grammar'
                    ? 'Grammar'
                    : cat === 'dictionary'
                    ? 'Dictionary'
                    : cat === 'pronunciation'
                    ? '🗣️ Pronunciation'
                    : cat === 'cultural'
                    ? 'Culture'
                    : 'Dialogue'}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E0E0D5]">
              <AlertCircle className="w-10 h-10 text-[#AAAA99] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#3A3A2F]">No corpus items found</h3>
              <p className="text-sm text-[#808070] mt-1 max-w-md mx-auto">
                Adjust your search query or add new Sranantongo resources via the import panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E0E0D5] rounded-xl p-5 hover:border-[#5A5A40] transition-all shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    {/* Header line */}
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {item.category === 'proverb' ? 'Odo' : item.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => playAudioForText(item.srananText, 'sr')}
                          className="p-1.5 text-[#808070] hover:text-[#5A5A40] hover:bg-[#F5F5F0] rounded-lg transition-all"
                          title="Listen to Sranantongo"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 text-[#808070] hover:text-[#5A5A40] hover:bg-[#F5F5F0] rounded-lg transition-all"
                          title="Entry bewerken"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 text-[#AAAA99] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-[#3A3A2F] text-base group-hover:text-[#5A5A40] transition-colors">
                      {item.title}
                    </h4>

                    {/* Sranantongo Box */}
                    <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EAE8DE]">
                      <p className="font-serif font-bold text-[#3A3A2F] text-base leading-relaxed">
                        "{item.srananText}"
                      </p>
                    </div>

                    {/* Phonetic Guide with CAPS stress if present */}
                    {item.phonetic && (
                      <div className="bg-[#EEF2FF] p-2.5 rounded-lg border border-[#C7D2FE] text-xs font-mono text-[#3730A3] flex items-center gap-2">
                        <span className="font-bold uppercase text-[10px] bg-[#4338CA] text-white px-2 py-0.5 rounded tracking-wider shrink-0">
                          Stress Guide (CAPS)
                        </span>
                        <span className="font-semibold">{item.phonetic}</span>
                      </div>
                    )}

                    {/* Translation */}
                    <p className="text-sm text-[#666655] font-medium leading-relaxed">
                      <span className="text-xs text-[#999988] font-bold block mb-0.5 uppercase tracking-wider">Translation:</span>
                      {item.translation}
                    </p>

                    {/* Usage Notes if any */}
                    {item.usageNotes && (
                      <p className="text-xs text-[#808070] bg-[#F8F8F5] p-2.5 rounded-md border border-[#EEEEEE] leading-relaxed">
                        <span className="font-semibold text-[#666655]">Context / Rules: </span>
                        {item.usageNotes}
                      </p>
                    )}
                  </div>

                  {/* Footer Tags */}
                  <div className="mt-4 pt-3 border-t border-[#F0F0EA] flex items-center justify-between text-xs text-[#AAAA99]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      {item.tags.map((t) => (
                        <span key={t} className="bg-[#F5F5F0] text-[#777766] px-1.5 py-0.5 rounded text-[11px]">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span>{item.source || 'Dataset'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB: PDF & MARKDOWN TO RAG BULKTEXT GENERATOR */}
      {activeTab === 'md-generator' && (
        <div className="bg-white border border-[#E0E0D5] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EADD] text-[#5A5A40] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>PDF & Document RAG Converter (via Gemini AI)</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#3A3A2F]">
              Automatisch RAG Bulktekst Genereren uit PDF Woordenboeken & Documenten
            </h3>
            <p className="text-sm text-[#666655] leading-relaxed max-w-3xl">
              Upload PDF-bestanden (zoals je Sranantongo-English dictionary PDF), Markdown (`.md`) of platte tekst (`.txt`). Gemini 3.6 Flash verwerkt het document direct en bouwt een gestructureerde RAG-bulktekst met de exacte syntaxis voor de Sranantongo Knowledge Base.
            </p>
          </div>

          {/* Strict Formatting Rules Notice */}
          <div className="bg-[#FAF9F5] border border-[#EAE8DE] rounded-xl p-4 text-xs space-y-2">
            <span className="font-bold text-[#5A5A40] uppercase tracking-wider block">
              Gezette Output Syntaxis Rules (STRICT LINE-BY-LINE MET CATEGORIEËN):
            </span>
            <code className="block bg-white p-3 rounded-lg border border-[#E0E0D5] font-mono text-[#3A3A2F] text-xs leading-relaxed shadow-2xs">
              Sranantongo Phrase : English Translation, Category: [dictionary | grammar | culture | phrases | proverbs | dialogues]<br />
              Mi e go na wosfi : I am going to the office, Category: grammar, Note: Present continuous 'e' marker<br />
              Pom : Traditional festive dish made with tayer root and chicken, Category: culture
            </code>
            <p className="text-[11px] text-[#707060] mt-1">
              💡 Gemini analyseert PDF's en tekstdocumenten en deelt elk item automatisch in bij de juiste categorie (Woordenboek, Grammatica, Cultuur, Spreekwoorden/Odo, Zinnen of Uitspraak).
            </p>
          </div>

          {/* File Upload / Drag & Drop Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              handleFilesSelected(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              isDragOver
                ? 'border-[#5A5A40] bg-[#FAF9F5]'
                : 'border-[#E0E0D5] bg-[#F8F8F5] hover:border-[#5A5A40]/60'
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.md,.markdown,.txt"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
              id="doc-file-input"
            />
            <label htmlFor="doc-file-input" className="cursor-pointer space-y-3 block">
              <div className="w-12 h-12 rounded-full bg-white text-[#5A5A40] border border-[#E0E0D5] flex items-center justify-center mx-auto shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#3A3A2F]">
                  Sleep `.pdf`, `.md` of `.txt` bestanden hier naartoe, of <span className="text-[#5A5A40] underline font-extrabold">blader op je computer</span>
                </p>
                <p className="text-xs text-[#808070] mt-1">
                  Ondersteunt PDF-woordenboeken, Markdown en platte tekstbestanden (meerdere bestanden toegestaan)
                </p>
              </div>
            </label>
          </div>

          {/* Loaded PDF & Text Files List */}
          {(pdfFiles.length > 0 || mdFiles.length > 0) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3A3A2F] uppercase tracking-wider">
                  Geladen Documenten ({pdfFiles.length + mdFiles.length}):
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMdFiles([]);
                    setPdfFiles([]);
                  }}
                  className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                >
                  Wis alle bestanden
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {pdfFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between bg-amber-50/60 border border-amber-200/80 p-2.5 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-amber-800 shrink-0" />
                      <span className="font-semibold text-amber-950 truncate">{file.name}</span>
                      <span className="text-amber-800/80 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfFiles((prev) => prev.filter((f) => f.name !== file.name))}
                      className="text-amber-700 hover:text-rose-600 ml-2 cursor-pointer"
                      title="Verwijder bestand"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {mdFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between bg-[#FAF9F5] border border-[#EAE8DE] p-2.5 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileCode className="w-4 h-4 text-[#5A5A40] shrink-0" />
                      <span className="font-semibold text-[#3A3A2F] truncate">{file.name}</span>
                      <span className="text-[#808070] shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMdFiles((prev) => prev.filter((f) => f.name !== file.name))}
                      className="text-[#AAAA99] hover:text-rose-600 ml-2 cursor-pointer"
                      title="Verwijder bestand"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Direct Paste Textarea */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#3A3A2F] uppercase">
              Of plak hier aanvullende tekst of Markdown:
            </label>
            <textarea
              rows={4}
              value={mdPastedContent}
              onChange={(e) => setMdPastedContent(e.target.value)}
              placeholder="Plak hier je tekst (bijv. aanvullende woordenlijst of notities...)"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F5] border border-[#E0E0D5] rounded-xl text-sm font-mono text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
            />
          </div>

          {/* Generate Button */}
          <div>
            <button
              onClick={handleGenerateFromDocument}
              disabled={isGeneratingMd || (pdfFiles.length === 0 && mdFiles.length === 0 && !mdPastedContent.trim())}
              className="px-6 py-3 rounded-xl bg-[#5A5A40] text-white font-bold text-sm hover:bg-[#4A4A33] transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isGeneratingMd ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>PDF/Documenten analyseren en RAG Bulktekst genereren via Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Genereer RAG Bulktekst via Gemini AI</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Preview */}
          {generatedRagText && (
            <div className="space-y-4 pt-4 border-t border-[#EAEAE0] animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Gegenereerde RAG Bulktekst ({generatedRagText.split('\n').filter(Boolean).length} regels)</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopyRagText}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F8F8F5] text-[#3A3A2F] border border-[#E0E0D5] hover:bg-[#EAEAE0] transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedRagText ? 'Gekopieerd!' : 'Kopiëren'}</span>
                  </button>

                  <button
                    onClick={handleDownloadRagText}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F8F8F5] text-[#3A3A2F] border border-[#E0E0D5] hover:bg-[#EAEAE0] transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.md)</span>
                  </button>

                  <button
                    onClick={handleImportGeneratedToRag}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-sm cursor-pointer"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Direct Importeren in RAG Store</span>
                  </button>
                </div>
              </div>

              {mdSuccessMsg && (
                <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 p-3.5 rounded-xl border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{mdSuccessMsg}</span>
                </div>
              )}

              <div className="relative">
                <textarea
                  rows={12}
                  value={generatedRagText}
                  onChange={(e) => setGeneratedRagText(e.target.value)}
                  className="w-full p-4 bg-[#FAF9F5] border border-[#EAE8DE] rounded-xl font-mono text-xs text-[#3A3A2F] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ADD / BULK IMPORT */}
      {activeTab === 'import' && (
        <div className="bg-white border border-[#E0E0D5] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Mode toggle */}
          <div className="flex items-center gap-3 bg-[#F8F8F5] p-1.5 rounded-xl border border-[#ECECE0] w-fit">
            <button
              onClick={() => setImportMode('single')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                importMode === 'single'
                  ? 'bg-white text-[#3A3A2F] shadow-sm'
                  : 'text-[#808070] hover:text-[#3A3A2F]'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Single Item</span>
            </button>
            <button
              onClick={() => setImportMode('bulk')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                importMode === 'bulk'
                  ? 'bg-white text-[#3A3A2F] shadow-sm'
                  : 'text-[#808070] hover:text-[#3A3A2F]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Bulk Text / Vocabulary List</span>
            </button>
          </div>

          {addSuccessMsg && (
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-sm font-medium animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{addSuccessMsg}</span>
            </div>
          )}

          {importMode === 'single' ? (
            <form onSubmit={handleAddSingle} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">Title / Description</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Odo: Kondei na kondei"
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as RAGCorpusCategory)}
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  >
                    <option value="dictionary">Dictionary / Vocabulary</option>
                    <option value="proverb">Odo / Proverb</option>
                    <option value="grammar">Grammar Rule</option>
                    <option value="pronunciation">Pronunciation & Phonetics (Uitspraak)</option>
                    <option value="cultural">Cultural Context</option>
                    <option value="dialogue">Sample Dialogue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                  Sranantongo Text <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={newSrananText}
                  onChange={(e) => setNewSrananText(e.target.value)}
                  placeholder="Type authentic Sranantongo phrase or vocabulary..."
                  className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                  Phonetic Guide with CAPS Stress (e.g. FA WA-ka, mi MA-ti?)
                </label>
                <input
                  type="text"
                  value={newPhonetic}
                  onChange={(e) => setNewPhonetic(e.target.value)}
                  placeholder="e.g. FA WA-ka, mi MA-ti?"
                  className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                  English Translation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  placeholder="Enter the English translation..."
                  className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">Context / Grammar Notes</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Optional usage guidance or context..."
                  className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="odo, culture, paramaribo, market"
                  className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-[#5A5A40] text-white font-bold text-sm hover:bg-[#4A4A33] transition-all shadow-sm"
              >
                + Add to RAG Knowledge Base
              </button>
            </form>
          ) : (
            <form onSubmit={handleAddBulk} className="space-y-4 max-w-3xl">
              {/* Presets buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#808070] uppercase tracking-wider block">
                  Load quick datasets:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadPreset('odo')}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF0E6] text-[#8C5E3B] border border-[#F2DECC] text-xs font-semibold hover:bg-[#F5E6D8]"
                  >
                    + Extra Odo Proverbs
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('market')}
                    className="px-3 py-1.5 rounded-lg bg-[#E8F0E6] text-[#4A6B44] border border-[#D0E0CC] text-xs font-semibold hover:bg-[#DBE7D8]"
                  >
                    + Market Vocabulary
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('dialogue')}
                    className="px-3 py-1.5 rounded-lg bg-[#F3EBF5] text-[#6B3D78] border border-[#E3D3E7] text-xs font-semibold hover:bg-[#E8D8EC]"
                  >
                    + Conversational Dialogues
                  </button>
                  <button
                    type="button"
                    onClick={() => loadPreset('pronunciation')}
                    className="px-3 py-1.5 rounded-lg bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE] text-xs font-semibold hover:bg-[#E0E7FF]"
                  >
                    + Phonetic Pronunciation Guides
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">Category for all items</label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value as RAGCorpusCategory)}
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F]"
                  >
                    <option value="dictionary">Dictionary / Vocabulary</option>
                    <option value="proverb">Odo / Proverb</option>
                    <option value="grammar">Grammar Rule</option>
                    <option value="pronunciation">Pronunciation & Phonetics (Uitspraak)</option>
                    <option value="cultural">Cultural Context</option>
                    <option value="dialogue">Sample Dialogue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                  Paste your Sranantongo texts, CSV, or line-by-line phrases
                </label>
                <p className="text-xs text-[#808070] mb-2 leading-relaxed">
                  Toegestane formaten: <code className="bg-[#F5F5F0] px-1.5 py-0.5 rounded text-[#3A3A2F]">Sranantongo : Translation</code>. Je kunt optioneel per regel de categorie opgeven met <code className="bg-[#F5F5F0] px-1.5 py-0.5 rounded text-[#3A3A2F]">, Category: grammar</code> (of <code className="bg-[#F5F5F0] px-1 rounded">culture</code>, <code className="bg-[#F5F5F0] px-1 rounded">proverbs</code>, <code className="bg-[#F5F5F0] px-1 rounded">phrases</code>, <code className="bg-[#F5F5F0] px-1 rounded">dialogues</code>, <code className="bg-[#F5F5F0] px-1 rounded">dictionary</code>) en <code className="bg-[#F5F5F0] px-1.5 py-0.5 rounded text-[#3A3A2F]">, Note: toelichting</code>.
                </p>
                <textarea
                  rows={8}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="Bijvoorbeeld:&#10;Fa waka, mi mati? : How are you doing my friend?, Category: phrases&#10;Mi e go na wosfi : I am going to the office, Category: grammar, Note: Tense marker 'e'&#10;Pom : Festive chicken and tayer root dish, Category: culture&#10;Kon koni, wansi fu yepi : Come learn, desire to help, Category: proverbs"
                  className="w-full px-3.5 py-2.5 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm font-mono text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !bulkText.trim()}
                className="px-6 py-2.5 rounded-xl bg-[#5A5A40] text-white font-bold text-sm hover:bg-[#4A4A33] transition-all shadow-sm disabled:opacity-50"
              >
                🚀 Import Bulk Text into RAG Store
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: RAG GROUNDING TEST LAB (SIDE-BY-SIDE COMPARISON) */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E0E0D5] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#5A5A40] font-bold text-sm uppercase tracking-wider">
                <FlaskConical className="w-4 h-4" />
                <span>RAG Retrieval & Grounding Experiment</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#3A3A2F]">
                Compare RAG-Grounded AI vs Standard LLM AI
              </h3>
              <p className="text-sm text-[#666655] leading-relaxed">
                Test how the RAG engine retrieves relevant Sranantongo resources (Odos, grammar, dictionaries) and how responses are directly grounded.
              </p>
            </div>

            {/* Test prompt input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#3A3A2F] uppercase">Test Question or Scenario Prompt</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="e.g. Explain how to politely say thank you in Sranantongo using an Odo..."
                  className="flex-1 px-4 py-2.5 bg-[#F8F8F5] border border-[#E0E0D5] rounded-xl text-sm font-medium text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                />
                <button
                  onClick={handleRunTest}
                  disabled={isTesting || !testPrompt.trim()}
                  className="px-6 py-2.5 bg-[#5A5A40] text-white font-bold rounded-xl hover:bg-[#4A4A33] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Retrieving RAG...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Run Grounding Test</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#999988] font-bold">Try sample:</span>
                {[
                  'Fa fu firi switi fu nyan nanga lespeki?',
                  'Which Odo proverb corresponds to patience?',
                  'How does past tense (ben) work in Sranantongo?',
                  'Where is the Marwina market located?'
                ].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setTestPrompt(sample)}
                    className="text-xs bg-[#F5F5F0] text-[#666655] hover:bg-[#EAEAE0] px-2.5 py-1 rounded-md transition-all border border-[#E0E0D5]"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Results Display */}
            {testResult && (
              <div className="space-y-6 pt-6 border-t border-[#EAEAE0] animate-fadeIn">
                {/* Grounding Snippets Banner */}
                <div className="bg-[#FAF9F5] border border-[#EAE8DE] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Retrieved RAG Sources from Knowledge Base ({testResult.snippetsUsed.length})</span>
                    </span>
                    <span className="text-xs bg-[#E5EADD] text-[#5A5A40] px-2.5 py-0.5 rounded-full font-bold">
                      100% Matching Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {testResult.snippetsUsed.map((snip, i) => (
                      <div key={i} className="bg-white p-3 rounded-lg border border-[#E0E0D5] text-xs space-y-1">
                        <div className="flex justify-between font-bold text-[#3A3A2F]">
                          <span>{snip.title}</span>
                          <span className="text-[#5A5A40]">{snip.similarityScore}% match</span>
                        </div>
                        <p className="font-serif italic text-[#3A3A2F]">"{snip.srananText}"</p>
                        <p className="text-[#777766]">{snip.translation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side by side comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Ungrounded */}
                  <div className="bg-[#F9F9F9] border border-[#E5E5E0] rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        Without RAG Grounding (Generic LLM)
                      </span>
                    </div>
                    <div className="text-sm text-[#3A3A2F] leading-relaxed whitespace-pre-wrap font-sans">
                      {testResult.ungroundedResponse}
                    </div>
                  </div>

                  {/* Right: Grounded */}
                  <div className="bg-white border-2 border-[#5A5A40] rounded-xl p-5 space-y-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        With Sranantongo RAG Grounding
                      </span>
                    </div>
                    <div className="text-sm text-[#3A3A2F] leading-relaxed whitespace-pre-wrap font-sans bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8DE]">
                      {testResult.groundedResponse}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: GEMINI NOTEBOOK PROMPT HELPER */}
      {activeTab === 'notebook' && (
        <div className="bg-white border border-[#E0E0D5] rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#8C5E3B] text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>Gemini Notebook Prompt Generator</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#3A3A2F]">
              Generate Prompts for your Gemini Notebook / AI Studio
            </h3>
            <p className="text-sm text-[#666655] leading-relaxed max-w-3xl">
              Paste these prompts into your Gemini Notebook where your Sranantongo corpus is loaded. Gemini will format the texts directly into the layout understood by our Bulk Import RAG engine!
            </p>
          </div>

          {/* Select Category */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-[#3A3A2F] uppercase tracking-wider">
              Select Desired Category for Prompt Output:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dictionary', label: '📖 Dictionary & Lexicon' },
                { id: 'proverb', label: '📜 Odo Proverbs & Wisdom' },
                { id: 'grammar', label: '✍️ Grammar & Tenses' },
                { id: 'pronunciation', label: '🗣️ Pronunciation & Phonetics (CAPS Stress)' },
                { id: 'cultural', label: '🌍 Cultural Context & Etiquette' },
                { id: 'dialogue', label: '💬 Everyday Dialogues' },
                { id: 'all', label: '✨ All-in-One (Full Corpus)' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setNotebookCat(c.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    notebookCat === c.id
                      ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-sm'
                      : 'bg-[#F8F8F5] text-[#666655] border-[#E0E0D5] hover:bg-[#EAEAE0]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Preview & Copy Box */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3A3A2F] uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#5A5A40]" />
                Copyable Prompt for Gemini Notebook:
              </span>
              <button
                onClick={() => {
                  const promptText = getPromptForCategory(notebookCat);
                  navigator.clipboard.writeText(promptText);
                  setCopiedPrompt(true);
                  setTimeout(() => setCopiedPrompt(false), 3000);
                }}
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#5A5A40] text-white text-xs font-bold hover:bg-[#4A4A33] transition-all shadow-sm"
              >
                {copiedPrompt ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#1E1E1E] text-[#D4D4D4] p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-[#333333]">
              <pre className="whitespace-pre-wrap">{getPromptForCategory(notebookCat)}</pre>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="bg-[#FAF9F5] border border-[#EAE8DE] rounded-xl p-5 space-y-3">
            <h4 className="font-bold text-sm text-[#3A3A2F] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5A5A40]" />
              Step-by-Step Guide for Gemini Notebook Workflow:
            </h4>
            <ol className="text-xs text-[#666655] space-y-2 list-decimal list-inside leading-relaxed">
              <li>Open your <strong>Gemini Notebook / AI Studio / NotebookLM</strong> containing your Sranantongo corpus.</li>
              <li>Click <strong>"Copy Prompt"</strong> above for your desired category.</li>
              <li>Paste the prompt into the chat of your Gemini Notebook.</li>
              <li>Copy the formatted output generated by Gemini.</li>
              <li>Go to the <strong>"Add / Bulk Upload"</strong> tab in this app, choose the matching category, and paste into the bulk box!</li>
            </ol>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E0E0D5] space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-[#B91C1C]">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#3A3A2F]">Reset Knowledge Base & Database?</h3>
                <p className="text-xs text-[#808070]">SrananFlow RAG Knowledge Base</p>
              </div>
            </div>

            <p className="text-sm text-[#666655] leading-relaxed">
              Are you sure you want to reset the database and knowledge base to the default Sranantongo dataset? Any custom items will be restored to default.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#ECECE0]">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5F5F0] text-[#666655] hover:bg-[#EAEAE0] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeResetCorpus}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Resetting Database...</span>
                  </>
                ) : (
                  <span>Yes, Reset Database</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Entry Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-[#E0E0D5] space-y-5 my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECECE0]">
              <div className="flex items-center gap-2">
                <Pencil className="w-5 h-5 text-[#5A5A40]" />
                <h3 className="font-bold text-lg text-[#3A3A2F]">RAG Entry Bewerken</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-[#999988] hover:text-[#3A3A2F] rounded-lg hover:bg-[#F5F5F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sranantongo Text */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Sranantongo Tekst / Expressie *
                  </label>
                  <input
                    type="text"
                    required
                    value={editSrananText}
                    onChange={(e) => setEditSrananText(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm font-semibold text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                {/* Translation */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Vertaling (Engels / Nederlands) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTranslation}
                    onChange={(e) => setEditTranslation(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Categorie
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as RAGCorpusCategory)}
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm font-semibold text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  >
                    <option value="dictionary">Woordenboek (Dictionary)</option>
                    <option value="grammar">Grammatica (Grammar)</option>
                    <option value="cultural">Cultuur (Culture)</option>
                    <option value="proverb">Spreekwoord / Odo (Proverb)</option>
                    <option value="dialogue">Dialoog (Dialogue)</option>
                    <option value="pronunciation">Uitspraak (Pronunciation)</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Titel / Label
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Odo: Safrisafri"
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                {/* Phonetic guide */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Fonetische Uitspraak (Klemtoon in HOOFDLETTERS)
                  </label>
                  <input
                    type="text"
                    value={editPhonetic}
                    onChange={(e) => setEditPhonetic(e.target.value)}
                    placeholder="e.g. SAF-ri-SAF-ri e NYAN SWI-ti"
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm font-mono text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                {/* Usage Notes */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Context / Grammatica & Cultuur Regels
                  </label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Toelichting voor de AI wanneer deze expressie gebruikt wordt..."
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#3A3A2F] uppercase mb-1">
                    Tags (kommagescheiden)
                  </label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g. odo, kulturu, spreekwoord"
                    className="w-full px-3.5 py-2 bg-[#F8F8F5] border border-[#E0E0D5] rounded-lg text-sm text-[#3A3A2F] focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECECE0]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  disabled={isSavingEdit}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F5F5F0] text-[#666655] hover:bg-[#EAEAE0] transition-colors"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#5A5A40] text-white hover:bg-[#4A4A33] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {isSavingEdit ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Opslaan...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Wijzigingen Opslaan</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getPromptForCategory(cat: string): string {
  const catNames: Record<string, string> = {
    dictionary: 'DICTIONARY & LEXICON (words, terms, and core meanings)',
    proverb: 'ODO PROVERBS & TRADITIONAL WISDOM (classic Surinamese proverbs and sayings)',
    grammar: 'GRAMMAR & SYNTAX RULES (tense markers ben/sa/e, negations, pronouns)',
    pronunciation: 'PRONUNCIATION & PHONETICS (phonetic guides with STRESSED SYLLABLES IN CAPITAL LETTERS)',
    cultural: 'CULTURAL CONTEXT & ETIQUETTE (greetings, hospitality, polite customs)',
    dialogue: 'EVERYDAY DIALOGUES (conversations in market, transport, social settings)',
    all: 'COMPLETE SRANANTONGO KNOWLEDGE BASE (all vocabulary, proverbs, grammar, and expressions)'
  };

  const targetCatName = catNames[cat] || catNames.dictionary;
  const defaultCategoryTag = cat === 'all' ? 'dictionary' : cat;

  if (cat === 'pronunciation') {
    return `You are a leading linguist specializing in Surinamese Sranantongo phonetics and pronunciation.
Analyze all source materials, recordings, audio transcripts, and text files in this Gemini Notebook and extract ALL pronunciation guides for Sranantongo words and phrases.

CRITICAL FORMATTING INSTRUCTIONS (STRICT LINE-BY-LINE REQUIRED):
1. ONE ENTRY PER LINE: Every single item MUST be placed on its own separate line with a hard line break (\\n). NEVER combine or concatenate multiple entries on the same line or separate them with commas or semicolons.
2. NO MARKDOWN CODE BLOCKS: Do NOT wrap the output in code fences (\`\`\` or \`\`\`markdown). Output ONLY raw plain text.
3. NO HEADINGS, NUMBERING OR BULLETS: Do NOT output markdown headings (#, ##), section titles, bullet points (- or *), or numbers (1., 2.).
4. EXACT LINE FORMAT ON EVERY SINGLE LINE:
   Sranantongo Phrase : English Translation, Category: pronunciation, Phonetic: [STRESSED-CAPS-PHONETICS], Note: [Pronunciation rule]

EXAMPLE OUTPUT FORMAT (EXACTLY 1 ENTRY PER LINE):
Fa waka, mi mati? : How are you doing, my friend?, Category: pronunciation, Phonetic: FA WA-ka, mi MA-ti?, Note: Melodic stress on first syllable of waka and mati
Safrisafri e nyan switi : Patience brings sweet rewards, Category: pronunciation, Phonetic: SAF-ri-SAF-ri e NYAN SWI-ti, Note: Equal double accent on SAF-ri
Grantangi fu a yepi : Thank you very much for the help, Category: pronunciation, Phonetic: GRAN-TAN-gi FU A YE-pi, Note: Soft nasal vowels and gentle y-glide

Analyze the notebook now and generate the COMPLETE Sranantongo Pronunciation list (all items, strictly one item per line):`;
  }

  return `You are a leading lexicographer and linguist specializing in Surinamese Sranantongo.
Analyze all source materials and files in this Gemini Notebook and extract ALL items strictly belonging to: ${targetCatName}.

CRITICAL FORMATTING INSTRUCTIONS (STRICT LINE-BY-LINE REQUIRED):
1. ONE ENTRY PER LINE: Every single item MUST be placed on its own separate line with a hard line break (\\n). NEVER combine or concatenate multiple entries on the same line.
2. NO MARKDOWN CODE BLOCKS: Do NOT wrap the output in code fences (\`\`\` or \`\`\`markdown). Output ONLY raw plain text.
3. NO HEADINGS, NUMBERING OR BULLETS: Do NOT output markdown headings (#, ##), section titles, bullet points (- or *), or numbers (1., 2.).
4. INCLUDE CATEGORY TAG ON EVERY LINE: Append ", Category: ${defaultCategoryTag}" (or grammar, cultural, proverb, dialogue, dictionary, pronunciation) to every single line.
5. EXACT LINE FORMAT ON EVERY SINGLE LINE:
   Sranantongo Phrase : English Translation, Category: ${defaultCategoryTag}, Note: [Optional brief explanation]

EXAMPLE OUTPUT FORMAT (EXACTLY 1 ENTRY PER LINE):
Fa waka, mi mati? : How are you doing, my friend?, Category: ${cat === 'all' ? 'phrases' : defaultCategoryTag}
Safrisafri e nyan switi : Patience brings sweet rewards, Category: ${cat === 'all' ? 'proverb' : defaultCategoryTag}, Note: Famous Surinamese Odo proverb about patience
Mi ben waka na foto : I walked in the city, Category: ${cat === 'all' ? 'grammar' : defaultCategoryTag}, Note: 'ben' indicates past tense marker

Analyze the notebook now and generate the COMPLETE list containing ALL items found (strictly one item per line):`;
}
