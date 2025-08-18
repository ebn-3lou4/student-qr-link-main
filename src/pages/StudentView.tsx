import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StudentProfile } from "@/components/StudentProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

export const StudentView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<{
    student: string;
    class: string;
    school: string;
    motherName: string;
    motherPhone: string;
    fatherName: string;
    fatherPhone: string;
    gender?: "male" | "female";
    hideBack?: boolean;
    photoUrl?: string;
  } | null>(null);

  useEffect(() => {
    // Support long keys (student, class, ...) and short keys (s, c, ...)
    const student = searchParams.get("student") || searchParams.get("s");
    const className = searchParams.get("class") || searchParams.get("c");
    const school = searchParams.get("school") || searchParams.get("sc");
    const motherName = searchParams.get("motherName") || searchParams.get("mn") || "";
    const motherPhone = searchParams.get("motherPhone") || searchParams.get("mp") || "";
    const fatherName = searchParams.get("fatherName") || searchParams.get("fn") || "";
    const fatherPhone = searchParams.get("fatherPhone") || searchParams.get("fp") || "";
    const gender = (searchParams.get("gender") || searchParams.get("g")) as "male" | "female" | null;
    const hideBack = searchParams.get("hideBack") === "1" || searchParams.get("hb") === "1";
    const photoUrl = searchParams.get("photoUrl") || searchParams.get("p") || undefined;

    if (student && className && school) {
      setStudentData({
        student,
        class: className,
        school,
        motherName,
        motherPhone,
        fatherName,
        fatherPhone,
        gender: gender || undefined,
        hideBack,
        photoUrl,
      });
    }
  }, [searchParams]);

  const handleBack = () => {
    navigate("/");
  };

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card border-border/50">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold text-destructive">بيانات غير صحيحة</CardTitle>
            <CardDescription>
              لا يمكن العثور على بيانات الطالب في الرابط
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleBack}
              className="w-full gradient-primary hover:shadow-glow transition-smooth"
            >
              <Home className="w-4 h-4 mr-2" />
              العودة للصفحة الرئيسية
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <StudentProfile
        studentName={studentData.student}
        className={studentData.class}
        schoolName={studentData.school}
        motherName={studentData.motherName}
        motherPhone={studentData.motherPhone}
        fatherName={studentData.fatherName}
        fatherPhone={studentData.fatherPhone}
        onBack={handleBack}
        hideBack={studentData.hideBack}
        photoUrl={studentData.photoUrl}
      />
    </div>
  );
};