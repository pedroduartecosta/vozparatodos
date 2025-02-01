// src/constants/defaultCollections.ts
import { Collection } from "@/types/symbols";

export const defaultCollections: Collection[] = [
  {
    id: "basic-communication",
    name: "Comunicação Básica",
    description: "Símbolos básicos para comunicação diária",
    type: "dictionary",
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [
      {
        id: "basic-needs",
        name: "Necessidades Básicas",
        description: "Expressões de necessidades básicas",
        symbols: [
          {
            id: "fome",
            text: "Tenho fome",
            description: "Expressar fome ou vontade de comer",
            tags: ["necessidade", "alimentação"],
            type: "icon",
            icon: "Utensils",
          },
          {
            id: "sede",
            text: "Tenho sede",
            description: "Expressar sede ou vontade de beber",
            tags: ["necessidade", "bebida"],
            type: "icon",
            icon: "Coffee",
          },
          {
            id: "banheiro",
            text: "Preciso de ir à casa de banho",
            description: "Expressar necessidade de ir à casa de banho",
            tags: ["necessidade", "higiene"],
            type: "icon",
            icon: "Bath",
          },
          {
            id: "sono",
            text: "Tenho sono",
            description: "Expressar sono ou cansaço",
            tags: ["necessidade", "descanso"],
            type: "icon",
            icon: "Moon",
          },
          {
            id: "dor",
            text: "Tenho dores",
            description: "Expressar dor ou desconforto",
            tags: ["necessidade", "saúde"],
            type: "icon",
            icon: "HeartPulse",
          },
          {
            id: "ajuda",
            text: "Preciso de ajuda",
            description: "Solicitar ajuda ou assistência",
            tags: ["necessidade", "assistência"],
            type: "icon",
            icon: "HelpCircle",
          },
        ],
      },
      {
        id: "responses",
        name: "Respostas",
        description: "Respostas simples para comunicação",
        symbols: [
          {
            id: "sim",
            text: "Sim",
            description: "Resposta afirmativa",
            tags: ["resposta", "afirmação"],
            type: "icon",
            icon: "Check",
          },
          {
            id: "nao",
            text: "Não",
            description: "Resposta negativa",
            tags: ["resposta", "negação"],
            type: "icon",
            icon: "X",
          },
        ],
      },
      {
        id: "emotions",
        name: "Emoções",
        description: "Expressões de emoções e sentimentos",
        symbols: [
          {
            id: "feliz",
            text: "Estou feliz",
            description: "Expressar felicidade",
            tags: ["emoção", "positivo"],
            type: "icon",
            icon: "Smile",
          },
          {
            id: "triste",
            text: "Estou triste",
            description: "Expressar tristeza",
            tags: ["emoção", "negativo"],
            type: "icon",
            icon: "Frown",
          },
          {
            id: "medo",
            text: "Tenho medo",
            description: "Expressar medo",
            tags: ["emoção", "negativo"],
            type: "icon",
            icon: "AlertCircle",
          },
          {
            id: "raiva",
            text: "Estou zangado",
            description: "Expressar zanga",
            tags: ["emoção", "negativo"],
            type: "icon",
            icon: "Angry",
          },
        ],
      },
    ],
  },
  {
    id: "food-collection",
    name: "Alimentos",
    description: "Símbolos relacionados com comidas e bebidas",
    type: "dictionary",
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    categories: [
      {
        id: "main-dishes",
        name: "Pratos Principais",
        description: "Pratos principais e refeições completas",
        symbols: [
          {
            id: "rice",
            text: "Arroz",
            description: "Quero arroz",
            tags: ["comida", "arroz"],
            type: "image",
            imageUrl: "/symbols/food/rice.png",
          },
          {
            id: "pasta",
            text: "Massa",
            description: "Quero massa",
            tags: ["comida", "massa"],
            type: "image",
            imageUrl: "/symbols/food/pasta.png",
          },
          {
            id: "meat",
            text: "Carne",
            description: "Quero carne",
            tags: ["comida", "carne"],
            type: "image",
            imageUrl: "/symbols/food/meat.png",
          },
          {
            id: "fish",
            text: "Peixe",
            description: "Quero peixe",
            tags: ["comida", "peixe"],
            type: "image",
            imageUrl: "/symbols/food/fish.png",
          },
          {
            id: "soup",
            text: "Sopa",
            description: "Quero sopa",
            tags: ["comida", "sopa"],
            type: "image",
            imageUrl: "/symbols/food/soup.png",
          },
          {
            id: "salad",
            text: "Salada",
            description: "Quero salada",
            tags: ["comida", "salada"],
            type: "image",
            imageUrl: "/symbols/food/salad.png",
          },
          {
            id: "pizza",
            text: "Pizza",
            description: "Quero pizza",
            tags: ["comida", "pizza"],
            type: "image",
            imageUrl: "/symbols/food/pizza.png",
          },
          {
            id: "chicken",
            text: "Frango",
            description: "Quero frango",
            tags: ["comida", "frango"],
            type: "image",
            imageUrl: "/symbols/food/chicken.png",
          },
        ],
      },
      {
        id: "fruits",
        name: "Frutas",
        description: "Diferentes tipos de frutas",
        symbols: [
          {
            id: "apple",
            text: "Maçã",
            description: "Quero maçã",
            tags: ["fruta", "maçã"],
            type: "image",
            imageUrl: "/symbols/food/apple.png",
          },
          {
            id: "banana",
            text: "Banana",
            description: "Quero banana",
            tags: ["fruta", "banana"],
            type: "image",
            imageUrl: "/symbols/food/banana.png",
          },
          {
            id: "orange",
            text: "Laranja",
            description: "Quero laranja",
            tags: ["fruta", "laranja"],
            type: "image",
            imageUrl: "/symbols/food/orange.png",
          },
          {
            id: "grape",
            text: "Uva",
            description: "Quero uva",
            tags: ["fruta", "uva"],
            type: "image",
            imageUrl: "/symbols/food/grape.png",
          },
          {
            id: "strawberry",
            text: "Morango",
            description: "Quero morango",
            tags: ["fruta", "morango"],
            type: "image",
            imageUrl: "/symbols/food/strawberry.png",
          },
          {
            id: "pear",
            text: "Pêra",
            description: "Quero pêra",
            tags: ["fruta", "pêra"],
            type: "image",
            imageUrl: "/symbols/food/pear.png",
          },
          {
            id: "pineapple",
            text: "Ananás",
            description: "Quero ananás",
            tags: ["fruta", "ananás"],
            type: "image",
            imageUrl: "/symbols/food/pineapple.png",
          },
          {
            id: "watermelon",
            text: "Melancia",
            description: "Quero melancia",
            tags: ["fruta", "melancia"],
            type: "image",
            imageUrl: "/symbols/food/watermelon.png",
          },
        ],
      },
      {
        id: "vegetables",
        name: "Vegetais",
        description: "Diferentes tipos de vegetais",
        symbols: [
          {
            id: "carrot",
            text: "Cenoura",
            description: "Quero cenoura",
            tags: ["vegetal", "cenoura"],
            type: "image",
            imageUrl: "/symbols/food/carrot.png",
          },
          {
            id: "tomato",
            text: "Tomate",
            description: "Quero tomate",
            tags: ["vegetal", "tomate"],
            type: "image",
            imageUrl: "/symbols/food/tomato.png",
          },
          {
            id: "potato",
            text: "Batata",
            description: "Quero batata",
            tags: ["vegetal", "batata"],
            type: "image",
            imageUrl: "/symbols/food/potato.png",
          },
          {
            id: "lettuce",
            text: "Alface",
            description: "Quero alface",
            tags: ["vegetal", "alface"],
            type: "image",
            imageUrl: "/symbols/food/lettuce.png",
          },
          {
            id: "broccoli",
            text: "Brócolis",
            description: "Quero brócolis",
            tags: ["vegetal", "brócolis"],
            type: "image",
            imageUrl: "/symbols/food/broccoli.png",
          },
          {
            id: "cucumber",
            text: "Pepino",
            description: "Quero pepino",
            tags: ["vegetal", "pepino"],
            type: "image",
            imageUrl: "/symbols/food/cucumber.png",
          },
        ],
      },
      {
        id: "drinks",
        name: "Bebidas",
        description: "Diferentes tipos de bebidas",
        symbols: [
          {
            id: "water",
            text: "Água",
            description: "Quero água",
            tags: ["bebida", "água"],
            type: "image",
            imageUrl: "/symbols/food/water.png",
          },
          {
            id: "juice",
            text: "Sumo",
            description: "Quero sumo",
            tags: ["bebida", "sumo"],
            type: "image",
            imageUrl: "/symbols/food/juice.png",
          },
          {
            id: "milk",
            text: "Leite",
            description: "Quero leite",
            tags: ["bebida", "leite"],
            type: "image",
            imageUrl: "/symbols/food/milk.png",
          },
          {
            id: "coffee",
            text: "Café",
            description: "Quero café",
            tags: ["bebida", "café"],
            type: "image",
            imageUrl: "/symbols/food/coffee.png",
          },
          {
            id: "tea",
            text: "Chá",
            description: "Quero chá",
            tags: ["bebida", "chá"],
            type: "image",
            imageUrl: "/symbols/food/tea.png",
          },
          {
            id: "soda",
            text: "Refrigerante",
            description: "Quero refrigerante",
            tags: ["bebida", "refrigerante"],
            type: "image",
            imageUrl: "/symbols/food/soda.png",
          },
        ],
      },
      {
        id: "snacks",
        name: "Lanches",
        description: "Lanches e pequenas refeições",
        symbols: [
          {
            id: "sandwich",
            text: "Sandes",
            description: "Quero uma sandes",
            tags: ["lanche", "sandes"],
            type: "image",
            imageUrl: "/symbols/food/sandwich.png",
          },
          {
            id: "cookie",
            text: "Bolacha",
            description: "Quero uma bolacha",
            tags: ["lanche", "bolacha"],
            type: "image",
            imageUrl: "/symbols/food/cookie.png",
          },
          {
            id: "yogurt",
            text: "Iogurte",
            description: "Quero um iogurte",
            tags: ["lanche", "iogurte"],
            type: "image",
            imageUrl: "/symbols/food/yogurt.png",
          },
          {
            id: "chips",
            text: "Batatas Fritas",
            description: "Quero batatas fritas",
            tags: ["lanche", "batatas fritas"],
            type: "image",
            imageUrl: "/symbols/food/chips.png",
          },
          {
            id: "chocolate",
            text: "Chocolate",
            description: "Quero chocolate",
            tags: ["lanche", "chocolate"],
            type: "image",
            imageUrl: "/symbols/food/chocolate.png",
          },
          {
            id: "ice-cream",
            text: "Gelado",
            description: "Quero gelado",
            tags: ["lanche", "gelado"],
            type: "image",
            imageUrl: "/symbols/food/ice-cream.png",
          },
        ],
      },
      {
        id: "breakfast",
        name: "Pequeno-Almoço",
        description: "Alimentos para o pequeno-almoço",
        symbols: [
          {
            id: "bread",
            text: "Pão",
            description: "Quero pão",
            tags: ["pequeno-almoço", "pão"],
            type: "image",
            imageUrl: "/symbols/food/bread.png",
          },
          {
            id: "eggs",
            text: "Ovos",
            description: "Quero ovos",
            tags: ["pequeno-almoço", "ovos"],
            type: "image",
            imageUrl: "/symbols/food/eggs.png",
          },
          {
            id: "cereal",
            text: "Cereais",
            description: "Quero cereais",
            tags: ["pequeno-almoço", "cereais"],
            type: "image",
            imageUrl: "/symbols/food/cereal.png",
          },
          {
            id: "pancake",
            text: "Panquecas",
            description: "Quero panquecas",
            tags: ["pequeno-almoço", "panquecas"],
            type: "image",
            imageUrl: "/symbols/food/pancake.png",
          },
          {
            id: "toast",
            text: "Torrada",
            description: "Quero torrada",
            tags: ["pequeno-almoço", "torrada"],
            type: "image",
            imageUrl: "/symbols/food/toast.png",
          },
        ],
      },
    ],
  },
];
