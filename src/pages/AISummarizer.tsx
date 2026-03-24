import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, FileText, Sparkles, Loader2, X, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-pdf`;

function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsText(file);
  });
}

const AISummarizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selected.size > maxSize) {
      toast({ title: "File terlalu besar", description: "Maksimal 5MB", variant: "destructive" });
      return;
    }

    const validTypes = [
      "text/plain",
      "application/pdf",
      "text/markdown",
      "text/csv",
    ];
    // Also allow .txt, .md, .csv by extension
    const ext = selected.name.split(".").pop()?.toLowerCase();
    const validExts = ["txt", "md", "csv", "pdf"];

    if (!validTypes.includes(selected.type) && !validExts.includes(ext || "")) {
      toast({
        title: "Format tidak didukung",
        description: "Gunakan file .txt, .md, atau .csv. PDF harus berupa teks (bukan scan).",
        variant: "destructive",
      });
      return;
    }

    if (selected.type === "application/pdf" || ext === "pdf") {
      toast({
        title: "Catatan untuk PDF",
        description: "Untuk hasil terbaik, copy-paste teks dari PDF ke file .txt lalu upload. PDF scan tidak bisa dibaca.",
      });
    }

    setFile(selected);
    setSummary("");
  };

  const handleSummarize = async () => {
    if (!file) return;

    setIsLoading(true);
    setSummary("");

    try {
      const text = await extractTextFromFile(file);

      if (text.trim().length < 50) {
        toast({
          title: "Teks terlalu pendek",
          description: "File harus berisi minimal 50 karakter teks yang bisa dibaca.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Gagal memproses" }));
        throw new Error(err.error || "Gagal memproses");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              result += content;
              setSummary(result);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFile(null);
    setSummary("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen grid-bg p-3 sm:p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors text-sm"
        >
          <ArrowLeft size={18} /> Kembali
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          <Sparkles className="text-primary" size={24} />
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary neon-text-cyan">
            AI Rangkum Materi
          </h1>
        </motion.div>

        <p className="text-muted-foreground mb-6 text-xs sm:text-sm">
          Upload file materi pembelajaran (.txt, .md, .csv), lalu AI akan merangkum dan menjelaskan dengan bahasa yang mudah dipahami.
        </p>

        {/* Upload area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 sm:p-6 mb-6"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.csv,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />

          {!file ? (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center py-8 sm:py-12 border-2 border-dashed border-muted-foreground/30 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition-all"
            >
              <Upload size={36} className="text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-foreground mb-1">
                Klik untuk upload file
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                .txt, .md, .csv (maks 5MB)
              </p>
            </label>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText size={20} className="text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {file && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSummarize}
              disabled={isLoading}
              className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-display text-sm tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed neon-glow-cyan"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  RANGKUM DENGAN AI
                </>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass rounded-xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xs sm:text-sm tracking-widest text-primary">
                  HASIL RANGKUMAN
                </h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Tersalin" : "Salin"}
                </button>
              </div>

              <div className="prose prose-sm prose-invert max-w-none [&_h2]:font-display [&_h2]:text-base sm:[&_h2]:text-lg [&_h2]:text-primary [&_h2]:tracking-wider [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:text-foreground/80 [&_p]:leading-relaxed [&_p]:text-sm [&_li]:text-foreground/80 [&_li]:text-sm [&_strong]:text-foreground [&_ul]:space-y-1">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AISummarizer;
