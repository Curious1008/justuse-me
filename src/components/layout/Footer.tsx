export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-xs text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} JustUse.me — Your files never leave
          your device.
        </p>
      </div>
    </footer>
  );
}
