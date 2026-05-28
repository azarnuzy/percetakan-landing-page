import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Facebook,
  Flag,
  Instagram,
  Mail,
  MapPin,
  Music2,
  PackageCheck,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const Route = createFileRoute("/")({
  component: HomePage,
});

// ── Shared animation variants ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

const cardFade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

// ── Data ──────────────────────────────────────────────────────────────────────

const SERVICE_CATEGORIES = ["Semua", "Print", "Fotokopi", "Jilid", "Laminating", "Stiker", "Banner"] as const;

const services = [
  { title: "Print Dokumen", description: "Cetak tugas, proposal, laporan kantor, dan arsip bisnis.", image: "/produk-cetak-foto-warna.png", category: "Print" },
  { title: "Fotokopi", description: "Hitam putih atau warna, cepat untuk kebutuhan harian.", image: "/print_assets.png", category: "Fotokopi" },
  { title: "Jilid Skripsi", description: "Hardcover, softcover, spiral, dan laminating cover.", image: "/product-print-skripsi.png", category: "Jilid" },
  { title: "Laminating", description: "Laminating dokumen, cover buku, dan berbagai ukuran.", image: "/product-map-folder-proposal.png", category: "Laminating" },
  { title: "Stiker Label", description: "Stiker kemasan, label produk, dan kebutuhan branding.", image: "/produk-stiker-label.png", category: "Stiker" },
  { title: "Banner & Spanduk", description: "Media promosi, backdrop event, dan display outdoor.", image: "/product-banner-spanduk.png", category: "Banner" },
  { title: "Scan Dokumen", description: "Scan dokumen, arsip, dan file penting ke format digital.", image: "/product-nota-invoice.png", category: "Print" },
  { title: "Order Online & Antar", description: "Pesan lewat WhatsApp, file dikirim, hasil diantar ke lokasi Anda.", image: "/contact_customer_service.png", category: "Print" },
];

const popularProducts = [
  { title: "Skripsi Hardcover", image: "/product-jilid-hardcover.png" },
  { title: "Proposal Spiral", image: "/product-proposal-spiral.png" },
  { title: "Brosur A4", image: "/product-brosur-lipat-tiga.png" },
  { title: "Kartu Nama", image: "/product-kartu-nama.png" },
  { title: "Stiker UMKM", image: "/product_sticker_snack.png" },
  { title: "Banner Acara", image: "/prdouct_big_banner.png" },
];

const orderSteps = [
  { title: "Upload / Kirim File", description: "Kirim file via WhatsApp, Email, atau Google Drive dengan mudah.", image: "/order_steps_01_upload_file.png" },
  { title: "Pilih Layanan", description: "Tentukan jenis layanan, ukuran, jumlah, dan finishing sesuai kebutuhan.", image: "/order_steps_02_pilih_layanan.png" },
  { title: "Konfirmasi", description: "Kami cek detail pesanan dan kirimkan ringkasan harga untuk konfirmasi.", image: "/order_steps_03_konfirmasi.png" },
  { title: "Proses Cetak", description: "Pesanan diproses oleh tim profesional dengan mesin berkualitas tinggi.", image: "/order_steps_04_proses_cetak.png" },
  { title: "Ambil / Antar", description: "Ambil di toko atau kami antar langsung ke lokasi Anda.", image: "/order_steps_05_ambil_antar.png" },
];

type Benefit = { title: string; description: string; image?: string; icon?: LucideIcon };

const orderBenefits: Benefit[] = [
  { title: "Respon Cepat", description: "Tim kami membalas pesan dengan cepat dan siap membantu 7 hari seminggu.", image: "/order_benefits_01_respon_cepat.png" },
  { title: "Preview Sebelum Cetak", description: "Cek tampilan hasil desain sebelum proses cetak dimulai.", icon: Eye },
  { title: "Bisa Revisi", description: "Tidak sesuai ekspektasi? Kami siap revisi hingga Anda puas.", image: "/order_benefits_03_bisa_revisi.png" },
  { title: "Same Day", description: "Untuk order tertentu, selesai hari ini juga dan siap diambil.", image: "/order_benefits_04_same_day.png" },
];

const testimonials = [
  { category: "Mahasiswa", quote: "Jadi pelanggan tetap. Hasil selalu memuaskan, terjangkau, dan pengerjaan cepat. Pengiriman sangat baik dan tidak perlu khawatir.", name: "Rizky Pratama", location: "Mahasiswa UGM", image: "/testimoni_student_thesis.png" },
  { category: "Kantor", quote: "Kami bekerja sama dengan CetakKita karena kualitasnya konsisten. Pelayanan responsif dan selalu tepat waktu.", name: "Dewi Lestari", location: "Staf HRD", image: "/testimoni_hr_office.png" },
  { category: "UMKM", quote: "Kemasan produk dan brosur kami terlihat jauh lebih profesional. Branding UMKM kami makin kuat berkat CetakKita.", name: "Andi Setiawan", location: "Pemilik Toko", image: "/testimoni_umkm_product.png" },
  { category: "Mahasiswa", quote: "Skripsi saya dicetak dengan hasil luar biasa! Hardcover-nya sangat rapi dan kualitas print warna hitam putihnya tajam.", name: "Budi Santoso", location: "Mahasiswa Teknik UNY", image: "/testimoni_student_thesis.png" },
  { category: "UMKM", quote: "Stiker dan label produk kami hasilnya memuaskan banget. Warnanya tajam, nempel kuat, cocok buat branding produk kami.", name: "Sari Wijayanti", location: "Pemilik UMKM Kuliner", image: "/testimoni_umkm_product.png" },
  { category: "Kantor", quote: "Kebutuhan cetak dokumen kantor terpenuhi dengan sangat baik. Tim CetakKita responsif dan hasilnya selalu memuaskan.", name: "Hendra Kusuma", location: "Manager Operasional", image: "/testimoni_hr_office.png" },
];

const faqItems = [
  { question: "Berapa lama waktu pengerjaan order?", answer: "Tergantung jenis layanan. Print dokumen biasanya 1–2 jam, jilid skripsi 1 hari kerja, banner 1–2 hari kerja." },
  { question: "Apa saja format file yang diterima?", answer: "Kami menerima PDF, DOCX, CDR, AI, PSD, PNG, dan JPG. Format PDF sangat disarankan untuk hasil terbaik." },
  { question: "Bagaimana cara melakukan pemesanan?", answer: "Kirim file dan detail order via WhatsApp. Tim kami akan membalas dengan estimasi harga dan waktu pengerjaan." },
  { question: "Apakah ada layanan antar ke rumah?", answer: "Ya, kami melayani pengiriman ke seluruh Yogyakarta dan sekitarnya. Cukup minta antar saat konfirmasi order." },
  { question: "Bagaimana jika hasil cetak tidak sesuai?", answer: "Kami memberikan jaminan kepuasan. Jika hasil tidak sesuai ekspektasi, kami siap revisi tanpa biaya tambahan." },
];

// ── Components ────────────────────────────────────────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeIn" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <motion.img
          src="/logo-with-text.png"
          alt="CetakKita"
          className="h-14 w-auto"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <motion.p
          className="text-sm font-semibold tracking-widest text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          Cetak · Cepat · Rapi
        </motion.p>

        <div className="relative h-1 w-52 overflow-hidden rounded-full bg-border">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.95, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(onComplete, 150)}
          />
        </div>
      </div>
    </motion.div>
  );
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);

  return (
    <>
      <AnimatePresence onExitComplete={() => setHeroReady(true)}>
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* main is given pt-20 to match the fixed header's maximum height and prevent layout shift */}
      <main className="min-h-screen pt-20">
        <SiteHeader />
        <HeroSection ready={heroReady} />
        <ServicesSection />
        <OrderSection />
        <TrustSection />
        <SiteFooter />
      </main>
    </>
  );
}

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled
          ? "px-4 py-2 lg:px-8 bg-transparent"
          : "border-b border-border/70 bg-background/88 backdrop-blur-xl py-0 px-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
          scrolled
            ? "h-14 max-w-5xl rounded-2xl border border-border/80 bg-background/95 px-4 backdrop-blur-2xl shadow-lg shadow-black/[0.08] sm:px-5"
            : "h-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 border border-transparent bg-transparent"
        )}
      >
        <a href="#" className="flex items-center gap-3 transition-all duration-300 ease-in-out" aria-label="CetakKita">
          <img
            src="/logo-with-text.png"
            alt="CetakKita"
            className={cn(
              "w-auto transition-all duration-300 ease-in-out",
              scrolled ? "h-8" : "h-10"
            )}
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#layanan" className="transition hover:text-primary">Layanan</a>
          <a href="#produk" className="transition hover:text-primary">Produk</a>
          <a href="#order" className="transition hover:text-primary">Cara Order</a>
          <a href="#harga" className="transition hover:text-primary">Harga</a>
          <a href="#kontak" className="transition hover:text-primary">Kontak</a>
        </nav>

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler
            variant="circle"
            storageKey="cetakkita-theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          />
          <Button
            className="hidden bg-brand-whatsapp text-white shadow-lg shadow-brand-whatsapp/20 hover:bg-brand-whatsapp/90 sm:inline-flex"
            render={
              <a href="https://wa.me/6282112345678">
                <WhatsAppIcon />
                Pesan via WhatsApp
              </a>
            }
          />
        </div>
      </div>
    </header>
  );
}

function HeroSection({ ready }: { ready: boolean }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-teal/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-8 h-80 w-80 rounded-full bg-brand-orange/25 blur-[80px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-0 lg:px-8">
        {/* Left: staggered content */}
        <motion.div
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
          className="relative z-10 py-16 lg:py-24 lg:pr-10"
        >
          <motion.div variants={fadeUp}>
            <Badge
              className="mb-6 h-10 border-primary/20 bg-secondary px-4 text-sm text-primary shadow-sm"
              variant="outline"
            >
              <Sparkles />
              Cepat · Rapi · Berkualitas
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]"
          >
            Solusi <span className="text-primary">Print</span>, Fotokopi, dan{" "}
            <span className="text-brand-orange">Jilid</span> yang Cepat & Rapi
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground"
          >
            Cetak tugas, skripsi, dokumen kantor, hingga kebutuhan bisnis UMKM
            Anda — semua bisa diselesaikan dengan cepat, rapi, dan berkualitas.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            {[
              { label: "Print", icon: Printer },
              { label: "Fotokopi", icon: Copy },
              { label: "Jilid", icon: BookOpen },
              { label: "Banner", icon: Flag },
            ].map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background/80 px-5 text-sm font-bold shadow-sm backdrop-blur-sm"
              >
                <Icon className="size-4 text-primary" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-14 rounded-xl bg-primary px-7 text-base font-bold shadow-xl shadow-primary/25 hover:bg-primary/90"
              render={<a href="#layanan">Lihat Layanan <ArrowRight /></a>}
            />
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-xl border-brand-whatsapp/40 px-7 text-base font-bold text-brand-whatsapp hover:bg-brand-whatsapp/10"
              render={<a href="https://wa.me/6282112345678"><WhatsAppIcon />Pesan via WhatsApp</a>}
            />
          </motion.div>
        </motion.div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="relative hidden min-h-[calc(100vh-5rem)] lg:flex lg:items-center"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
          <img
            src="/bg-hero.png"
            alt="Layanan CetakKita — cetak, fotokopi, jilid"
            className="h-[85vh] max-h-[720px] w-full rounded-3xl object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}

const paketMahasiswaItems = [
  "Jilid skripsi hardcover",
  "Print black & white / color",
  "Laminating cover",
  "Gratis cek dokumen",
  "Estimasi pengerjaan cepat",
];

function PaketMahasiswaCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-primary/20 bg-gradient-to-b from-secondary to-card shadow-xl shadow-primary/10">
        <CardHeader className="pb-3 pt-4">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg font-black text-primary">Paket Mahasiswa</CardTitle>
            <Badge className="border-brand-orange/30 bg-brand-orange/10 text-brand-orange" variant="outline">
              <Star />Best Seller
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Paket lengkap untuk skripsi dan proposal mahasiswa dengan harga khusus.
          </CardDescription>
        </CardHeader>
        <div className="mx-3 aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:min-h-0 lg:flex-1">
          <img src="/product-jilid-hardcover.png" alt="Paket Mahasiswa CetakKita" className="h-full w-full object-cover object-center" />
        </div>
        <CardContent className="space-y-2.5 pb-4 pt-4">
          {paketMahasiswaItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3.5" />
              </span>
              {item}
            </div>
          ))}
          <Button className="mt-2 h-11 w-full rounded-xl bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90">
            Lihat Paket <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const filtered =
    activeCategory === "Semua"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="layanan" className="border-y border-border/70 bg-card/45 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-6 lg:grid-cols-[1fr_360px]">

          {/* Col 1, Row 1: Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:col-start-1 lg:row-start-1"
          >
            <Badge className="mb-3 border-primary/20 bg-secondary text-primary" variant="outline">
              <PackageCheck />Layanan & Produk
            </Badge>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              Layanan & <span className="text-primary">Produk</span>{" "}
              <span className="text-brand-orange">Unggulan</span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Struktur layanan lengkap untuk semua kebutuhan, dari dokumen dan laporan, hingga produk bisnis terbaik.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                    activeCategory === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Col 1, Row 2: Service cards */}
          <motion.div
            id="produk"
            variants={stagger(0, 0.065)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-start-1 lg:row-start-2 lg:grid-cols-4 self-start"
          >
            {filtered.map((service) => (
              <motion.div
                key={service.title}
                variants={cardFade}
                className="flex flex-col h-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex flex-col flex-1 p-3">
                  <p className="text-sm font-extrabold leading-snug">{service.title}</p>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">{service.description}</p>
                  <a href="#" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                    Lihat Detail <ChevronRight className="size-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Col 2, spans rows 1–2: Paket Mahasiswa */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.6, ease: "easeOut" } } }}
            className="hidden lg:col-start-2 lg:row-start-1 lg:row-end-3 lg:block"
          >
            <PaketMahasiswaCard className="h-full" />
          </motion.div>
        </div>

        {/* Paket Mahasiswa — mobile only */}
        <PaketMahasiswaCard className="mt-6 lg:hidden" />

        {/* Produk Populer */}
        <div className="mt-8">
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="mb-3 text-xl font-black"
          >
            Produk <span className="text-primary">Populer</span>
          </motion.h3>
          <motion.div
            variants={stagger(0.05, 0.065)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-3 gap-3 sm:grid-cols-6"
          >
            {popularProducts.map((product) => (
              <motion.div
                key={product.title}
                variants={cardFade}
                className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="truncate text-xs font-bold leading-tight">{product.title}</span>
                  <ChevronRight className="ml-1 size-3 flex-shrink-0 text-primary" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OrderSection() {
  return (
    <section id="order" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={stagger(0, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-10 lg:grid-cols-[1fr_420px]"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-4 border-primary/20 bg-secondary text-primary" variant="outline">
              <Truck />Cara Order
            </Badge>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl">
              Cara Order yang{" "}
              <span className="text-primary">Mudah</span>,{" "}
              <span className="text-brand-orange">Cepat</span>, dan Fleksibel
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Kami membuat proses order jadi simpel dan efisien, agar Anda bisa fokus pada hal yang lebih penting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 rounded-xl bg-brand-whatsapp px-6 text-white shadow-lg shadow-brand-whatsapp/20 hover:bg-brand-whatsapp/90"
                render={<a href="https://wa.me/6282112345678"><WhatsAppIcon />Pesan via WhatsApp</a>}
              />
              <Button
                variant="outline"
                className="h-12 rounded-xl px-6"
                render={<a href="#order">Lihat Detail Cara Order <ArrowRight /></a>}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <img src="/storefront.png" alt="Layanan CetakKita" className="h-full w-full object-cover object-center" />
          </motion.div>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger(0.05, 0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          {orderSteps.map((step, index) => (
            <motion.div key={step.title} variants={cardFade} className="relative flex flex-col items-center text-center">
              {index < orderSteps.length - 1 && (
                <div className="absolute right-0 top-[52px] hidden h-px w-1/2 translate-x-1/2 bg-border lg:block" />
              )}
              <div className="mb-3 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img src={step.image} alt={step.title} className="aspect-square w-full object-cover object-center" />
              </div>
              <div className="mb-2 flex size-7 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                {index + 1}
              </div>
              <p className="text-sm font-extrabold leading-snug">{step.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={stagger(0.05, 0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {orderBenefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={cardFade}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="size-14 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                {benefit.image ? (
                  <img src={benefit.image} alt={benefit.title} className="h-full w-full object-cover object-center" />
                ) : benefit.icon ? (
                  <div className="flex h-full items-center justify-center">
                    <benefit.icon className="size-6 text-primary" />
                  </div>
                ) : null}
              </div>
              <div>
                <p className="text-sm font-extrabold">{benefit.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    setSlideCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <section id="kontak" className="relative overflow-hidden bg-card/55 py-20">
      <div className="pointer-events-none absolute -left-28 -top-10 h-[420px] w-[420px] rounded-full bg-brand-teal/20 blur-[100px]" />
      <div className="pointer-events-none absolute -left-10 bottom-1/3 h-[220px] w-[220px] rounded-full bg-brand-teal/15 blur-[70px]" />
      <div className="pointer-events-none absolute -right-20 top-2/3 h-[280px] w-[280px] rounded-full bg-brand-orange/15 blur-[80px]" />
      <div
        className="pointer-events-none absolute left-4 top-1/3 h-[180px] w-[100px] opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle, currentColor 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-10 text-center"
        >
          <Badge className="mb-4 border-primary/20 bg-secondary text-primary" variant="outline">
            <ShieldCheck />Dipercaya Ribuan Pelanggan
          </Badge>
          <h2 className="text-4xl font-black leading-tight sm:text-5xl">
            Kualitas <span className="text-primary">Terbaik</span>,{" "}
            <span className="text-brand-orange">Dipercaya</span> Banyak Orang
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeIn}
          className="relative px-8"
        >
          <button
            onClick={() => carouselApi?.scrollPrev()}
            className="absolute -left-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition hover:border-primary/50 cursor-pointer"
            aria-label="Sebelumnya"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            onClick={() => carouselApi?.scrollNext()}
            className="absolute -right-2 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-sm transition hover:border-primary/50 cursor-pointer"
            aria-label="Berikutnya"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full animate-none"
          >
            <CarouselContent className="-ml-4 flex">
              {testimonials.map((t, index) => (
                <CarouselItem key={`${t.name}-${index}`} className="pl-4 basis-full sm:basis-[390px] shrink-0">
                  <div className="flex h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm select-none">
                    <div className="flex flex-1 flex-col gap-2.5 p-5">
                      <Badge className="w-fit bg-secondary text-xs text-primary" variant="secondary">{t.category}</Badge>
                      <div className="flex gap-0.5 text-brand-orange">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
                      <div className="mt-1 flex items-center gap-2.5">
                        <div className="size-9 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                          <img src={t.image} alt={t.name} className="h-full w-full object-cover object-top" />
                        </div>
                        <div>
                          <p className="text-sm font-black">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[130px] shrink-0 overflow-hidden">
                      <img src={t.image} alt={t.category} className="h-full w-full object-cover object-center" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Pagination dots */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              className={cn(
                "size-2.5 rounded-full transition-all duration-300 cursor-pointer",
                currentSlide === index ? "bg-primary w-6" : "bg-border"
              )}
              aria-label={`Ke slide ${index + 1}`}
            />
          ))}
        </div>

        {/* FAQ + Contact + Location */}
        <motion.div
          id="harga"
          variants={stagger(0, 0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-5 lg:grid-cols-3"
        >
          {/* FAQ */}
          <motion.div variants={fadeUp} className="flex flex-col h-full">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">FAQ</p>
            <h3 className="mt-1 mb-5 text-xl font-black">Pertanyaan yang Sering Diajukan</h3>
            {/* @ts-expect-error - Base UI Accordion types mismatch in pre-existing codebase */}
            <Accordion openMultiple className="divide-y divide-border rounded-xl border border-border bg-background flex-1">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="px-4">
                  <AccordionTrigger className="py-3.5 text-sm font-semibold hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Hubungi Kami */}
          <motion.div variants={fadeUp} className="h-full">
            <Card className="overflow-hidden rounded-2xl shadow-sm h-full flex flex-col">
              <div className="grid h-full grid-cols-[1fr_auto] flex-1">
                <CardHeader className="pb-4 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-lg font-black text-primary">Hubungi Kami</CardTitle>
                    <CardDescription className="text-xs">Kami siap membantu kebutuhan cetak Anda dengan cepat dan profesional.</CardDescription>
                    <div className="mt-3 space-y-3 text-sm">
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-whatsapp/15"><WhatsAppIcon className="size-3.5 text-brand-whatsapp" /></span>
                        <div><p className="font-bold leading-none">0821-1234-5678</p><p className="text-xs text-muted-foreground">Chat via WhatsApp</p></div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10"><Mail className="size-3.5 text-primary" /></span>
                        <div><p className="font-bold leading-none">cetak@cetakkita.id</p><p className="text-xs text-muted-foreground">Email kami</p></div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10"><Clock className="size-3.5 text-primary" /></span>
                        <div><p className="font-bold leading-none">Senin – Sabtu</p><p className="text-xs text-muted-foreground">08.00 – 20.00 WIB</p></div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="mt-4 h-10 w-full rounded-xl bg-brand-whatsapp text-sm text-white shadow-lg shadow-brand-whatsapp/20 hover:bg-brand-whatsapp/90 cursor-pointer"
                    render={<a href="https://wa.me/6282112345678"><WhatsAppIcon className="size-4" />Pesan via WhatsApp<ArrowRight className="size-4" /></a>}
                  />
                </CardHeader>
                <div className="w-28 overflow-hidden">
                  <img src="/contact_customer_service.png" alt="Customer Service CetakKita" className="h-full w-full object-cover object-center" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Lokasi */}
          <motion.div variants={fadeUp} className="h-full">
            <Card className="overflow-hidden rounded-2xl shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 gap-2 p-3 pb-0">
                  <div className="h-32 overflow-hidden rounded-xl">
                    <img src="/storefront.png" alt="Toko CetakKita" className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex h-32 items-center justify-center overflow-hidden rounded-xl bg-muted">
                    <div className="text-center">
                      <MapPin className="mx-auto size-8 text-primary" />
                      <p className="mt-1 text-xs font-semibold text-muted-foreground">Peta Lokasi</p>
                    </div>
                  </div>
                </div>
                <CardHeader className="pt-3">
                  <CardTitle className="text-base font-black">CetakKita – Yogyakarta</CardTitle>
                  <CardDescription className="flex items-start gap-1.5 text-xs">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Jl. Kaliurang No. 45, Caturtunggal, Depok, Sleman, Yogyakarta 55281
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="-mt-2 pb-4">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-xl border-primary/40 text-primary hover:bg-primary/5 hover:text-primary cursor-pointer"
                  render={<a href="#"><MapPin className="size-4" />Lihat di Google Maps<ArrowRight className="size-4" /></a>}
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/logo-with-text.png" alt="CetakKita" className="h-10 w-auto" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Solusi print, fotokopi, dan jilid yang cepat, rapi, berkualitas untuk kebutuhan pribadi, bisnis, hingga instansi.
            </p>
            <div className="mt-4 flex gap-2">
              {[{ label: "Instagram", icon: Instagram }, { label: "Facebook", icon: Facebook }, { label: "TikTok", icon: Music2 }, { label: "YouTube", icon: Youtube }].map(({ label, icon: Icon }) => (
                <a key={label} href="#" aria-label={label} className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-75">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-black text-foreground">Tautan Cepat</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Beranda", "Layanan", "Cara Order", "Harga", "Kontak Kami"].map((link) => (
                <li key={link}><a href="#" className="transition hover:text-primary">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-black text-foreground">Layanan Populer</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Print Dokumen", "Fotokopi", "Jilid", "Spanduk & Banner", "Kartu Nama"].map((link) => (
                <li key={link}><a href="#layanan" className="transition hover:text-primary">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-3 inline-flex items-center justify-center rounded-2xl bg-primary p-3.5 shadow-lg shadow-primary/25">
              <ShieldCheck className="size-6 text-primary-foreground" />
            </div>
            <p className="font-black text-foreground">Kualitas Terjamin</p>
            <p className="mt-1 mb-3 text-sm leading-relaxed text-muted-foreground">
              Menggunakan mesin modern dan bahan berkualitas untuk hasil terbaik.
            </p>
            <ul className="space-y-2 text-sm">
              {["Hasil Tajam & Rapi", "Bahan Berkualitas", "Pengerjaan Tepat Waktu"].map((item) => (
                <li key={item} className="flex items-center gap-2 font-semibold">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="size-3" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2024 CetakKita. Semua hak dilindungi.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
