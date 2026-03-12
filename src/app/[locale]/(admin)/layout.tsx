import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

export default function AdminGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-inter">
      {children}
    </div>
  );
}
