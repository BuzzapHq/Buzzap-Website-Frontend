'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Terminal, Code, Cpu, CheckCircle2, Copy, Check, RefreshCw, Layers } from 'lucide-react';
import './aiStudio.css';

const samplePrompts = [
  {
    title: 'Meta & Google Ads Campaign Hook',
    category: 'AI Marketing',
    icon: Sparkles,
    prompt: 'Generate 3 high-converting video ad hooks and copy variations for an e-commerce brand scaling to $100k/mo on Meta & Google Ads.',
    output: {
      type: 'marketing',
      headline: 'Stop Burning Ad Budget on Unqualified Clicks',
      hooks: [
        'Hook 1: "90% of brands waste half their ad spend on leads that never buy. Here is how Buzzap AI fixes it in 48 hours..."',
        'Hook 2: "If your sales team takes more than 5 minutes to call a lead, you are losing 80% of your revenue."',
        'Hook 3: "Watch this AI agent qualify and book high-ticket buyers while you sleep."'
      ],
      roasTarget: '4.8x Expected ROAS',
      status: 'Ready to Deploy',
    }
  },
  {
    title: 'WhatsApp & Zoho CRM Automation Node',
    category: 'Automation',
    icon: Zap,
    prompt: 'Build an n8n webhook workflow that captures Meta ad leads, validates email/phone, syncs to Zoho CRM, and triggers a instant WhatsApp sequence.',
    output: {
      type: 'workflow',
      nodes: [
        { name: 'Webhook Receiver', status: 'ACTIVE', latency: '12ms' },
        { name: 'Email & Phone Validator', status: 'VERIFIED', latency: '24ms' },
        { name: 'Zoho CRM Deal Stage Sync', status: 'SYNCED', latency: '18ms' },
        { name: 'WhatsApp Voiceflow AI Trigger', status: 'SENT', latency: '35ms' },
      ],
      totalTime: '89ms Total Processing Time',
      status: 'Pipeline Live',
    }
  },
  {
    title: '24/7 Voice AI Agent Booking Script',
    category: 'Voice AI',
    icon: Cpu,
    prompt: 'Configure a Vapi.ai inbound voice agent trained to answer client FAQs, qualify budget >$5,000, and book strategy calls on Cal.com.',
    output: {
      type: 'voice',
      greeting: '"Hello! Thank you for calling Buzzap AI. I can help you audit your lead pipeline or schedule a 1-on-1 strategy call with our team. How can I assist you today?"',
      capabilities: ['Natural Conversational Voice (99.2% Human Parity)', 'Instant Cal.com Calendar Slot Lock', 'Live Transfer to Human Specialist'],
      status: 'Voice Node Online',
    }
  },
  {
    title: 'Predictive SEO & Keyword Blueprint',
    category: 'SEO Strategy',
    icon: Layers,
    prompt: 'Generate an algorithmic SEO content pillar architecture targeting high-intent buyer keywords for AI automation services.',
    output: {
      type: 'seo',
      cluster: 'AI Lead Automation Systems',
      keywords: ['best AI agency for CRM automation', 'n8n workflow setup for marketing', 'voice AI agent for lead qualification'],
      projectedTraffic: '+320% Organic Traffic Growth in 90 Days',
      status: 'Architecture Generated',
    }
  }
];

export default function AiStudio() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('canvas');
  const [copied, setCopied] = useState(false);

  const activeData = samplePrompts[activePromptIndex];

  // Auto-typing animation effect (GetLayers signature style)
  useEffect(() => {
    const fullText = samplePrompts[activePromptIndex].prompt;
    setTypedText('');
    setIsTyping(true);
    setIsGenerating(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setIsGenerating(false), 400);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activePromptIndex]);

  const handleSelectPrompt = (index) => {
    if (index === activePromptIndex) return;
    setActivePromptIndex(index);
  };

  const triggerManualRun = () => {
    const fullText = typedText || samplePrompts[activePromptIndex].prompt;
    setTypedText('');
    setIsTyping(true);
    setIsGenerating(true);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setTypedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setIsGenerating(false), 400);
      }
    }, 18);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeData.output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="studio-section" id="ai-studio">
      <div className="studio-glow" />

      <div className="studio-container">
        
        {/* Section Header */}
        <div className="studio-header">
          <span className="studio-badge">
            <Sparkles size={14} /> Buzzap AI Studio
          </span>
          <h2 className="studio-title">
            Build & Test Your AI Infrastructure<br />
            <span className="studio-title-accent">In Real Time.</span>
          </h2>
          <p className="studio-subtitle">
            Experience how Buzzap deploys autonomous ad scripts, n8n automation pipelines, and voice AI agents in seconds.
          </p>
        </div>

        {/* Studio Workspace Card Frame */}
        <div className="studio-workspace">
          
          {/* Top Control Bar */}
          <div className="studio-control-bar">
            <div className="studio-controls-left">
              <span className="studio-dot red" />
              <span className="studio-dot yellow" />
              <span className="studio-dot green" />
              <span className="studio-model-tag">
                <Cpu size={13} /> Buzzap DeepScale v4.2
              </span>
            </div>
            <div className="studio-controls-right">
              <div className="studio-tabs">
                <button
                  type="button"
                  className={`studio-tab-btn ${activeTab === 'canvas' ? 'active' : ''}`}
                  onClick={() => setActiveTab('canvas')}
                >
                  <Terminal size={14} /> Live Canvas
                </button>
                <button
                  type="button"
                  className={`studio-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
                  onClick={() => setActiveTab('json')}
                >
                  <Code size={14} /> Spec Payload
                </button>
              </div>
            </div>
          </div>

          {/* Studio Body Split */}
          <div className="studio-body">
            
            {/* LEFT COLUMN: PROMPT ENGINE & SAMPLE PILLS */}
            <div className="studio-prompt-col">
              <div className="studio-pills-label">Select Sample AI Workflow</div>
              <div className="studio-pills">
                {samplePrompts.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = activePromptIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`studio-pill ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectPrompt(idx)}
                    >
                      <Icon size={14} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Prompt Input Box */}
              <div className="studio-input-wrap">
                <div className="studio-input-header">
                  <span className="studio-input-label">Engine Prompt</span>
                  <span className="studio-tokens">{isTyping ? '⚡ Auto-Typing Prompt...' : 'Token Cost: 0.002'}</span>
                </div>
                <div className="studio-typing-display">
                  <span>{typedText}</span>
                  <span className="blinking-cursor">|</span>
                </div>
                <button
                  type="button"
                  className="studio-run-btn"
                  onClick={triggerManualRun}
                  disabled={isGenerating || isTyping}
                >
                  {isGenerating || isTyping ? (
                    <>
                      <RefreshCw size={16} className="spinning" />
                      <span>{isTyping ? 'Typing AI Prompt...' : 'Processing Neural Nodes...'}</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Run AI Workflow Engine</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE EXECUTION CANVAS */}
            <div className="studio-canvas-col">
              <div className="studio-canvas-header">
                <div className="studio-canvas-status">
                  <span className={`status-beacon ${isGenerating ? 'generating' : 'online'}`} />
                  <span>{isGenerating ? 'GENERATING WORKFLOW...' : 'PIPELINE READY'}</span>
                </div>
                <button type="button" className="studio-copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Spec' : 'Copy Spec'}</span>
                </button>
              </div>

              {/* Canvas Content Output Area */}
              <div className="studio-canvas-output">
                {isGenerating ? (
                  <div className="studio-generating-state">
                    <RefreshCw size={28} className="spinning" color="#6366f1" />
                    <p>Executing Neural Nodes & Database Pipeline...</p>
                  </div>
                ) : activeTab === 'canvas' ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePromptIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="studio-output-view"
                    >
                      {activeData.output.type === 'marketing' && (
                        <div className="output-card marketing">
                          <div className="output-badge">{activeData.output.roasTarget}</div>
                          <h3>{activeData.output.headline}</h3>
                          <div className="output-list">
                            {activeData.output.hooks.map((h, i) => (
                              <div key={i} className="output-hook-item">
                                <CheckCircle2 size={16} color="#10b981" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeData.output.type === 'workflow' && (
                        <div className="output-card workflow">
                          <div className="workflow-nodes">
                            {activeData.output.nodes.map((node, i) => (
                              <div key={i} className="node-row">
                                <div className="node-left">
                                  <span className="node-step">{i + 1}</span>
                                  <span className="node-name">{node.name}</span>
                                </div>
                                <div className="node-right">
                                  <span className="node-latency">{node.latency}</span>
                                  <span className="node-tag">{node.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="workflow-footer">{activeData.output.totalTime}</div>
                        </div>
                      )}

                      {activeData.output.type === 'voice' && (
                        <div className="output-card voice">
                          <div className="voice-audio-sim">
                            <div className="audio-wave">
                              <span /><span /><span /><span /><span /><span />
                            </div>
                            <span className="voice-status">VOICE ENGINE ACTIVE</span>
                          </div>
                          <blockquote className="voice-quote">{activeData.output.greeting}</blockquote>
                          <ul className="voice-features">
                            {activeData.output.capabilities.map((cap, i) => (
                              <li key={i}><CheckCircle2 size={14} color="#10b981" /> {cap}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeData.output.type === 'seo' && (
                        <div className="output-card seo">
                          <div className="seo-header">
                            <span className="seo-cluster">{activeData.output.cluster}</span>
                            <span className="seo-metric">{activeData.output.projectedTraffic}</span>
                          </div>
                          <div className="seo-keywords">
                            {activeData.output.keywords.map((kw, i) => (
                              <span key={i} className="kw-tag">#{kw}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <pre className="studio-json-code">
                    {JSON.stringify(activeData.output, null, 2)}
                  </pre>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
