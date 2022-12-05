import React, { useState } from "react";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";

import { deleteHabbit } from "../../utils/firebaseFunc";
import { formatDate, formatterDateToObject } from "../../utils/functions";
import ButtonCustom from "../ButtonCustom";
import Heading from "../Heading";
import Modal from "../Modal";

const DetailHabbit = ({ setValue, dataDetailHabbit, setShowModal }) => {
  const startDate = formatDate(new Date(dataDetailHabbit.data.startDate));
  const endDate = formatDate(new Date(dataDetailHabbit.data.endDate));
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: formatterDateToObject(new Date(dataDetailHabbit.data.startDate)),
    to: formatterDateToObject(new Date(dataDetailHabbit.data.endDate)),
  });

  return (
    <Modal setValue={setValue}>
      <h3>{dataDetailHabbit?.data?.name}</h3>
      <div className="row">
        <div className="col-5">
          <div className="my-3">
            <Calendar
              value={selectedDayRange}
              onChange={() => null}
              colorPrimary="#F58349"
              colorPrimaryLight="#FBCEB6"
              shouldHighlightWeekends
            />
          </div>
        </div>
      </div>
      <div className="d-flex my-4">
        <span>
          Dari tanggal <strong className="text-warning">{startDate}</strong>{" "}
        </span>{" "}
        -
        <span>
          Sampai tanggal <strong className="text-warning">{endDate}</strong>
        </span>
      </div>
      <div>
        <Heading title="Note" />
        <p className="fs-6 opacity-50">{dataDetailHabbit?.data?.note}</p>
      </div>
      <div className="mt-4 d-flex">
        {setShowModal && (
          <div className="me-3">
            <ButtonCustom
              title="Edit"
              size="normal"
              iconName="create"
              isIcon={true}
              handlePress={() => {
                setShowModal(true);
                setValue(false);
              }}
            />
          </div>
        )}
        <ButtonCustom
          title="Delete"
          size="normal"
          iconName="trash"
          isIcon={true}
          handlePress={() => {
            setValue(false);
            deleteHabbit("habbits", dataDetailHabbit.id);
          }}
        />
      </div>
    </Modal>
  );
};

export default DetailHabbit;
