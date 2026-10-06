export const metadata = {
  title: 'Skycrest Admin Panel',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#121214] text-[#F9FAFB] font-sans antialiased selection:bg-[#F59E0B] selection:text-[#141414]">
      {children}
    </div>
  );
}
