import React from "react";
import { UseOrder, UserData } from "resources/resources";
import CardStats from "../Layout/Card/CardStats";

const DashboardSection = () => {
  const ordersData = UseOrder();
  const userData = UserData();

  const alluserData = React.useMemo(() => userData?.data, [userData?.data]);

  const allOrdersData = React.useMemo(
    () => ordersData?.data,
    [ordersData?.data]
  );

  console.log("allOrdersData", allOrdersData);

  const totalAmount =
    allOrdersData &&
    allOrdersData.orders.reduce((acc: any, order) => {
      return acc + order.totalAmount;
    }, 0);

  const totalItems =
    allOrdersData &&
    allOrdersData.orders.reduce((acc, order) => {
      return (
        acc +
        order.items.reduce((itemAcc, item) => {
          return itemAcc + item.quantity;
        }, 0)
      );
    }, 0);

  const totalUser = alluserData && alluserData.length;

  return (
    <section className="py-12 ">
      <div className="">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="No of Orders"
                  statTitle={totalItems}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescription="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Amount of Money"
                  statTitle={totalAmount}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescription="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              {totalUser && (
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="NEW USERS"
                    statTitle={totalUser && totalUser}
                    statArrow="down"
                    statPercent="3.48"
                    statPercentColor="text-red-500"
                    statDescription="Since last week"
                    statIconName="fas fa-chart-pie"
                    statIconColor="bg-orange-500"
                  />
                </div>
              )}

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescription="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DashboardSection;
