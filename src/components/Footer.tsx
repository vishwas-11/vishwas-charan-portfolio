export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background py-10 text-center text-sm text-muted-foreground">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
        <p>© {new Date().getFullYear()} John. All rights reserved.</p>
        <p className="mt-2">hi@john.me</p>
      </div>
    </footer>
  );
}
