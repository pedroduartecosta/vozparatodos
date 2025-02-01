"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronRight, Menu, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsDialog } from "@/components/dialogs/settings-dialog";
import { useCollection } from "@/components/providers/collection-provider";
import { useSpeech } from "@/hooks/useSpeech";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [customText, setCustomText] = React.useState("");
  const { currentMessage, clearMessage } = useCollection();
  const { speak, speaking, stop } = useSpeech();

  const handleSpeak = () => {
    if (speaking) {
      stop();
    } else {
      speak(customText || currentMessage.join(" "));
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Handle resize events
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">VozParaTodos</h1>
          </div>
          <SettingsDialog />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={toggleMobileSidebar}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-background border-r",
            "transform transition-transform duration-300",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleMobileSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              defaultSize={25}
              minSize={isCollapsed ? 5 : 15}
              maxSize={40}
              className={cn(
                "transition-all duration-300 relative",
                isCollapsed ? "min-w-[50px] max-w-[50px]" : "min-w-[250px]"
              )}
            >
              <div className="h-full flex">
                <div
                  className={cn(
                    "flex-1 transition-all duration-300",
                    isCollapsed && "opacity-0 invisible"
                  )}
                >
                  <Sidebar />
                </div>

                {/* Larger collapse handle */}
                <div
                  className="h-full flex items-center"
                  role="button"
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  <div
                    onClick={toggleSidebar}
                    className={cn(
                      "w-8 h-32 flex items-center justify-center rounded-l-xl cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground",
                      "border-l border-y transition-colors",
                      "absolute right-0 top-1/2 -translate-y-1/2",
                      "shadow-sm hover:shadow-md"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-6 w-6 transition-transform duration-200",
                        !isCollapsed && "rotate-180"
                      )}
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle className="w-px bg-border" />

            <ResizablePanel defaultSize={75} className="z-0">
              <div className="h-full p-4">{children}</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile/Tablet Main Content */}
        <div className="flex-1 lg:hidden">
          <div className="h-full p-4">{children}</div>
        </div>
      </div>

      <footer className="border-t bg-muted/10">
        <div className="container flex h-16 items-center px-4">
          <div className="w-full flex items-center gap-2">
            <Input
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Digite um texto para falar..."
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => {
                clearMessage();
                setCustomText("");
              }}
              disabled={currentMessage.length === 0 && !customText}
              className="hidden sm:inline-flex"
            >
              Limpar
            </Button>
            <Button
              onClick={handleSpeak}
              disabled={currentMessage.length === 0 && !customText}
            >
              {speaking ? "Parar" : "Falar"}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
