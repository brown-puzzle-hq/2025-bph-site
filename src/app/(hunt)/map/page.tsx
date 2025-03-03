import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  // const Map = dynamic(() => import("./Map"), { ssr: false })

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <div>
      <Map />
    </div>
  );
}

// export default async function Home() {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return <div>Login to see the map.</div>;
//   }

//   return (
//     <div className="mx-auto mb-10">
//       <Map />
//     </div>
//   );
// }
