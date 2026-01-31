import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-6xl">⛳</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl mb-4 text-foreground">Lost Ball</h1>
        <p className="text-lg text-muted-foreground font-body mb-2">
          (Page Not Found)
        </p>
        <p className="text-muted-foreground font-body mb-8">
          This page has gone where all our drives go — somewhere we can't find it.
          <br />
          <span className="text-sm italic">Don't worry, happens to the best of us.</span>
        </p>
        <Button variant="walnut" size="lg" asChild className="touch-target-lg">
          <a href="/">
            <Home className="w-4 h-4 mr-2" />
            Back to the Clubhouse
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
