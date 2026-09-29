export type MenuItem = { nombre: string; descripcion: string; precio: number };
export type MenuCategory = { categoria: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    categoria: "Los combos más chingones",
    items: [
      { nombre: "Botana pa 2", descripcion: "Mix de tacos, quesadillas, burritos y totopos con guacamole, pico de gallo y picante.", precio: 135000 },
      { nombre: "Taquiza pa 2", descripcion: "Degustación de 9 tacos: birria, pollo y suadero, con salsas de la casa.", precio: 120000 },
      { nombre: "Botana pa 4", descripcion: "El doble de todo: tacos, quesadillas, burritos y totopos para compartir en grupo.", precio: 235000 },
      { nombre: "Fajitas de res", descripcion: "Tiritas de res salteadas con cebolla y locote, con tortillas y salsas.", precio: 110000 },
      { nombre: "El chingón", descripcion: "Alitas picantes o BBQ, pechuguitas empanizadas, dedos de queso y papas fritas.", precio: 130000 },
      { nombre: "Fajitas de pollo", descripcion: "Tiritas de pollo salteadas con cebolla y locote, con tortillas y salsas.", precio: 100000 },
      { nombre: "Patrón", descripcion: "Nachos Jalisco, sopes, chimichangas y pechuguitas, con guacamole, picante y pico de gallo.", precio: 165000 },
      { nombre: "Alambres", descripcion: "Tiritas de pastor con cebolla, locote y queso derretido, con tortillas de maíz.", precio: 110000 },
    ],
  },
  {
    categoria: "Pa picar",
    items: [
      { nombre: "Papas a la francesa", descripcion: "Papas tradicionales con un toque de sal.", precio: 22000 },
      { nombre: "Papas Nuevo León", descripcion: "Papas fritas con mozzarella derretido y cebollita de verdeo.", precio: 30000 },
      { nombre: "Papas Regias", descripcion: "Bañadas en cheddar, coronadas con chorizo picante, jalapeño y ají.", precio: 40000 },
      { nombre: "Papas Chihuahua", descripcion: "Bañadas en cheddar y mozzarella, con panceta y carne de res.", precio: 45000 },
      { nombre: "Papas Mar y Tierra", descripcion: "Camarones, carne y panceta: la combinación más atrevida de la casa.", precio: 65000 },
      { nombre: "Nachos con Salsas", descripcion: "Totopos de maíz nixtamalizado con salsas tradicionales mexicanas.", precio: 48000 },
      { nombre: "Nachos Chapultepec", descripcion: "Frijoles refritos y cheddar fundido, coronados con chorizo toscano y jalapeño.", precio: 70000 },
      { nombre: "Nachos Lupita", descripcion: "Bañados en cheddar, coronados con pollo grille y aceitunas frescas.", precio: 70000 },
      { nombre: "Nachos Jalisco", descripcion: "El plato estrella: totopos con tomate, guacamole, cheddar, mozzarella y carne de res.", precio: 85000 },
      { nombre: "Dedos de queso", descripcion: "Sticks de queso empanizados con panko, crema ácida y limón.", precio: 48000 },
      { nombre: "Camaroncitos fritos", descripcion: "Camarones empanizados con panko, papas fritas y crema ácida.", precio: 80000 },
      { nombre: "Alitas picantes/BBQ", descripcion: "Fritas y bañadas en la salsa de tu elección, con sour cream.", precio: 65000 },
    ],
  },
  {
    categoria: "Los famosos burritos",
    items: [
      { nombre: "Asada", descripcion: "Carne de res y un montón de queso mozzarella.", precio: 65000 },
      { nombre: "Al pastor", descripcion: "Cerdo marinado, un toque de piña y queso mozzarella.", precio: 65000 },
      { nombre: "Campechano", descripcion: "Carne de res, chorizo parrillero y queso mozzarella.", precio: 65000 },
      { nombre: "Mini burritos", descripcion: "Uno de carne y uno de pollo, ideal para probar los dos.", precio: 55000 },
      { nombre: "Sinaloense", descripcion: "Pollo grille con panceta y queso mozzarella.", precio: 65000 },
      { nombre: "Chimichangas", descripcion: "Dos mini burritos fritos, de carne y pollo.", precio: 55000 },
    ],
  },
  {
    categoria: "Tacos (incluye 4 tacos y 2 salsas)",
    items: [
      { nombre: "Asada", descripcion: "4 tacos de carne de res con 2 salsas de la casa.", precio: 65000 },
      { nombre: "Pollo", descripcion: "4 tacos de pollo con un toque de panceta.", precio: 65000 },
      { nombre: "Camarón", descripcion: "Tortillas con costra de queso, camarones jugosos y locote.", precio: 65000 },
      { nombre: "Campechano", descripcion: "Carne de res y chorizo parrillero en tortilla de maíz.", precio: 65000 },
      { nombre: "Suadero", descripcion: "Los tacos callejeros originales, con carne desmechada.", precio: 65000 },
      { nombre: "Al pastor", descripcion: "Cerdo marinado 24 horas con un toque de piña.", precio: 65000 },
      { nombre: "Tacos de birria", descripcion: "Recién llegaditos de México, para los que ya los probaron y quieren más.", precio: 85000 },
    ],
  },
  {
    categoria: "Quesadillas",
    items: [
      { nombre: "Quesabirrias", descripcion: "Costilla y res desmechada con mucho queso; se sirven con consomé para remojar.", precio: 65000 },
      { nombre: "Chilanga", descripcion: "Carne de res en cubitos y una generosa cantidad de queso.", precio: 65000 },
      { nombre: "Campechana", descripcion: "Carne de res, chorizo parrillero y mucho queso.", precio: 65000 },
      { nombre: "Tijuana", descripcion: "Pollo, un toque de panceta, queso cheddar y mozzarella.", precio: 65000 },
      { nombre: "Tapatía", descripcion: "Carne al pastor y un montón de queso.", precio: 65000 },
      { nombre: "Veracruzana", descripcion: "Tomate en rodajas, locote y el infaltable queso.", precio: 55000 },
      { nombre: "Solita con queso", descripcion: "Rellena de mucho, pero mucho queso.", precio: 50000 },
    ],
  },
  {
    categoria: "Pa beber - Los chingones",
    items: [
      { nombre: "Cantaritos", descripcion: "El clásico trago mexicano, refrescante y con onda.", precio: 30000 },
      { nombre: "Margarita", descripcion: "La clásica margarita, tequila con un toque cítrico.", precio: 30000 },
      { nombre: "Margarita frozen", descripcion: "Versión frozen de la margarita, bien helada.", precio: 45000 },
      { nombre: "Margarita corona", descripcion: "Margarita con una Coronita invertida arriba.", precio: 45000 },
      { nombre: "Michelada", descripcion: "Cerveza preparada con limón, salsas y especias.", precio: 30000 },
      { nombre: "Tequila sunrise", descripcion: "Tequila con jugo de naranja y un toque de granadina.", precio: 30000 },
      { nombre: "Shot de tequila", descripcion: "El infaltable shot para arrancar la noche.", precio: 20000 },
    ],
  },
  {
    categoria: "Frozen",
    items: [
      { nombre: "Daiquiri fresa", descripcion: "Frozen de fresa, dulce y refrescante.", precio: 30000 },
      { nombre: "Daiquiri durazno", descripcion: "Frozen de durazno, ideal para el calor.", precio: 30000 },
      { nombre: "Piña colada", descripcion: "El clásico tropical de piña y coco.", precio: 30000 },
    ],
  },
  {
    categoria: "Caipis",
    items: [
      { nombre: "Caipi", descripcion: "La clásica caipirinha con limón.", precio: 20000 },
      { nombre: "Caipi fresa", descripcion: "Caipirinha con un toque de fresa.", precio: 20000 },
      { nombre: "Caipiroska", descripcion: "Versión con vodka de la caipirinha.", precio: 20000 },
      { nombre: "Caipiruva", descripcion: "Versión con vino de la caipirinha.", precio: 20000 },
    ],
  },
  {
    categoria: "Jarras",
    items: [
      { nombre: "Jugos", descripcion: "Jugo natural para acompañar, en jarra para compartir.", precio: 35000 },
      { nombre: "Caipiriña", descripcion: "Jarra de caipiriña para compartir en grupo.", precio: 60000 },
      { nombre: "Sangría", descripcion: "Jarra de sangría, fresca y frutal, para compartir.", precio: 60000 },
    ],
  },
  {
    categoria: "Chelas",
    items: [
      { nombre: "Corona 710", descripcion: "Botella grande de Corona, para compartir.", precio: 25000 },
      { nombre: "Coronita", descripcion: "La clásica Coronita bien fría.", precio: 12000 },
      { nombre: "Chop Munich", descripcion: "Chop de cerveza tirada, bien fría.", precio: 12000 },
    ],
  },
  {
    categoria: "Infaltable",
    items: [
      { nombre: "Fernet", descripcion: "El infaltable Fernet, solo o con cola.", precio: 20000 },
      { nombre: "Mojito", descripcion: "El clásico mojito, con menta y limón.", precio: 20000 },
      { nombre: "Gin Tonic", descripcion: "Gin con tónica, un clásico infaltable.", precio: 30000 },
      { nombre: "Sex on the Beach", descripcion: "Trago frutal y refrescante para cualquier noche.", precio: 25000 },
      { nombre: "Refrescos", descripcion: "Productos Coca-Cola bien helados.", precio: 12000 },
      { nombre: "Agua sin gas", descripcion: "Agua sin gas, para acompañar cualquier plato.", precio: 10000 },
    ],
  },
];
