import AuthHome from "@/components/organisms/pages/AuthHome";
import UserHome from "@/components/organisms/pages/UserHome";

const MOCK_LOGGED = true; // sto MANUALMENTE variando tra route di un user loggato o non loggato
// true = loggato, false = NON loggato

export default function Home() {
  const isLogged = MOCK_LOGGED;

  return (
    <>
      {isLogged ? <UserHome /> : <AuthHome />}
    </>
  );
}