export type MenuItem = { nombre: string; precio: number };
export type MenuCategory = { categoria: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    categoria: "Los combos más chingones",
    items: [
      { nombre: "Botana pa 2", precio: 135000 },
      { nombre: "Taquiza pa 2", precio: 120000 },
      { nombre: "Botana pa 4", precio: 235000 },
      { nombre: "Fajitas de res", precio: 110000 },
      { nombre: "El chingón", precio: 130000 },
      { nombre: "Fajitas de pollo", precio: 100000 },
      { nombre: "Patrón", precio: 165000 },
      { nombre: "Alambres", precio: 110000 },
    ],
  },
  {
    categoria: "Pa picar",
    items: [
      { nombre: "Papas a la francesa", precio: 22000 },
      { nombre: "Papas Nuevo León", precio: 30000 },
      { nombre: "Papas Regias", precio: 40000 },
      { nombre: "Papas Chihuahua", precio: 45000 },
      { nombre: "Papas Mar y Tierra", precio: 65000 },
      { nombre: "Nachos con Salsas", precio: 48000 },
      { nombre: "Nachos Chapultepec", precio: 70000 },
      { nombre: "Nachos Lupita", precio: 70000 },
      { nombre: "Nachos Jalisco", precio: 85000 },
      { nombre: "Dedos de queso", precio: 48000 },
      { nombre: "Camaroncitos fritos", precio: 80000 },
      { nombre: "Alitas picantes/BBQ", precio: 65000 },
    ],
  },
  {
    categoria: "Los famosos burritos",
    items: [
      { nombre: "Asada", precio: 65000 },
      { nombre: "Al pastor", precio: 65000 },
      { nombre: "Campechano", precio: 65000 },
      { nombre: "Mini burritos", precio: 55000 },
      { nombre: "Sinaloense", precio: 65000 },
      { nombre: "Chimichangas", precio: 55000 },
    ],
  },
  {
    categoria: "Tacos (incluye 4 tacos y 2 salsas)",
    items: [
      { nombre: "Asada", precio: 65000 },
      { nombre: "Pollo", precio: 65000 },
      { nombre: "Camarón", precio: 65000 },
      { nombre: "Campechano", precio: 65000 },
      { nombre: "Suadero", precio: 65000 },
      { nombre: "Al pastor", precio: 65000 },
      { nombre: "Tacos de birria", precio: 65000 },
    ],
  },
  {
    categoria: "Quesadillas",
    items: [
      { nombre: "Quesabirrias", precio: 65000 },
      { nombre: "Chilanga", precio: 65000 },
      { nombre: "Campechana", precio: 65000 },
      { nombre: "Tijuana", precio: 65000 },
      { nombre: "Tapatía", precio: 65000 },
      { nombre: "Veracruzana", precio: 55000 },
      { nombre: "Solita con queso", precio: 50000 },
    ],
  },
  {
    categoria: "Pa beber - Los chingones",
    items: [
      { nombre: "Cantaritos", precio: 30000 },
      { nombre: "Margarita", precio: 30000 },
      { nombre: "Margarita frozen", precio: 45000 },
      { nombre: "Margarita corona", precio: 45000 },
      { nombre: "Michelada", precio: 30000 },
      { nombre: "Tequila sunrise", precio: 30000 },
      { nombre: "Shot de tequila", precio: 20000 },
    ],
  },
  {
    categoria: "Frozen",
    items: [
      { nombre: "Daiquiri fresa", precio: 30000 },
      { nombre: "Daiquiri durazno", precio: 30000 },
      { nombre: "Piña colada", precio: 30000 },
    ],
  },
  {
    categoria: "Caipis",
    items: [
      { nombre: "Caipi", precio: 20000 },
      { nombre: "Caipi fresa", precio: 20000 },
      { nombre: "Caipiroska", precio: 20000 },
      { nombre: "Caipiruva", precio: 20000 },
    ],
  },
  {
    categoria: "Jarras",
    items: [
      { nombre: "Jugos", precio: 35000 },
      { nombre: "Caipiriña", precio: 60000 },
      { nombre: "Sangría", precio: 60000 },
    ],
  },
  {
    categoria: "Chelas",
    items: [
      { nombre: "Corona 710", precio: 25000 },
      { nombre: "Coronita", precio: 12000 },
      { nombre: "Chop Munich", precio: 12000 },
    ],
  },
  {
    categoria: "Infaltable",
    items: [
      { nombre: "Fernet", precio: 20000 },
      { nombre: "Mojito", precio: 20000 },
      { nombre: "Gin Tonic", precio: 30000 },
      { nombre: "Sex on the Beach", precio: 25000 },
      { nombre: "Refrescos", precio: 12000 },
      { nombre: "Agua sin gas", precio: 10000 },
    ],
  },
];
