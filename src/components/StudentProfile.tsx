import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, User, School, Users, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentProfileProps {
  studentName: string;
  className: string;
  schoolName: string;
  motherName: string;
  motherPhone: string;
  fatherName: string;
  fatherPhone: string;
  onBack: () => void;
  hideBack?: boolean;
  photoUrl?: string;
}

export const StudentProfile = ({
  studentName,
  className,
  schoolName,
  motherName,
  motherPhone,
  fatherName,
  fatherPhone,
  onBack,
  hideBack,
  photoUrl,
}: StudentProfileProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleCall = (phoneNumber: string, parentName: string) => {
    if (!phoneNumber) {
      toast({
        title: "رقم غير متاح",
        description: "رقم الهاتف غير مسجل",
        variant: "destructive",
      });
      return;
    }

    // Remove any non-digit characters and format the number
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const callUrl = `tel:${cleanNumber}`;
    window.location.href = callUrl;

    toast({
      title: "بدء المكالمة",
      description: `جاري الاتصال بـ ${parentName}`,
    });
  };

  const normalizeWhatsapp = (phoneNumber: string): string => {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    const withoutLeadingZeros = digitsOnly.replace(/^0+/, "");
    return withoutLeadingZeros.startsWith("20") ? withoutLeadingZeros : `20${withoutLeadingZeros}`;
  };

  const handleWhatsApp = (phoneNumber: string, parentName: string) => {
    if (!phoneNumber) {
      toast({
        title: "رقم غير متاح",
        description: "رقم الهاتف غير مسجل",
        variant: "destructive",
      });
      return;
    }

    const withCountry = normalizeWhatsapp(phoneNumber);
    const message = encodeURIComponent(`مرحباً ${parentName}، أتواصل معكم بخصوص الطالب ${studentName}`);
    const whatsappUrl = `https://wa.me/${withCountry}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "فتح واتساب",
      description: `جاري فتح محادثة مع ${parentName}`,
    });
  };

  const ContactCard = ({
    name,
    phone,
    role
  }: {
    name: string;
    phone: string;
    role: string;
  }) => {
    if (!name && !phone) return null;

    return (
      <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-bold text-lg text-foreground">{role}</h4>
            {name && <p className="text-base text-muted-foreground">{name}</p>}
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {role === "الأم" ? "أم" : "أب"}
          </Badge>
        </div>

        {phone && (
          <div className="flex gap-2">
            <Button
              size="lg"
              onClick={() => handleCall(phone, name || role)}
              className="flex-1 rounded-full h-11 gradient-primary hover:shadow-glow transition-smooth"
            >
              <Phone className="w-4 h-4 mr-2" />
              اتصال
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleWhatsApp(phone, name || role)}
              className="flex-1 rounded-full h-11 bg-success hover:bg-success/80 text-success-foreground hover:shadow-glow transition-smooth"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              واتساب
            </Button>
          </div>
        )}

        {phone && (
          <p className="text-base font-medium text-muted-foreground mt-2 text-center">
            {phone}
          </p>
        )}
      </div>
    );
  };

  const renderAvatar = (size: "sm" | "lg") => {
    const className = size === "lg" ? "w-20 h-20" : "w-12 h-12";
    if (photoUrl && !imageError) {
      return (
        <img
          src={photoUrl}
          alt="صورة الطالب"
          className={`${className} rounded-full object-cover border-4 border-white shadow-card`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      );
    }
    return (
      <div className={`${className} gradient-primary rounded-full flex items-center justify-center`}>
        <User className={size === "lg" ? "w-10 h-10 text-primary-foreground" : "w-6 h-6 text-primary-foreground"} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          {!hideBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="transition-smooth hover:shadow-glow rounded-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              رجوع
            </Button>
          )}
          <div className="overflow-hidden">
            {renderAvatar("sm")}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">ملف الطالب</h1>
            <p className="text-muted-foreground">معلومات الطالب وبيانات التواصل</p>
          </div>
        </div>

        {/* Student Information Card */}
        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {renderAvatar("lg")}
            </div>
            <CardTitle className="text-3xl font-extrabold text-primary">{studentName}</CardTitle>
            <CardDescription className="text-lg">
              <div className="flex items-center justify-center gap-2 text-accent">
                <School className="w-5 h-5" />
                {schoolName}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Badge variant="secondary" className="text-lg px-4 py-2 rounded-full bg-accent/10 text-accent">
                {className}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Users className="w-6 h-6" />
              معلومات التواصل
            </CardTitle>
            <CardDescription>
              اضغط على الأزرار للاتصال أو إرسال رسالة واتساب
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContactCard
              name={motherName}
              phone={motherPhone}
              role="الأم"
            />
            <ContactCard
              name={fatherName}
              phone={fatherPhone}
              role="الأب"
            />

            {!motherPhone && !fatherPhone && (
              <div className="text-center py-8 text-muted-foreground">
                <Phone className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>لا توجد أرقام هاتف مسجلة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};