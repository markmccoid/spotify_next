import { useSession } from "next-auth/react";

const Center = () => {
  const { data: session } = useSession();
  console.log("session center", session);
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex bg-white items-center space-x-3 rounded-full p-1 pr-2">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <div>{session?.user.name}</div>
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-50 text-white p-8`}
      >
        <h1 className="text-white">Center</h1>
      </section>
    </div>
  );
};

export default Center;
