import React from "react";
import {
  UseBrand,
  UseCategoryWithParentID,
  UseOrder,
  UseProduct,
  UseSize,
  UserData,
} from "resources/resources";
import CardStats from "../Layout/Card/CardStats";
import { Alert, Spinner } from "../Layout/Atom/atom";

const DashboardSection = () => {
  const ordersData = UseOrder();
  const userData = UserData();
  const totalBrand = UseBrand();
  const totalSizes = UseSize();
  const totalproduct = UseProduct();
  const totalCategory = UseCategoryWithParentID();

  const alluserData = React.useMemo(() => userData?.data, [userData?.data]);

  const allOrdersData = React.useMemo(
    () => ordersData?.data,
    [ordersData?.data]
  );

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

  const totalUser = alluserData && alluserData?.length;
  const totalBrandData = totalBrand && totalBrand?.data?.brands?.length;

  const totalSizeData = totalSizes && totalSizes?.data?.sizes?.length;

  const totalproductData = totalproduct && totalproduct?.data?.products?.length;

  const totalCategoryData =
    totalCategory && totalCategory?.data?.categories?.length;

  let windowContent = <></>;

  if (
    ordersData.isLoading ||
    totalBrand.isLoading ||
    totalSizes.isLoading ||
    totalproduct.isLoading ||
    totalCategory.isLoading
  ) {
    windowContent = (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-40 z-[100]">
        <Spinner size={20} color="text-light-200" />
      </div>
    );
  }

  if (allOrdersData && allOrdersData.orders.length === 0) {
    windowContent = (
      <div className="container">
        <div className=" w-full justify-center text-center py-20 px-20">
          <Alert type="error" message="No Orders" />
        </div>
      </div>
    );
  }

  if (
    ordersData.isSuccess &&
    totalBrand.isSuccess &&
    totalSizes.isSuccess &&
    totalproduct.isSuccess &&
    totalCategory.isSuccess
  ) {
    windowContent = (
      <section className="py-12 bg-white ">
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
                    statSubtitle="Total Amount "
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
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="No of Brands"
                    statTitle={totalBrandData}
                    statArrow="up"
                    statPercent="3.48"
                    statPercentColor="text-emerald-500"
                    statDescription="Since last month"
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-indigo-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="No of Sizes"
                    statTitle={totalSizeData}
                    statArrow="down"
                    statPercent="1.10"
                    statPercentColor="text-orange-500"
                    statDescription="Since yesterday"
                    statIconName="fas fa-users"
                    statIconColor="bg-yellow-500"
                  />
                </div>
                {totalUser && (
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle="No of Products"
                      statTitle={totalproductData}
                      statArrow="down"
                      statPercent="3.48"
                      statPercentColor="text-red-500"
                      statDescription="Since last week"
                      statIconName="fas fa-chart-pie"
                      statIconColor="bg-green-500"
                    />
                  </div>
                )}

                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="No of Category"
                    statTitle={totalCategoryData}
                    statArrow="up"
                    statPercent="12"
                    statPercentColor="text-green-500"
                    statDescription="Since last month"
                    statIconName="fas fa-percent"
                    statIconColor="bg-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return windowContent;
};
export default DashboardSection;
