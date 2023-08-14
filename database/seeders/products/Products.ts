import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Product from "App/Models/Products/Product";

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        name: "Smart TV 4K",
        description: "Televisor LED de 55 pulgadas con resolución 4K y funciones inteligentes.",
        price: 899.99,
        product_category_id: 1, 
        url_img: "http://127.0.0.1:3333/uploads/pantalla.png"
      },
      {
        name: "Cámara de Seguridad WiFi",
        description: "Cámara de vigilancia inalámbrica con visión nocturna y detección de movimiento.",
        price: 129.99,
        product_category_id: 2,
        url_img: "http://127.0.0.1:3333/uploads/camara.png"
      },
      {
        name: "Bombilla Inteligente",
        description: "Bombilla LED controlable desde tu smartphone, compatible con asistentes de voz.",
        price: 19.99,
        product_category_id: 3,
        url_img: "http://127.0.0.1:3333/uploads/alexa2.png"
      },
      {
        name: "Sistema de Alarma Residencial",
        description: "Kit de alarma con sensores de puertas y ventanas, sirena y control remoto.",
        price: 249.99,
        product_category_id: 2,
        url_img: "http://127.0.0.1:3333/uploads/alexa.png"
      },
      {
        name: "Asistente de Voz Inteligente",
        description: "Asistente virtual con reconocimiento de voz y capacidad para controlar dispositivos.",
        price: 79.99,
        product_category_id: 3,
        url_img: "http://127.0.0.1:3333/uploads/repetidor1.png"
      }
    
    ]);
  }
}

