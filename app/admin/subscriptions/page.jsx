"use client";
import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);
  // const SubscriptionDate = new Date(date)

  const fetchEmail = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
    // console.log(response.data.emails);
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete("/api/email", {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchEmail();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h2 className="text-md font-medium">Subscriptions</h2>
      <div className="relative border border-gray-400 max-w-[850px] h-[80vh] mt-4 scrollbar-hide">
        <div className="w-full text-sm text-gray-700">
          <table className="w-full text-sm text-gray-700">
            <thead className="text-sm bg-gray-300 uppercase">
              <tr>
                <th scope="col" className="hidden sm:block px-6 py-3">
                  Subscriber Name
                </th>
                <th scope="col" className="px-6 py-3">
                  date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {emails.map((item, index) => {
                return (
                  <SubsTableItem
                    key={index}
                    deleteEmail={deleteEmail}
                    mongoId={item._id}
                    email={item.email}
                    date={item.date}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
