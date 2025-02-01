// src/components/dialogs/dictionary-dialog.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDictionary } from "@/components/providers/dictionary-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const dictionarySchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  description: z.string().optional(),
});

type DictionaryFormValues = z.infer<typeof dictionarySchema>;

export function NewDictionaryDialog() {
  const [open, setOpen] = React.useState(false);
  const { addDictionary } = useDictionary();
  const form = useForm<DictionaryFormValues>({
    resolver: zodResolver(dictionarySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: DictionaryFormValues) {
    addDictionary({
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      isDefault: false,
      categories: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Adicionar Dicionário">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Dicionário</DialogTitle>
          <DialogDescription>
            Crie um novo dicionário para organizar seus símbolos de comunicação.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Ex: Comunicação Básica"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex: Símbolos para comunicação do dia a dia"
              {...form.register("description")}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Criar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
