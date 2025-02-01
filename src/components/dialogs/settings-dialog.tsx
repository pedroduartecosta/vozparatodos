import * as React from "react";
import { useStore } from "@/lib/store";
import { useSpeech } from "@/hooks/useSpeech";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Moon, Sun, Monitor } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false);
  const { voices } = useSpeech();
  const { theme, setTheme } = useTheme();
  const settings = useStore((state) => state.settings);
  const updateSettings = useStore((state) => state.updateSettings);

  const themeIcon = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    system: <Monitor className="h-4 w-4" />,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Configurações</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Personalize a interface e as configurações de voz do VozParaTodos.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="interface">
          <TabsList>
            <TabsTrigger value="interface">Interface</TabsTrigger>
            <TabsTrigger value="speech">Voz</TabsTrigger>
            <TabsTrigger value="grid">Grade</TabsTrigger>
          </TabsList>

          <TabsContent value="interface" className="space-y-4">
            <div className="space-y-2">
              <Label>Tema</Label>
              <Select
                value={theme}
                onValueChange={(value: "light" | "dark" | "system") =>
                  setTheme(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      {themeIcon.light}
                      <span>Claro</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      {themeIcon.dark}
                      <span>Escuro</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      {themeIcon.system}
                      <span>Sistema</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tamanho da Fonte</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value: "small" | "medium" | "large") =>
                  updateSettings({ fontSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label>Mostrar Rótulos</Label>
              <Switch
                checked={settings.showLabels}
                onCheckedChange={(checked) =>
                  updateSettings({ showLabels: checked })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="speech" className="space-y-4">
            <div className="space-y-2">
              <Label>Voz</Label>
              <Select
                value={settings.speech.voice}
                onValueChange={(value) =>
                  updateSettings({
                    speech: { ...settings.speech, voice: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma voz" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Volume</Label>
              <Slider
                value={[settings.speech.volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) =>
                  updateSettings({
                    speech: { ...settings.speech, volume: value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Velocidade</Label>
              <Slider
                value={[settings.speech.rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={([value]) =>
                  updateSettings({
                    speech: { ...settings.speech, rate: value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Tom</Label>
              <Slider
                value={[settings.speech.pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={([value]) =>
                  updateSettings({
                    speech: { ...settings.speech, pitch: value },
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="grid" className="space-y-4">
            <div className="space-y-2">
              <Label>Tamanho dos Símbolos</Label>
              <Select
                value={settings.symbolSize}
                onValueChange={(value: "small" | "medium" | "large") =>
                  updateSettings({ symbolSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeno</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Colunas na Grade</Label>
              <Slider
                value={[settings.gridSize.columns]}
                min={2}
                max={8}
                step={1}
                onValueChange={([value]) =>
                  updateSettings({
                    gridSize: { ...settings.gridSize, columns: value },
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Linhas na Grade</Label>
              <Slider
                value={[settings.gridSize.rows]}
                min={2}
                max={8}
                step={1}
                onValueChange={([value]) =>
                  updateSettings({
                    gridSize: { ...settings.gridSize, rows: value },
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
