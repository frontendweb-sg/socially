"use client";
import Button from "@/components/controls/Button";
import Modal, { modalRef } from "@/components/controls/Modal";
import Title from "@/components/controls/Title";
import SkillForm from "./SkillForm";
import Skeleton from "@/components/controls/Skeleton";
import DataTable from "@/components/controls/DataTable";
import { AppContent } from "@/utils/content";
import { Suspense, useRef } from "react";
import { ISkillDoc } from "@/models/skill";
import NoData from "@/components/controls/DataTable/NoData";
import { Status } from "@/utils/types";
import { useAppState } from "@/components/providers/AppProvider";

/**
 * Skill component
 * @param param0
 * @returns
 */
export const Skill = ({ data }: { data: ISkillDoc[] | undefined }) => {
  const modalRef = useRef<modalRef>(null);

  const { state, editHandler, resetEditing } = useAppState();
  const { editData } = state;
  const handler = (status: Status, data: ISkillDoc) => {
    if (status === "edit") {
      modalRef.current?.openHandler();
      editHandler(data);
    }
  };

  return (
    <>
      <Title label="Skill" sublabel="Welcome to skill page">
        <Button onClick={() => modalRef.current?.openHandler()}>
          {AppContent.addSkill}
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
        <SkillForm
          skill={editData}
          onClose={() => {
            modalRef.current?.closeHandler();
            resetEditing();
          }}
        />
      </Modal>
    </>
  );
};
