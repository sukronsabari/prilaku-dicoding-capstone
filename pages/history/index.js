import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "../../src/config/firebase";
import CalendarComponent from "../../src/components/CalendarComponent";
import CardRate from "../../src/components/CardRate";
import HabbitCard from "../../src/components/HabbitCard";
import Header from "../../src/components/Header";
import Heading from "../../src/components/Heading";
import Layout from "../../src/components/Layout";
import { formatDate } from "../../src/utils/functions";
import DetailHabbit from "../../src/components/DetailHabbit";
import { deleteHabbit } from "../../src/utils/firebaseFunc";

const History = () => {
  const [isShowDetailUpdate, setIsShowDetailUpdate] = useState(false);
  const [habbits, setHabbits] = useState([]);
  const [dataDetailHabbit, setDataDetailHabbit] = useState();

  const getHabbitDataFromFirestore = async () => {
    try {
      const q = query(
        collection(db, "habbits"),
        where("isDone", "==", true),
        where("uid", "==", "wardy")
      );
      onSnapshot(q, (querySnapshot) => {
        setHabbits(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHabbitDataFromFirestore();
  }, []);

  return (
    <Layout>
      {isShowDetailUpdate && (
        <DetailHabbit
          setValue={setIsShowDetailUpdate}
          dataDetailHabbit={dataDetailHabbit}
        />
      )}
      <div className="row my-4">
        <div className="col-7 ms-auto">
          <Header
            title={formatDate(new Date())}
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/1200px-Joko_Widodo_2019_official_portrait.jpg"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <Heading title="Habbit Finished" />
          {habbits?.map((habbit) => {
            return (
              <div className="mt-3 position-relative" key={habbit.id}>
                <HabbitCard
                  title={habbit.data.name}
                  iconName={habbit.data.icon}
                  color={habbit.data.color}
                  setValue={setIsShowDetailUpdate}
                  setDataDetail={setDataDetailHabbit}
                  data={habbit}
                  deleteHabbitById={() => deleteHabbit("habbits", habbit.id)}
                />
              </div>
            );
          })}
        </div>
        <div className="col-4">
          <div className="mb-4">
            <Heading title="Date" />
            <CalendarComponent />
          </div>
          <div>
            <Heading title="At Time" />
            <div className="row">
              <div className="col-6 mb-3">
                <CardRate
                  color="#7F00FF"
                  rateName="Left Habbit"
                  rateCount="50%"
                  message="Keren Bro"
                />
              </div>
              <div className="col-6 mb-3">
                <CardRate
                  color="#7F00FF"
                  rateName="Habbit Finished"
                  rateCount="20%"
                  message="Keren Bro"
                />
              </div>
              <div className="col-6 mb-3">
                <CardRate
                  color="#7F00FF"
                  rateName="Completion Rate"
                  rateCount="100%"
                  message="Keren Bro"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
