import Button from "@/components/controls/Button";
import Form from "@/components/controls/Form";
import FormGroup from "@/components/controls/FormGroup";
import Input from "@/components/controls/Input";
import axios, { AxiosError } from "axios";
import { ISkillDoc } from "@/models/skill";
import { AppContent } from "@/utils/content";
import { useFormik } from "formik";
import Box from "@/components/controls/Box";
import { toast } from "react-toastify";
import { skillService } from "@/services/skill.service";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import useFocus from "@/hooks/useFocus";

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
  onClose?: () => void;
};
const SkillForm = ({ skill, onClose }: SkillFormProps) => {
  const router = useRouter();
  const inpRef = useFocus();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: skill ?? {
      id: 0,
      title: "",
      slug: "",
      active: true,
    },
    validationSchema: validation,
    async onSubmit(values, { resetForm, setSubmitting }) {
      try {
        let response = null;
        if (values.id) {
          response = await skillService.update(values as ISkillDoc);
        } else {
          response = await skillService.add(values);
        }

        const message =
          values.title +
          (response.status === 200 ? " skill updated!" : " skill added!");

        if (response.status === 200 || response.status === 201) {
          toast.success(message);
          resetForm();
          onClose?.();
          router.refresh();
        }
      } catch (error: unknown | AxiosError) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.errors.message);
        }
      }
      setSubmitting(false);
    },
    onReset(state) {},
  });

  console.log("Hi");

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          ref={inpRef}
          name="title"
          value={values.title}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
      <Box className="d-flex justify-content-end">
        <Button className="me-3" type="button" onClick={onClose}>
          {AppContent.cancel}
        </Button>
        <Button loading={isSubmitting} disabled={isSubmitting} type="submit">
          {values.id ? AppContent.update : AppContent.save}
        </Button>
      </Box>
    </Form>
  );
};

export default SkillForm;
