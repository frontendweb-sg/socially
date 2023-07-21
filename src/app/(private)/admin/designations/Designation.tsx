"use client";
import Button from "@/components/controls/Button";
import Modal, { modalRef } from "@/components/controls/Modal";
import Title from "@/components/controls/Title";
import DesignationForm from "./DesignationForm";
import Skeleton from "@/components/controls/Skeleton";
import DataTable from "@/components/controls/DataTable";
import NoData from "@/components/controls/DataTable/NoData";
import { useAppState } from "@/components/providers/AppProvider";
import { IDesignationDoc } from "@/models/designation";
import { AppContent } from "@/utils/content";
import { Suspense, useRef } from "react";
import { Status } from "@/utils/types";

type DesignationProps = {
  data: IDesignationDoc[];
};
const Designation = ({ data }: DesignationProps) => {
  const modalRef = useRef<modalRef>(null);

  const { state, editHandler, resetEditing, onConfirm, onCancelConfirm } =
    useAppState();
  const { editData } = state;

  /**
   * Handler
   * @param status
   * @param data
   */
  const handler = (status: Status, data: IDesignationDoc) => {
    switch (status) {
      case "edit":
        modalRef.current?.openHandler();
        editHandler(data);
        break;
      case "active":
        break;
      case "inactive":
        break;
      case "delete":
        onConfirm({
          open: true,
          async onSubmit() {
            onCancelConfirm();
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Title label="Designation" sublabel="Welcome to designation page">
        <Button onClick={() => modalRef.current?.openHandler()}>
          {AppContent.addDesignation}
        </Button>
      </Title>
      <Suspense fallback={<Skeleton />}>
        {data ? (
          <DataTable
            data={data!}
            hideCols={["id", "slug", "_id"]}
            onHandler={handler}
          />
        ) : (
          <NoData />
        )}
      </Suspense>
      <Modal ref={modalRef} label="Add skill">
        <DesignationForm
          designation={editData}
          onClose={() => {
            modalRef.current?.closeHandler();
            resetEditing();
          }}
        />
      </Modal>
    </>
  );
};

export default Designation;
