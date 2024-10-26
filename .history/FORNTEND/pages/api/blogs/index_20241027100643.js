import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  //if authenticated, connect to mongodb
  await mongooseConnect();
}
