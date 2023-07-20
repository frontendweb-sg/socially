import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import FormGroup from "@/components/controls/FormGroup";
import Input from "@/components/controls/Input";
import { ISkill, ISkillDoc } from "@/models/skill";
import { skillService } from "@/services/skill.service";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import type { AxiosError } from "axios";
import axios from "axios";

const validation = yup.object().shape({
  title: yup.string().required("Skill name is required!"),
  slug: yup.string(),
});

/**
 * Add / Update skill
 * @returns
 */
type SkillFormProps = {
  skill?: ISkillDoc;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};
const SkillForm = ({ skill, onClose, ...rest }: SkillFormProps) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      slug: "",
      active: true,
    } as ISkill,
    validationSchema: validation,
    async onSubmit(values: ISkill, { resetForm, setSubmitting }) {
      try {
        const response = await skillService.add(values);
        if (response.status === 201) {
          toast.success("Skill added successfully!");
        }
        resetForm();
      } catch (error: unknown | AxiosError) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.errors.message);
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name="title"
          value={values.title}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="button" onClick={onClose}>
        {AppContent.cancel}
      </Button>
      <Button loading={isSubmitting} disabled={isSubmitting} type="submit">
        {AppContent.save}
      </Button>
    </Form>
  );
};

export default SkillForm;
