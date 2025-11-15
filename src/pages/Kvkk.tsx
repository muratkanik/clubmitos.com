import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, FileText, Users } from 'lucide-react';

export default function Kvkk() {
  const { language } = useLanguage();

  const contentTR = {
    title: "KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ",
    intro: "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, gerçek bir kişinin kimliğini belirli ya da belirlenebilir bir hale getirmeye yarayan her türlü bilgi kişisel veri kapsamındadır. Mitos nezdindeki kişisel verileriniz aşağıda açıklanan işlenme amaçları, hukuki nedenleri, toplanma yöntemleri, kimlere ve hangi amaçlarla aktarılabileceği ve KVKK kapsamında size tanınan haklara ilişkin olarak sizleri bilgilendirmek istiyoruz.",
    sections: [
      {
        title: "1. Kişisel Verilerin Toplanması ve Hukuki Sebep",
        content: "Mitos tarafından veri sorumlusu sıfatı ile internet sitesi, mobil uygulamalar, sosyal medya mecraları ve fiziki kanallar gibi farklı kanallarda toplanan kişisel verileriniz, üyelik başvurunuz ve etkinlik katılımlarınız kapsamında işlenmektedir. Bu veriler KVKK'nın 5. ve 6. maddelerinde belirtilen hukuki sebeplere dayanılarak toplanmaktadır."
      },
      {
        title: "2. Kişisel Verilerin İşlenme Amaçları",
        content: "Toplanan kişisel verileriniz; üyelik başvurunuzun değerlendirilmesi, etkinlik organizasyonlarının planlanması ve yürütülmesi, sizinle iletişime geçilmesi, güvenliğinizin sağlanması, yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir."
      },
      {
        title: "3. Kişisel Verilerin Aktarılması",
        content: "Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda iş ortaklarımıza, tedarikçilerimize, yasal yükümlülüklerimiz çerçevesinde kamu kurum ve kuruluşlarına KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar çerçevesinde aktarılabilmektedir."
      },
      {
        title: "4. Kişisel Veri Sahibinin Hakları",
        content: "KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme, ilgili mevzuatta öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme haklarına sahipsiniz."
      }
    ]
  };

  const contentEN = {
    title: "PERSONAL DATA PROTECTION DISCLOSURE TEXT",
    intro: "In accordance with Law No. 6698 on the Protection of Personal Data (\"GDPR\"), any information that makes a real person identifiable or identifiable is within the scope of personal data. We would like to inform you about the processing purposes, legal reasons, collection methods, to whom and for what purposes your personal data at Mitos may be transferred, and your rights under GDPR.",
    sections: [
      {
        title: "1. Collection of Personal Data and Legal Basis",
        content: "Your personal data collected by Mitos as data controller through various channels such as website, mobile applications, social media platforms and physical channels are processed within the scope of your membership application and event participation. This data is collected based on the legal grounds specified in Articles 5 and 6 of the GDPR."
      },
      {
        title: "2. Purposes of Processing Personal Data",
        content: "Your collected personal data is processed for the purposes of evaluating your membership application, planning and conducting event organizations, contacting you, ensuring your safety, and fulfilling legal obligations."
      },
      {
        title: "3. Transfer of Personal Data",
        content: "Your personal data may be transferred to our business partners, suppliers, and public institutions and organizations within the framework of our legal obligations, in accordance with the conditions specified in Articles 8 and 9 of the GDPR, in order to achieve the purposes stated above."
      },
      {
        title: "4. Rights of the Data Subject",
        content: "In accordance with Article 11 of the GDPR, as personal data subjects, you have the right to learn whether your personal data is processed, request information if processed, learn the purpose of processing and whether they are used in accordance with their purpose, know the third parties to whom they are transferred domestically or abroad, request correction if processed incompletely or incorrectly, and request deletion or destruction within the framework of the conditions stipulated in the relevant legislation."
      }
    ]
  };

  const content = language === 'tr' ? contentTR : contentEN;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-[#d4af37] mx-auto mb-4" />
          <h1 className="text-4xl font-serif text-[#d4af37] mb-4">{content.title}</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#d4af37]/20 p-8 mb-8">
          <p className="text-gray-300 leading-relaxed">{content.intro}</p>
        </div>

        <div className="space-y-6">
          {content.sections.map((section, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-lg rounded-xl border border-[#d4af37]/20 p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {idx === 0 && <FileText className="w-8 h-8 text-[#d4af37]" />}
                  {idx === 1 && <Lock className="w-8 h-8 text-[#d4af37]" />}
                  {idx === 2 && <Users className="w-8 h-8 text-[#d4af37]" />}
                  {idx === 3 && <Shield className="w-8 h-8 text-[#d4af37]" />}
                </div>
                <div>
                  <h2 className="text-xl font-serif text-[#d4af37] mb-3">{section.title}</h2>
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            {language === 'tr' 
              ? 'Sorularınız için: info@clubmitos.com' 
              : 'For questions: info@clubmitos.com'}
          </p>
        </div>
      </div>
    </div>
  );
}
