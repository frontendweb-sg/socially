"use client";
import Button from "@/components/controls/Button";
import Title from "@/components/controls/Title";
import Modal, { modalRef } from "@/components/controls/Modal";
import { AppContent } from "@/utils/content";
import { useEffect, useRef, useState } from "react";
import SkillForm from "./SkillForm";
import { skillService } from "@/services/skill.service";
import { ISkillDoc } from "@/models/skill";
import DataTable from "@/components/controls/DataTable";

/**
 * Skill page
 * @returns
 */
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<ISkillDoc[]>([]);
  const modalRef = useRef<modalRef>(null);

  useEffect(() => {
    setLoading(true);
    async function LoadData() {
      const response = await skillService.getAll();
      setSkills(response.data);
      setLoading(false);
    }
    LoadData();
    return () => {};
  }, []);
  return (
    <>
      <Title label="Skill" sublabel="Welcome to skill page">
        <Button onClick={() => modalRef.current?.openHandler()}>
          {AppContent.addSkill}
        </Button>
      </Title>
      <DataTable<ISkillDoc>
        data={skills}
        hideCols={["id", "_id"]}
        onHandler={console.log}
      />
      <Modal ref={modalRef} label="Add skill">
        <SkillForm onClose={modalRef.current?.closeHandler} />
      </Modal>
    </>
  );
};

export default Page;
