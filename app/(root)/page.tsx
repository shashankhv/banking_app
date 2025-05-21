import React from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import RightSidebar from "../../components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
const Home = async () => {
  const user = await getLoggedInUser();
  const loggedIn = {
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split("  ")[1],
    email: user?.email,
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="Manage all you accounts in one place"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={50000}
          />
        </header>

        {/* todo transactions */}
      </div>

      <RightSidebar user={loggedIn} transactions={[]} banks={[{}, {}]} />
    </section>
  );
};

export default Home;
