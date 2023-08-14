import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";

export default class ImagesController {
  public async upload({ request, response }: HttpContextContract) {
    const image = request.file("image");

    if (!image) {
      return response.badRequest("File not provided");
    }

    const imageName = `${new Date().getTime()}.${image.extname}`;

    await image.move(Application.tmpPath("uploads"), {
      name: imageName,
    });

    return {
      status: "success",
      data: {
        url: `/uploads/${imageName}`,
      },
    };
  }
}
