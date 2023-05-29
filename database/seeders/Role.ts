import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Role from "App/Models/Users/Role";

export default class extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: "Admin",
        description:
          "El administrador es responsable de gestionar y supervisar todo el sistema, con acceso completo y control sobre todas las funcionalidades. Su rol incluye configurar el sistema, asignar permisos, administrar productos y sucursales, generar informes y resolver incidencias.",
      },
      {
        name: "Empleado",
        description:
          "Los empleados tienen permisos limitados y se encargan de actualizar y gestionar los productos y sucursales asignados. Pueden agregar, editar y gestionar inventarios, procesar pedidos y generar reportes específicos de su área de trabajo.",
      },
      {
        name: "Cliente",
        description:
          "Los clientes son los usuarios finales que acceden a la tienda en línea. Pueden buscar productos, realizar pedidos, gestionar perfiles, realizar pagos y recibir notificaciones sobre el estado de los pedidos. Su interacción se centra en la compra y consulta de productos.",
      },
    ]);
  }
}
