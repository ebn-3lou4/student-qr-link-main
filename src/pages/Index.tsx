import { useEffect, useState } from "react";
import { StudentForm, StudentData, STORAGE_KEY } from "@/components/StudentForm";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { GraduationCap, ArrowRight, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAVED_LIST_KEY = "student-saved-records";

type SavedRecord = StudentData & { id: string; createdAt: number };

const Index = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState<SavedRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SAVED_LIST_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch { }
  }, []);

  const persistSaved = (records: SavedRecord[]) => {
    setSaved(records);
    try { localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(records)); } catch { }
  };

  const handleFormSubmit = async (data: StudentData) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    setStudentData(data);
    setIsGenerating(false);

    // Save/update to saved list
    const idFromStorage = crypto.randomUUID();
    const record: SavedRecord = { ...data, id: idFromStorage, createdAt: Date.now() };
    const next = [record, ...saved].slice(0, 50); // cap list
    persistSaved(next);
  };

  const handleReset = () => {
    setStudentData(null);
  };

  const loadSaved = (record: SavedRecord) => {
    // hydrate form with selected record
    setStudentData(null);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(record)); } catch { }
    // Force re-render of form by toggling state
    setTimeout(() => setStudentData(null), 0);
  };

  const deleteSaved = (id: string) => {
    const next = saved.filter(r => r.id !== id);
    persistSaved(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 gradient-hero rounded-full flex items-center justify-center animate-bounce-gentle">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary">نظام إدارة بيانات الطلاب</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          إنشاء رموز QR للطلاب مع إمكانية الوصول السريع لبيانات التواصل مع أولياء الأمور
        </p>
      </div>

      {/* Back button when QR is displayed */}
      {studentData && (
        <div className="max-w-2xl mx-auto mb-4">
          <Button variant="outline" size="sm" className="rounded-full" onClick={handleReset}>
            <ArrowRight className="w-4 h-4 mr-2" />
            رجوع
          </Button>
        </div>
      )}

      {/* Saved list */}
      {!studentData && saved.length > 0 && (
        <div className="max-w-2xl mx-auto mb-6">
          <div className="text-right mb-2 font-semibold text-primary">السجلات المحفوظة</div>
          <div className="space-y-2">
            {saved.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border/50">
                <div className="text-sm">
                  <div className="font-semibold">{r.studentName}</div>
                  <div className="text-muted-foreground">{r.className} • {r.schoolName}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => loadSaved(r)}>
                    <Edit3 className="w-4 h-4 mr-1" /> تعديل
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteSaved(r.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex justify-center">
        {!studentData ? (
          <StudentForm onSubmit={handleFormSubmit} isGenerating={isGenerating} initialData={null} />
        ) : (
          <QRCodeDisplay studentData={studentData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default Index;
