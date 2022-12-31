import { useRouter } from "next/router";
import Detail from "../../Components/Detail";

export default function DetailPage() {
  const router = useRouter();

  return <Detail id={router.query.id} />;
}
