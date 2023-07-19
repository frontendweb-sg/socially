"use client";
import Button from "@/components/controls/Button";
import Modal, { modalRef } from "@/components/controls/Modal";
import Title from "@/components/controls/Title";
import { AppContent } from "@/utils/content";
import { useRef } from "react";

/**
 * Skill page
 * @returns
 */
const Page = () => {
  const modalRef = useRef<modalRef>(null);
  return (
    <>
      <Title label="Skill" sublabel="Welcome to skill page">
        <Button onClick={() => modalRef.current?.openHandler()}>
          {AppContent.addSkill}
        </Button>
      </Title>
      <Modal ref={modalRef} label="Add skill">
        modal
      </Modal>
    </>
  );
};

export default Page;
