"use client";
import Button from "@/components/controls/Button";
import Modal, { modalRef } from "@/components/controls/Modal";
import Title from "@/components/controls/Title";
import SkillForm from "./SkillForm";
import Skeleton from "@/components/controls/Skeleton";
import DataTable from "@/components/controls/DataTable";
import NoData from "@/components/controls/DataTable/NoData";
import { AppContent } from "@/utils/content";
import { Suspense, useRef } from "react";
import { ISkillDoc } from "@/models/skill";
import { Status } from "@/utils/types";
import { useAppState } from "@/components/providers/AppProvider";
import { deleteSkill } from "@/lib/skill";

/**
 * Skill component
 * @param param0
 * @returns
 */
export const Skill = ({ data }: { data: ISkillDoc[] | undefined }) => {
  const modalRef = useRef<modalRef>(null);
  const { state, editHandler, resetEditing, onConfirm, onCancelConfirm } =
    useAppState();
  const { editData } = state;

  /**
   * Handler
   * @param status
   * @param data
   */
  const handler = (status: Status, data: ISkillDoc) => {
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
            await deleteSkill(data.id);
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
      <Button
        className="mb-3"
        onClick={() => {
          modalRef.current?.openHandler();
        }}
      >
        {AppContent.addSkill}
      </Button>
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
      <Modal
        ref={modalRef}
        label={(editData ? AppContent.update : AppContent.add) + " skill"}
      >
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
