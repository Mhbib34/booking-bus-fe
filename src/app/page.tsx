import axios from "axios";
import { cookies } from "next/headers";
import ClientHome from "./(main)/components/layout/ClientHome";

async function getRoutes() {
  try {
    // ambil cookies user
    const cookieStore = await cookies();

    const cookieString = Array.from(cookieStore.getAll())
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/routes`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const routes = await getRoutes();

  return (
    <div>
      <ClientHome routes={routes} />
    </div>
  );
}
