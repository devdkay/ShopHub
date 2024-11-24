import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import UserProfile from "./UserProfile";
import UserOrders from "./UserOrders";
import SettingUser from "./SettingUser";
import { dashboardUserState, dashboardUserReducer } from "./DashboardUserContext";

export const DashboardUserContext = createContext();

const UserComponent = () => {
  return (
    <Fragment>
      <UserProfile />
      <section className="m-4 md:mx-8 md:my-6">
        <UserOrders />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <SettingUser />
      </section>
    </Fragment>
  );
};

const UserHome = (props) => {
  const [data, dispatch] = useReducer(dashboardUserReducer, dashboardUserState);
  return (
    <Fragment>
      <DashboardUserContext.Provider value={{ data, dispatch }}>
        <Layout children={<UserComponent />} />
      </DashboardUserContext.Provider>
    </Fragment>
  );
};

export default UserHome;

export { UserProfile, UserOrders, SettingUser };
