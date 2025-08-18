import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, School, Phone, Users } from "lucide-react";

export interface StudentData {
  studentName: string;
  className: string;
  schoolName: string;
  motherName: string;
  motherPhone: string;
  fatherName: string;
  fatherPhone: string;
  gender: "male" | "female";
  photoUrl?: string;
}

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  isGenerating: boolean;
  initialData?: StudentData | null;
}

export const STORAGE_KEY = "student-form-state";

export const StudentForm = ({ onSubmit, isGenerating, initialData }: StudentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StudentData>({
    studentName: "",
    className: "",
    schoolName: "",
    motherName: "",
    motherPhone: "",
    fatherName: "",
    fatherPhone: "",
    gender: "male",
    photoUrl: "",
  });

  // Load saved data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // If parent provides initialData (e.g., from saved record), hydrate and persist it
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      } catch { }
    }
  }, [initialData]);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.studentName || !formData.className || !formData.schoolName) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع البيانات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (!formData.motherPhone && !formData.fatherPhone) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال رقم هاتف واحد على الأقل",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field: keyof StudentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card border-border/50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
          <User className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">إضافة بيانات طالب جديد</CardTitle>
        <CardDescription>
          أدخل بيانات الطالب لإنشاء رمز QR خاص به
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gender Selection */}
          <div className="space-y-2">
            <Label className="text-foreground font-medium">النوع</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => handleInputChange("gender", "male")}
                className={formData.gender === "male" ? "gradient-primary text-primary-foreground" : ""}
                variant={formData.gender === "male" ? "default" : "outline"}
              >
                ولد
              </Button>
              <Button
                type="button"
                onClick={() => handleInputChange("gender", "female")}
                className={formData.gender === "female" ? "bg-pink-500 text-white" : ""}
                variant={formData.gender === "female" ? "default" : "outline"}
              >
                بنت
              </Button>
            </div>
          </div>
          {/* Student Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <User className="w-5 h-5" />
              <span>بيانات الطالب</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName" className="text-foreground font-medium">
                  اسم الطالب *
                </Label>
                <Input
                  id="studentName"
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  placeholder="أدخل اسم الطالب"
                  required
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="className" className="text-foreground font-medium">
                  الفصل *
                </Label>
                <Input
                  id="className"
                  type="text"
                  value={formData.className}
                  onChange={(e) => handleInputChange("className", e.target.value)}
                  placeholder="مثال: الصف الثالث أ"
                  required
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="schoolName" className="text-foreground font-medium flex items-center gap-2">
                <School className="w-4 h-4" />
                اسم المدرسة *
              </Label>
              <Input
                id="schoolName"
                type="text"
                value={formData.schoolName}
                onChange={(e) => handleInputChange("schoolName", e.target.value)}
                placeholder="أدخل اسم المدرسة"
                required
                className="transition-smooth focus:shadow-glow"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl" className="text-foreground font-medium">
                رابط صورة الطالب (اختياري)
              </Label>
              <Input
                id="photoUrl"
                type="url"
                value={formData.photoUrl}
                onChange={(e) => handleInputChange("photoUrl", e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="transition-smooth focus:shadow-glow"
              />
            </div>
          </div>

          {/* Parents Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Users className="w-5 h-5" />
              <span>بيانات ولي الأمر</span>
            </div>

            {/* Mother Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="space-y-2">
                <Label htmlFor="motherName" className="text-foreground font-medium">
                  اسم الأم
                </Label>
                <Input
                  id="motherName"
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  placeholder="أدخل اسم الأم"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherPhone" className="text-foreground font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم هاتف الأم
                </Label>
                <Input
                  id="motherPhone"
                  type="tel"
                  value={formData.motherPhone}
                  onChange={(e) => handleInputChange("motherPhone", e.target.value)}
                  placeholder="مثال: 01234567890"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
            </div>

            {/* Father Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-secondary/30">
              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-foreground font-medium">
                  اسم الأب
                </Label>
                <Input
                  id="fatherName"
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  placeholder="أدخل اسم الأب"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherPhone" className="text-foreground font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  رقم هاتف الأب
                </Label>
                <Input
                  id="fatherPhone"
                  type="tel"
                  value={formData.fatherPhone}
                  onChange={(e) => handleInputChange("fatherPhone", e.target.value)}
                  placeholder="مثال: 01234567890"
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full h-12 gradient-primary hover:shadow-glow transition-smooth text-lg font-semibold"
          >
            {isGenerating ? "جاري إنشاء رمز QR..." : "إنشاء رمز QR"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};