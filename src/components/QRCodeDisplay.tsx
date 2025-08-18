import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, QrCode } from "lucide-react";
import { StudentData } from "./StudentForm";
import { useToast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  studentData: StudentData;
  onReset: () => void;
}

export const QRCodeDisplay = ({ studentData, onReset }: QRCodeDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateQRCode();
  }, [studentData]);

  const generateQRCode = async () => {
    if (!canvasRef.current) return;

    try {
      // Create compact URL with student data as short query parameters
      const baseUrl = window.location.origin;
      const params = new URLSearchParams({
        s: studentData.studentName, // student
        c: studentData.className,   // class
        sc: studentData.schoolName, // school
        mn: studentData.motherName,
        mp: studentData.motherPhone,
        fn: studentData.fatherName,
        fp: studentData.fatherPhone,
        g: studentData.gender,
        hb: "1",
      });
      if ((studentData as any).photoUrl) {
        params.set("p", (studentData as any).photoUrl);
      }

      const qrUrl = `${baseUrl}/student?${params.toString()}`;

      await QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: 260, // a bit smaller for ID stickers
        margin: 1,
        errorCorrectionLevel: "M", // lower density than default "M"/"Q"
        color: {
          dark: "#0f4c75",
          light: "#ffffff",
        },
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء رمز QR",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `${studentData.studentName}_QR.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();

    toast({
      title: "تم التحميل",
      description: "تم تحميل رمز QR بنجاح",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-card border-border/50">
      <CardHeader className="text-center">
        <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl font-bold text-primary">رمز QR جاهز</CardTitle>
        <CardDescription>
          امسح الرمز لعرض بيانات الطالب
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="p-3 bg-white rounded-lg shadow-inner">
            <canvas ref={canvasRef} className="rounded-lg" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="font-semibold text-primary">{studentData.studentName}</p>
          <p className="text-sm text-muted-foreground">{studentData.className}</p>
          <p className="text-sm text-muted-foreground">{studentData.schoolName}</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={downloadQRCode}
            variant="secondary"
            className="flex-1 transition-smooth hover:shadow-glow rounded-full"
          >
            <Download className="w-4 h-4 mr-2" />
            تحميل
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="flex-1 transition-smooth hover:shadow-glow rounded-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            جديد
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};